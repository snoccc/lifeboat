let { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { exec } = require("child_process");

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

function testYaml() {
    // const target = path.join(__dirname, 'testdir/hello.txt');
    try {
        const config = path.join(__dirname, 'config.yml')
        const doc = yaml.load(fs.readFileSync(config, 'utf8'));
        const all = doc.all;

        for (const script in all) {
            const commands = doc.all[script];

            commands.forEach(command => {
                console.log('executing ' + command)
                exec(command, { shell: "bash", env: { 'WSLENV': 'file', 'file': 'public/testdir/hello.txt' } }, (error, stdout, stderr) => {
                    if (error) { console.log(`error: ${error.message}`); return; }
                    console.log(stdout);
                });
            });
        }



    } catch (e) {
        console.log(e);
    }
}

ipcMain.on('test-yaml', (event) => {
    testYaml();
});

ipcMain.on('get-directory', (event) => {
    const dir = path.join(__dirname, 'testdir');

    const tree = dirTree(dir);
    event.returnValue = tree;
});

ipcMain.on("file-change", (event, args) => {
    win.webContents.send("file-change", args);
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