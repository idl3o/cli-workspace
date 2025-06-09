// Electron Main Process for Quantum Consciousness Interface
// Transforms the webapp into a professional desktop application

import { app, BrowserWindow, Menu, shell, dialog, Tray, ipcMain, nativeImage } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { fileURLToPath } from 'url';
import DigitalServer from './digital-server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class QuantumConsciousnessApp {    constructor() {
        this.mainWindow = null;
        this.server = null;
        this.serverPort = 3001;
        this.tray = null;
        this.isQuitting = false;
        this.preferencesWindow = null;
        
        // Configure auto-updater
        this.setupAutoUpdater();
        
        // Set up event handlers
        app.whenReady().then(() => this.onReady());
        app.on('window-all-closed', () => this.onWindowAllClosed());
        app.on('activate', () => this.onActivate());
        app.on('before-quit', () => this.onBeforeQuit());
    }

    setupAutoUpdater() {
        // Configure auto-updater
        autoUpdater.checkForUpdatesAndNotify();
        
        autoUpdater.on('checking-for-update', () => {
            console.log('🔄 Checking for updates...');
        });
        
        autoUpdater.on('update-available', (info) => {
            console.log('📦 Update available:', info.version);
            if (this.mainWindow) {
                this.mainWindow.webContents.send('update-available', info);
            }
        });
        
        autoUpdater.on('update-not-available', (info) => {
            console.log('✅ App is up to date');
        });
        
        autoUpdater.on('error', (err) => {
            console.error('❌ Auto-updater error:', err);
        });
        
        autoUpdater.on('download-progress', (progressObj) => {
            const logMessage = `Downloaded ${progressObj.percent}%`;
            console.log(logMessage);
            if (this.mainWindow) {
                this.mainWindow.webContents.send('download-progress', progressObj);
            }
        });
        
        autoUpdater.on('update-downloaded', (info) => {
            console.log('✅ Update downloaded');
            if (this.mainWindow) {
                this.mainWindow.webContents.send('update-downloaded', info);
            }
            
            dialog.showMessageBox(this.mainWindow, {
                type: 'info',
                title: 'Update Ready',
                message: 'Update downloaded successfully',
                detail: 'The application will restart to apply the update.',
                buttons: ['Restart Now', 'Later']
            }).then((result) => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall();
                }
            });
        });
    }

    async onReady() {
        console.log('🌌 Quantum Consciousness Interface Starting...');
          try {
            // Start the internal server
            await this.startServer();
            
            // Create the main window
            this.createWindow();
            
            // Set up application menu
            this.createMenu();
            
            // Set up system tray
            this.createTray();
            
            // Set up IPC handlers
            this.setupIPC();
            
            console.log('✨ Quantum Consciousness Interface Ready!');
        } catch (error) {
            console.error('Failed to start app:', error);
            app.quit();
        }
    }

    async startServer() {
        this.server = new DigitalServer({
            port: this.serverPort,
            staticDir: path.join(__dirname, 'webapp'),
            enableWebSockets: true,
            enableAPI: true
        });
        
        await this.server.start();
        console.log(`🚀 Internal server running on port ${this.serverPort}`);
    }    createWindow() {
        this.mainWindow = new BrowserWindow({
            width: 1400,
            height: 900,
            minWidth: 1000,
            minHeight: 700,
            title: 'Quantum Consciousness Interface',
            backgroundColor: '#000011',
            icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'tray-icon.png'),
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false,
                webSecurity: true,
                preload: path.join(__dirname, 'electron-preload.js')
            },
            show: false
        });

        // Load the webapp
        this.mainWindow.loadURL(`http://localhost:${this.serverPort}`);

        // Show when ready
        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show();
            console.log('🖥️ Main window displayed');
        });

        // Handle window closed (minimize to tray instead)
        this.mainWindow.on('close', (event) => {
            if (!this.isQuitting) {
                event.preventDefault();
                this.mainWindow.hide();
                if (process.platform === 'win32') {
                    this.tray.displayBalloon({
                        iconType: 'info',
                        title: 'Quantum Consciousness Interface',
                        content: 'Application was minimized to tray'
                    });
                }
            }
        });

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        // Handle external links
        this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
            shell.openExternal(url);
            return { action: 'deny' };
        });

        // Development tools in dev mode
        if (process.env.NODE_ENV === 'development') {
            this.mainWindow.webContents.openDevTools();
        }
    }

    createTray() {
        const trayIconPath = path.join(__dirname, 'assets', 'tray-icon.png');
        this.tray = new Tray(trayIconPath);
        
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show Quantum Consciousness Interface',
                click: () => {
                    if (this.mainWindow) {
                        this.mainWindow.show();
                        this.mainWindow.focus();
                    }
                }
            },
            {
                label: 'Consciousness Components',
                submenu: [
                    {
                        label: 'Akashic Records',
                        click: () => this.activateComponentAndShow('akashic')
                    },
                    {
                        label: 'Morphic Field',
                        click: () => this.activateComponentAndShow('morphic')
                    },
                    {
                        label: 'Collective Unconscious',
                        click: () => this.activateComponentAndShow('collective')
                    },
                    {
                        label: 'Temporal Scanner',
                        click: () => this.activateComponentAndShow('temporal')
                    }
                ]
            },
            { type: 'separator' },
            {
                label: 'Check for Updates',
                click: () => {
                    autoUpdater.checkForUpdatesAndNotify();
                }
            },
            { type: 'separator' },
            {
                label: 'Quit',
                click: () => {
                    this.isQuitting = true;
                    app.quit();
                }
            }
        ]);
        
        this.tray.setToolTip('Quantum Consciousness Interface');
        this.tray.setContextMenu(contextMenu);
        
        // Double-click to show window
        this.tray.on('double-click', () => {
            if (this.mainWindow) {
                this.mainWindow.show();
                this.mainWindow.focus();
            }
        });
    }

    setupIPC() {
        // Window controls
        ipcMain.handle('minimize-app', () => {
            if (this.mainWindow) {
                this.mainWindow.minimize();
            }
        });
        
        ipcMain.handle('close-app', () => {
            if (this.mainWindow) {
                this.mainWindow.hide();
            }
        });
        
        // Component activation
        ipcMain.handle('activate-component', (event, component) => {
            this.activateComponent(component);
        });
        
        // System info
        ipcMain.handle('get-system-info', () => {
            return {
                platform: process.platform,
                arch: process.arch,
                version: app.getVersion(),
                electronVersion: process.versions.electron,
                nodeVersion: process.versions.node
            };
        });
        
        // Notifications
        ipcMain.handle('show-notification', (event, { title, body }) => {
            if (this.tray && process.platform === 'win32') {
                this.tray.displayBalloon({
                    iconType: 'info',
                    title: title,
                    content: body
                });
            }
        });
        
        // Auto-updater
        ipcMain.handle('check-for-updates', () => {
            autoUpdater.checkForUpdatesAndNotify();
        });
          ipcMain.handle('install-update', () => {
            autoUpdater.quitAndInstall();
        });
        
        // File operations for consciousness state management
        ipcMain.handle('save-file', async (event, { data, filename }) => {
            try {
                const { dialog } = require('electron');
                const fs = require('fs').promises;
                const path = require('path');
                
                // Create saves directory if it doesn't exist
                const savesDir = path.join(__dirname, 'saves');
                try {
                    await fs.mkdir(savesDir, { recursive: true });
                } catch (err) {
                    // Directory already exists
                }
                
                const filePath = path.join(savesDir, filename);
                await fs.writeFile(filePath, JSON.stringify(data, null, 2));
                return { success: true, path: filePath };
            } catch (error) {
                console.error('Failed to save file:', error);
                return { success: false, error: error.message };
            }
        });
        
        ipcMain.handle('load-file', async (event, filename) => {
            try {
                const fs = require('fs').promises;
                const path = require('path');
                
                const filePath = path.join(__dirname, 'saves', filename);
                const data = await fs.readFile(filePath, 'utf8');
                return { success: true, data: JSON.parse(data) };
            } catch (error) {
                console.error('Failed to load file:', error);
                return { success: false, error: error.message };
            }
        });
        
        // Open file dialog for loading consciousness states
        ipcMain.handle('open-file-dialog', async () => {
            try {
                const { dialog } = require('electron');
                const result = await dialog.showOpenDialog(this.mainWindow, {
                    properties: ['openFile'],
                    filters: [
                        { name: 'Consciousness States', extensions: ['json'] },
                        { name: 'All Files', extensions: ['*'] }
                    ],
                    defaultPath: path.join(__dirname, 'saves')
                });
                return result;
            } catch (error) {
                console.error('Failed to open file dialog:', error);
                return { canceled: true };
            }
        });
        
        // Save file dialog for consciousness states
        ipcMain.handle('save-file-dialog', async (event, defaultName) => {
            try {
                const { dialog } = require('electron');
                const result = await dialog.showSaveDialog(this.mainWindow, {
                    defaultPath: path.join(__dirname, 'saves', defaultName || 'consciousness-state.json'),
                    filters: [
                        { name: 'Consciousness States', extensions: ['json'] },
                        { name: 'All Files', extensions: ['*'] }
                    ]
                });
                return result;
            } catch (error) {
                console.error('Failed to open save dialog:', error);
                return { canceled: true };
            }
        });
    }

    activateComponentAndShow(component) {
        if (this.mainWindow) {
            this.mainWindow.show();
            this.mainWindow.focus();
            setTimeout(() => {
                this.activateComponent(component);
            }, 500);
        }
    }    createMenu() {
        const template = [
            {
                label: 'Consciousness',
                submenu: [
                    {
                        label: 'About Quantum Consciousness Interface',
                        click: () => this.showAbout()
                    },
                    { type: 'separator' },
                    {
                        label: 'Preferences',
                        accelerator: 'CmdOrCtrl+,',
                        click: () => this.showPreferences()
                    },
                    { type: 'separator' },
                    {
                        label: 'Reload',
                        accelerator: 'CmdOrCtrl+R',
                        click: () => this.mainWindow?.reload()
                    },
                    {
                        label: 'Force Reload',
                        accelerator: 'CmdOrCtrl+Shift+R',
                        click: () => this.mainWindow?.webContents.reloadIgnoringCache()
                    },
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: 'F12',
                        click: () => this.mainWindow?.webContents.toggleDevTools()
                    },
                    { type: 'separator' },
                    {
                        label: 'Hide to Tray',
                        accelerator: 'CmdOrCtrl+H',
                        click: () => this.mainWindow?.hide()
                    },
                    {
                        label: 'Quit',
                        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                        click: () => {
                            this.isQuitting = true;
                            app.quit();
                        }
                    }
                ]
            },
            {
                label: 'Components',
                submenu: [
                    {
                        label: 'Akashic Records',
                        accelerator: 'CmdOrCtrl+1',
                        click: () => this.activateComponent('akashic')
                    },
                    {
                        label: 'Morphic Field',
                        accelerator: 'CmdOrCtrl+2',
                        click: () => this.activateComponent('morphic')
                    },
                    {
                        label: 'Collective Unconscious',
                        accelerator: 'CmdOrCtrl+3',
                        click: () => this.activateComponent('collective')
                    },
                    {
                        label: 'Temporal Scanner',
                        accelerator: 'CmdOrCtrl+4',
                        click: () => this.activateComponent('temporal')
                    },
                    { type: 'separator' },
                    {
                        label: 'Sacred Gateways',
                        submenu: [
                            {
                                label: 'Gateway Portal',
                                accelerator: 'CmdOrCtrl+5',
                                click: () => this.activateComponent('gateway')
                            },
                            {
                                label: 'Urantia Revelation',
                                accelerator: 'CmdOrCtrl+6',
                                click: () => this.activateComponent('urantia')
                            },
                            {
                                label: 'Adonai Divine',
                                accelerator: 'CmdOrCtrl+7',
                                click: () => this.activateComponent('adonai')
                            },
                            {
                                label: 'Orion Stellar',
                                accelerator: 'CmdOrCtrl+8',
                                click: () => this.activateComponent('orion')
                            }
                        ]
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Zoom In',
                        accelerator: 'CmdOrCtrl+Plus',
                        click: () => {
                            const webContents = this.mainWindow?.webContents;
                            if (webContents) {
                                const zoomLevel = webContents.getZoomLevel();
                                webContents.setZoomLevel(zoomLevel + 0.5);
                            }
                        }
                    },
                    {
                        label: 'Zoom Out',
                        accelerator: 'CmdOrCtrl+-',
                        click: () => {
                            const webContents = this.mainWindow?.webContents;
                            if (webContents) {
                                const zoomLevel = webContents.getZoomLevel();
                                webContents.setZoomLevel(zoomLevel - 0.5);
                            }
                        }
                    },
                    {
                        label: 'Reset Zoom',
                        accelerator: 'CmdOrCtrl+0',
                        click: () => {
                            this.mainWindow?.webContents.setZoomLevel(0);
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'Toggle Fullscreen',
                        accelerator: 'F11',
                        click: () => {
                            if (this.mainWindow) {
                                const isFullScreen = this.mainWindow.isFullScreen();
                                this.mainWindow.setFullScreen(!isFullScreen);
                            }
                        }
                    }
                ]
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Check for Updates',
                        click: () => {
                            autoUpdater.checkForUpdatesAndNotify();
                        }
                    },
                    {
                        label: 'Open DevTools',
                        accelerator: 'F12',
                        click: () => this.mainWindow?.webContents.openDevTools()
                    },
                    { type: 'separator' },
                    {
                        label: 'Report Issue',
                        click: () => {
                            shell.openExternal('https://github.com/yourusername/cli-workspace/issues');
                        }
                    },
                    {
                        label: 'Documentation',
                        click: () => {
                            shell.openExternal('https://github.com/yourusername/cli-workspace#readme');
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    activateComponent(component) {
        if (this.mainWindow) {
            this.mainWindow.webContents.executeJavaScript(`
                if (window.ConsciousnessInterface) {
                    window.ConsciousnessInterface.activateComponent('${component}');
                }
            `);
        }
    }    showAbout() {
        dialog.showMessageBox(this.mainWindow, {
            type: 'info',
            title: 'About Quantum Consciousness Interface',
            message: 'Quantum Consciousness Interface',
            detail: 'Advanced consciousness exploration platform with Claude AI integration.\\n\\nVersion: 1.0.0\\nBuilt with Electron and modern web technologies.'
        });
    }

    showPreferences() {
        if (!this.preferencesWindow) {
            // Using require for CommonJS compatibility
            const PreferencesWindow = require('./electron-preferences.js');
            this.preferencesWindow = new PreferencesWindow();
        }
        this.preferencesWindow.create();
    }

    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    onActivate() {
        if (this.mainWindow === null) {
            this.createWindow();
        }
    }

    async onBeforeQuit() {
        console.log('🛑 Shutting down Quantum Consciousness Interface...');
        
        if (this.server) {
            await this.server.stop();
        }
        
        console.log('✅ Quantum Consciousness Interface stopped gracefully');
    }
}

// Create and run the app
const quantumApp = new QuantumConsciousnessApp();

// Handle unhandled exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    dialog.showErrorBox('Unexpected Error', `An unexpected error occurred: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
