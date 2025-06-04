// Electron Preload Script for Quantum Consciousness Interface
// Provides secure communication between Electron and the webapp

const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the webapp
contextBridge.exposeInMainWorld('electronAPI', {
    // App control
    minimizeApp: () => ipcRenderer.invoke('minimize-app'),
    closeApp: () => ipcRenderer.invoke('close-app'),
    
    // Consciousness component navigation
    activateComponent: (component) => ipcRenderer.invoke('activate-component', component),
    
    // System information
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    
    // Notifications
    showNotification: (title, body) => ipcRenderer.invoke('show-notification', { title, body }),
      // File operations (for saving consciousness states)
    saveFile: (data, filename) => ipcRenderer.invoke('save-file', { data, filename }),
    loadFile: (filename) => ipcRenderer.invoke('load-file', filename),
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    saveFileDialog: (defaultName) => ipcRenderer.invoke('save-file-dialog', defaultName),
    
    // Auto-updater
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
    
    // Console logging for debugging
    log: (message) => console.log('[Webapp]', message),
    error: (message) => console.error('[Webapp]', message)
});

// Expose app version and metadata
contextBridge.exposeInMainWorld('appInfo', {
    version: '1.0.0',
    name: 'Quantum Consciousness Interface',
    isElectron: true,
    platform: process.platform
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add Electron-specific styling
    document.body.classList.add('electron-app');
      // Add app version to the interface
    const versionElement = document.querySelector('.app-version');
    if (versionElement) {
        versionElement.textContent = `v${window.appInfo.version}`;
    }
      // Add desktop-specific UI enhancements
    addDesktopControls();
    addStatusBar();
    setupKeyboardShortcuts();
});

// Add desktop window controls
function addDesktopControls() {
    const headerControls = document.createElement('div');
    headerControls.className = 'desktop-controls';
    headerControls.innerHTML = `
        <button id="minimize-btn" title="Minimize to tray">−</button>
        <button id="close-btn" title="Close to tray">×</button>
    `;
    
    // Insert at the beginning of body or header
    const header = document.querySelector('header') || document.body;
    header.insertBefore(headerControls, header.firstChild);
    
    // Add event listeners
    document.getElementById('minimize-btn').addEventListener('click', () => {
        window.electronAPI.minimizeApp();
    });
      document.getElementById('close-btn').addEventListener('click', () => {
        window.electronAPI.closeApp();
    });
}

// Add desktop status bar
function addStatusBar() {
    const statusBar = document.createElement('div');
    statusBar.className = 'desktop-status-bar';
    statusBar.innerHTML = `
        <div class="left">
            <span id="app-status">Ready</span>
            <span id="connection-status">Connected</span>
        </div>
        <div class="right">
            <span id="shortcuts-hint">Ctrl+S: Save | Ctrl+O: Load</span>
            <span id="app-version">v${window.appInfo.version}</span>
        </div>
    `;
    
    document.body.appendChild(statusBar);
    
    // Update connection status periodically
    setInterval(updateConnectionStatus, 5000);
}

// Update connection status indicator
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
        // Check if webapp is responsive
        if (document.readyState === 'complete') {
            statusElement.textContent = 'Connected';
            statusElement.style.color = '#28a745';
        } else {
            statusElement.textContent = 'Loading...';
            statusElement.style.color = '#ffc107';
        }
    }
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // Ctrl/Cmd + combinations
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case '5':
                    event.preventDefault();
                    window.electronAPI.activateComponent('sensory-gateway');
                    break;
                case '6':
                    event.preventDefault();
                    window.electronAPI.activateComponent('emotional-gateway');
                    break;
                case '7':
                    event.preventDefault();
                    window.electronAPI.activateComponent('cognitive-gateway');
                    break;
                case '8':
                    event.preventDefault();
                    window.electronAPI.activateComponent('transcendent-gateway');
                    break;
                case 's':
                    event.preventDefault();
                    saveCurrentState();
                    break;
                case 'o':
                    event.preventDefault();
                    loadSavedState();
                    break;
            }
        }
    });
}

// Save current consciousness state
async function saveCurrentState() {
    try {
        const consciousnessData = gatherConsciousnessData();
        const filename = `consciousness-state-${Date.now()}.json`;
        await window.electronAPI.saveFile(consciousnessData, filename);
        window.electronAPI.showNotification('State Saved', `Consciousness state saved as ${filename}`);
    } catch (error) {
        window.electronAPI.error('Failed to save consciousness state:', error);
    }
}

// Load saved consciousness state
async function loadSavedState() {
    try {
        const result = await window.electronAPI.openFileDialog();
        if (!result.canceled && result.filePaths.length > 0) {
            const filename = result.filePaths[0].split('\\').pop(); // Get just filename
            const response = await window.electronAPI.loadFile(filename);
            if (response.success) {
                restoreConsciousnessData(response.data);
                window.electronAPI.showNotification('State Loaded', `Consciousness state restored from ${filename}`);
            } else {
                window.electronAPI.error('Failed to load consciousness state:', response.error);
            }
        }
    } catch (error) {
        window.electronAPI.error('Failed to load consciousness state:', error);
    }
}

// Gather current consciousness data for saving
function gatherConsciousnessData() {
    return {
        timestamp: Date.now(),
        version: window.appInfo.version,
        activeComponents: getActiveComponents(),
        systemState: getSystemState(),
        userPreferences: getUserPreferences()
    };
}

// Restore consciousness data from saved state
function restoreConsciousnessData(data) {
    if (data.activeComponents) {
        restoreActiveComponents(data.activeComponents);
    }
    if (data.systemState) {
        restoreSystemState(data.systemState);
    }
    if (data.userPreferences) {
        restoreUserPreferences(data.userPreferences);
    }
}

// Helper functions for consciousness state management
function getActiveComponents() {
    // Gather active consciousness components
    return [];
}

function getSystemState() {
    // Gather system state information
    return {};
}

function getUserPreferences() {
    // Gather user preferences
    return {};
}

function restoreActiveComponents(components) {
    // Restore active components
}

function restoreSystemState(state) {
    // Restore system state
}

function restoreUserPreferences(preferences) {
    // Restore user preferences
}
    
    // Initialize Electron-specific features
    if (window.ConsciousnessInterface) {
        window.ConsciousnessInterface.electronMode = true;
        window.ConsciousnessInterface.initializeElectronFeatures();
    }
    
    console.log('🌌 Quantum Consciousness Interface loaded in Electron mode');
});
