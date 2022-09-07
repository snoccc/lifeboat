let { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { exec, execSync } = require("child_process");

let win;
const YAML_CONFIG = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        },
    });

    win.loadURL("http://localhost:3000/")
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function dirTree(filename) {
    const stats = fs.lstatSync(filename);
    const info = {
        path: filename,
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(child => dirTree(filename + '/' + child));
    } else {
        info.type = "file";
    }

    return info;
}

function getRelativePath(path) {
    return path.substring(path.indexOf("public")).replace('\\', '/');
}

function appendToFile(file, contents) {
    fs.appendFileSync(file, contents, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("file written successfully");
        }
    })
}

function runScripts(file) {
    const inputFile = getRelativePath(file.path);

    try {
        const all = YAML_CONFIG.all;

        for (const script in all) {
            const outputFile = `public/data/${script}.out`;

            fs.stat(outputFile, function (err, stat) {
                if (err == null) {
                    console.log('File exists - cmd');
                }
                else {
                    const commands = all[script];

                    commands.forEach(command => {
                        exec(command, { shell: "bash", env: { 'WSLENV': 'file', 'file': inputFile } }, (error, stdout, stderr) => {
                            if (error) { console.log(`error: ${error.message}`); return; }

                            appendToFile(outputFile, stdout);
                        });
                    });
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function generateCards(file) {
    const path = file.path;

    fs.stat('C:\\Users\\Arsen\\Desktop\\lifeboat\\public\\data\\file.out', function (err, stat) {
        if (err == null) {
            win.webContents.send("cards", "hello");

        }
        else {
            console.log('File doesn\'t exist');
        }
    });
}

ipcMain.on('run-scripts', (event, file) => {
    runScripts(file);
    generateCards(file);
});

ipcMain.on('get-directory', (event) => {
    const dir = path.join(__dirname, 'testdir');

    const tree = dirTree(dir);
    event.returnValue = tree;
});

// COMMUNICATION
ipcMain.on("file-change", (event, file) => {
    win.webContents.send("file-change", file);
});

ipcMain.on("cards", (event, cards) => {
    win.webContents.send("cards", cards);
});

ipcMain.on('get-file-contents', (event, path) => {
    if (path) {
        const contents = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
        console.log(contents)
        event.returnValue = contents;
    }
    else {
        event.returnValue = 'lol';
    }
});