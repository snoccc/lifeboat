let { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const fs = require('fs')

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

ipcMain.on('get-directory', (event) => {
    const dir = path.join(__dirname, 'testdir');

    const tree = dirTree(dir);
    event.returnValue = tree;
});

ipcMain.on("file-change", (event, args) => {
    win.webContents.send("file-change", args);
});