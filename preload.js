const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('__electronBadge', {
  set: (count) => ipcRenderer.send('badge', count)
})
