// Electron Preload Script for Preferences Window
const { contextBridge, ipcRenderer } = require('electron');

// Expose preferences APIs to the preferences window
contextBridge.exposeInMainWorld('electronAPI', {
    // Preferences management
    getPreferences: () => ipcRenderer.invoke('get-preferences'),
    savePreferences: (preferences) => ipcRenderer.invoke('save-preferences', preferences),
    resetPreferences: () => ipcRenderer.invoke('reset-preferences'),
    
    // Window control
    closePreferences: () => ipcRenderer.invoke('close-preferences'),
    
    // Console logging for debugging
    log: (message) => console.log('[Preferences]', message),
    error: (message) => console.error('[Preferences]', message)
});

// Initialize preferences window when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎛️ Preferences window loaded');
});
