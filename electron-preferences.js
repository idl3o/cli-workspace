// Electron Preferences Window for Quantum Consciousness Interface
const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');

class PreferencesWindow {
    constructor() {
        this.window = null;
    }

    create() {
        if (this.window) {
            this.window.focus();
            return;
        }

        this.window = new BrowserWindow({
            width: 600,
            height: 500,
            minWidth: 500,
            minHeight: 400,
            title: 'Preferences - Quantum Consciousness Interface',
            backgroundColor: '#000011',
            icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'tray-icon.png'),
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false,
                webSecurity: true,
                preload: path.join(__dirname, 'electron-preferences-preload.js')
            },
            parent: null, // Make it independent
            modal: false,
            show: false,
            resizable: true,
            minimizable: false,
            maximizable: false,
            fullscreenable: false,
            autoHideMenuBar: true
        });

        // Load preferences HTML
        this.window.loadFile(path.join(__dirname, 'preferences.html'));

        // Show when ready
        this.window.once('ready-to-show', () => {
            this.window.show();
        });

        // Handle window closed
        this.window.on('closed', () => {
            this.window = null;
        });

        // Setup IPC handlers for preferences
        this.setupIpcHandlers();
    }

    setupIpcHandlers() {
        // Get current preferences
        ipcMain.handle('get-preferences', () => {
            return this.getPreferences();
        });

        // Save preferences
        ipcMain.handle('save-preferences', (event, preferences) => {
            return this.savePreferences(preferences);
        });

        // Reset to defaults
        ipcMain.handle('reset-preferences', () => {
            return this.resetPreferences();
        });

        // Close preferences window
        ipcMain.handle('close-preferences', () => {
            if (this.window) {
                this.window.close();
            }
        });
    }

    getPreferences() {
        const fs = require('fs');
        const prefsPath = path.join(__dirname, 'user-preferences.json');
        
        try {
            if (fs.existsSync(prefsPath)) {
                const data = fs.readFileSync(prefsPath, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }

        // Return default preferences
        return this.getDefaultPreferences();
    }

    savePreferences(preferences) {
        try {
            const fs = require('fs');
            const prefsPath = path.join(__dirname, 'user-preferences.json');
            fs.writeFileSync(prefsPath, JSON.stringify(preferences, null, 2));
            return { success: true };
        } catch (error) {
            console.error('Failed to save preferences:', error);
            return { success: false, error: error.message };
        }
    }

    resetPreferences() {
        const defaults = this.getDefaultPreferences();
        this.savePreferences(defaults);
        return defaults;
    }

    getDefaultPreferences() {
        return {
            // Appearance
            theme: 'quantum-dark',
            fontSize: 14,
            fontFamily: 'Consolas, Monaco, monospace',
            
            // Behavior
            startMinimized: false,
            minimizeToTray: true,
            closeToTray: true,
            autoStart: false,
            
            // Consciousness Components
            enableSensoryGateway: true,
            enableEmotionalGateway: true,
            enableCognitiveGateway: true,
            enableTranscendentGateway: true,
            
            // Auto-updater
            checkForUpdates: true,
            autoDownloadUpdates: false,
            
            // Advanced
            enableLogging: false,
            logLevel: 'info',
            hardwareAcceleration: true,
            
            // Shortcuts
            shortcuts: {
                'sensory-gateway': 'Ctrl+5',
                'emotional-gateway': 'Ctrl+6',
                'cognitive-gateway': 'Ctrl+7',
                'transcendent-gateway': 'Ctrl+8',
                'save-state': 'Ctrl+S',
                'load-state': 'Ctrl+O',
                'toggle-fullscreen': 'F11',
                'zoom-in': 'Ctrl+Plus',
                'zoom-out': 'Ctrl+-',
                'reset-zoom': 'Ctrl+0'
            }
        };
    }

    isOpen() {
        return this.window !== null && !this.window.isDestroyed();
    }

    focus() {
        if (this.window) {
            this.window.focus();
        }
    }
}

module.exports = PreferencesWindow;
