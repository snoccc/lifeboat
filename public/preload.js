const { contextBridge, ipcRenderer } = require('electron');

const API = {
    getFiles: () => ipcRenderer.sendSync('get-files')
}

contextBridge.exposeInMainWorld('api', API);
