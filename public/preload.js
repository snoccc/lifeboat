const { contextBridge, ipcRenderer } = require('electron');

const API = {
    getDir: () => ipcRenderer.sendSync('get-directory'),
    getFileContents: () => ipcRenderer.sendSync('get-file-contents'),
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
}

contextBridge.exposeInMainWorld('api', API);
