const { contextBridge, ipcRenderer } = require('electron');

const API = {
    getDir: () => ipcRenderer.sendSync('get-directory')
}

contextBridge.exposeInMainWorld('api', API);
