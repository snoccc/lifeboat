let { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
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

ipcMain.on('get-files', (event) => {
    const dir = path.join(__dirname, 'testdir');
    const items = fs.readdirSync(dir);
    event.returnValue = items;
});

ipcMain.on('hello', () => {
    console.log('Hello World!')
});