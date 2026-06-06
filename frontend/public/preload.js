const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  onShowSettings: (callback) => ipcRenderer.on('show-settings-dialog', callback),
  removeShowSettingsListener: (callback) => ipcRenderer.removeListener('show-settings-dialog', callback),
});
