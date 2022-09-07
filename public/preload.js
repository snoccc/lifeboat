const { contextBridge, ipcRenderer } = require('electron');

const API = {
    getDir: () => ipcRenderer.sendSync('get-directory'),
    getFileContents: (path) => ipcRenderer.sendSync('get-file-contents', path),
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    runScripts: (file) => ipcRenderer.sendSync('run-scripts', file)
}

contextBridge.exposeInMainWorld('api', API);