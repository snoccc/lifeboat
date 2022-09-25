let { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require("child_process");
const { parse, YAML_CONFIG } = require('./parse')

let win;

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
        relativePath: path.relative(__dirname, filename).replace(/\\/g, "/"),
        name: path.basename(filename)
    };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(child => dirTree(filename + '/' + child));
    } else {
        info.type = "file";
        // const icon = app.getFileIcon(info.name);
        // console.log(icon);
    }

    return info;
}

function appendToFile(file, contents) {
    fs.mkdir(path.dirname(file), { recursive: true }, function (err) {
        if (err) return;

        fs.writeFileSync(file, contents, (err) => {
            if (err) { console.log(err); return }

            console.log("file written successfully");

        });
    });
}

async function runScripts(file) {
    try {
        const scripts = parse(file);

        for (const script in scripts) {
            const outputFile = getOutFile(file, script)

            fs.stat(outputFile, function (err, stat) {
                if (err == null) {
                    return;
                }
                else {
                    const commands = scripts[script];

                    commands.forEach(command => {
                        exec(command, { shell: "bash", env: { 'WSLENV': 'file', 'file': "public/" + file.relativePath } }, (error, stdout, stderr) => {
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

function getOutFile(file, script) {
    return "public/data/" + file.relativePath + `/${script}.out`;
}

async function generateCards(file) {
    await runScripts(file);

    return new Promise(res => {
        const dir = "public/data/" + file.relativePath;
        const files = fs.readdirSync(dir);

        const result = [];

        files.forEach(file => {
            file = path.join(dir, file);
            const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
            result.push({ name: path.parse(file).name, body: data })
        })

        res(result);
    });
}

ipcMain.handle('generate-cards', async (event, file) => {
    const cards = await generateCards(file);
    return cards;
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
        event.returnValue = contents;
    }
    else {
        event.returnValue = 'lol';
    }
});