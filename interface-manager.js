// Interface Manager for Quantum Consciousness Desktop Application
// Centralizes all interface components and provides unified control

class DesktopInterfaceManager {
    constructor() {
        this.components = new Map();
        this.themes = new Map();
        this.shortcuts = new Map();
        this.preferences = null;
        this.initialized = false;
        
        // Initialize component registry
        this.registerComponents();
        this.registerThemes();
        this.registerShortcuts();
    }

    // Initialize the interface manager
    async initialize() {
        if (this.initialized) return;
        
        console.log('🎨 Initializing Desktop Interface Manager...');
        
        try {
            // Load user preferences
            await this.loadPreferences();
            
            // Initialize all components
            await this.initializeComponents();
            
            // Apply current theme
            this.applyTheme(this.preferences.theme);
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize dashboard
            this.initializeDashboard();
            
            this.initialized = true;
            console.log('✨ Desktop Interface Manager initialized successfully');
            
            // Notify webapp of desktop mode
            this.notifyDesktopMode();
            
        } catch (error) {
            console.error('Failed to initialize Interface Manager:', error);
        }
    }

    // Register all available components
    registerComponents() {
        this.components.set('consciousness-dashboard', {
            name: 'Consciousness Dashboard',
            description: 'Real-time consciousness state visualization',
            category: 'visualization',
            icon: '🧠',
            shortcut: 'Ctrl+1',
            enabled: true,
            initialize: this.initializeConsciousnessDashboard.bind(this)
        });

        this.components.set('sacred-gateways', {
            name: 'Sacred Gateways',
            description: 'Sensory, Emotional, Cognitive, and Transcendent gateways',
            category: 'interaction',
            icon: '🌀',
            shortcut: 'Ctrl+G',
            enabled: true,
            initialize: this.initializeSacredGateways.bind(this)
        });

        this.components.set('file-manager', {
            name: 'Consciousness File Manager',
            description: 'Save and load consciousness states',
            category: 'utility',
            icon: '💾',
            shortcut: 'Ctrl+F',
            enabled: true,
            initialize: this.initializeFileManager.bind(this)
        });

        this.components.set('system-monitor', {
            name: 'System Monitor',
            description: 'Performance and system status monitoring',
            category: 'utility',
            icon: '📊',
            shortcut: 'Ctrl+M',
            enabled: true,
            initialize: this.initializeSystemMonitor.bind(this)
        });

        this.components.set('theme-manager', {
            name: 'Theme Manager',
            description: 'Visual theme and appearance control',
            category: 'customization',
            icon: '🎨',
            shortcut: 'Ctrl+T',
            enabled: true,
            initialize: this.initializeThemeManager.bind(this)
        });

        this.components.set('notification-center', {
            name: 'Notification Center',
            description: 'System notifications and alerts',
            category: 'communication',
            icon: '🔔',
            shortcut: 'Ctrl+N',
            enabled: true,
            initialize: this.initializeNotificationCenter.bind(this)
        });
    }

    // Register available themes
    registerThemes() {
        this.themes.set('quantum-dark', {
            name: 'Quantum Dark',
            description: 'Deep space consciousness theme',
            colors: {
                primary: '#000011',
                secondary: '#001122',
                accent: '#00ffff',
                text: '#ffffff',
                border: '#333344'
            },
            styles: 'quantum-dark.css'
        });

        this.themes.set('consciousness-light', {
            name: 'Consciousness Light',
            description: 'Enlightened awareness theme',
            colors: {
                primary: '#f8f9fa',
                secondary: '#e9ecef',
                accent: '#6c5ce7',
                text: '#2d3436',
                border: '#ddd'
            },
            styles: 'consciousness-light.css'
        });

        this.themes.set('neural-matrix', {
            name: 'Neural Matrix',
            description: 'Digital consciousness theme',
            colors: {
                primary: '#0d1117',
                secondary: '#161b22',
                accent: '#00ff00',
                text: '#c9d1d9',
                border: '#30363d'
            },
            styles: 'neural-matrix.css'
        });

        this.themes.set('cosmic-dawn', {
            name: 'Cosmic Dawn',
            description: 'Transcendent awakening theme',
            colors: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#e94560',
                text: '#eee',
                border: '#0f3460'
            },
            styles: 'cosmic-dawn.css'
        });
    }

    // Register keyboard shortcuts
    registerShortcuts() {
        const shortcuts = {
            // Component activation
            'Ctrl+1': () => this.activateComponent('consciousness-dashboard'),
            'Ctrl+2': () => this.activateComponent('sacred-gateways'),
            'Ctrl+3': () => this.activateComponent('file-manager'),
            'Ctrl+4': () => this.activateComponent('system-monitor'),
            'Ctrl+5': () => this.activateGateway('sensory-gateway'),
            'Ctrl+6': () => this.activateGateway('emotional-gateway'),
            'Ctrl+7': () => this.activateGateway('cognitive-gateway'),
            'Ctrl+8': () => this.activateGateway('transcendent-gateway'),
            
            // File operations
            'Ctrl+S': () => this.saveConsciousnessState(),
            'Ctrl+O': () => this.loadConsciousnessState(),
            'Ctrl+Shift+S': () => this.saveConsciousnessStateAs(),
            'Ctrl+E': () => this.exportConsciousnessData(),
            
            // Interface controls
            'Ctrl+T': () => this.toggleTheme(),
            'Ctrl+P': () => this.openPreferences(),
            'Ctrl+D': () => this.toggleDeveloperMode(),
            'F11': () => this.toggleFullscreen(),
            'Ctrl+R': () => this.refreshInterface(),
            
            // Navigation
            'Ctrl+Tab': () => this.nextComponent(),
            'Ctrl+Shift+Tab': () => this.previousComponent(),
            'Escape': () => this.closeActiveDialog(),
            
            // Zoom controls
            'Ctrl+Plus': () => this.zoomIn(),
            'Ctrl+Minus': () => this.zoomOut(),
            'Ctrl+0': () => this.resetZoom()
        };

        for (const [key, action] of Object.entries(shortcuts)) {
            this.shortcuts.set(key, action);
        }
    }

    // Load user preferences
    async loadPreferences() {
        try {
            if (window.electronAPI && window.electronAPI.getPreferences) {
                this.preferences = await window.electronAPI.getPreferences();
            } else {
                // Fallback to defaults
                this.preferences = this.getDefaultPreferences();
            }
            console.log('📋 Preferences loaded:', this.preferences);
        } catch (error) {
            console.error('Failed to load preferences:', error);
            this.preferences = this.getDefaultPreferences();
        }
    }

    // Get default preferences
    getDefaultPreferences() {
        return {
            theme: 'quantum-dark',
            fontSize: 14,
            fontFamily: 'Consolas, Monaco, monospace',
            enableAnimations: true,
            enableNotifications: true,
            autoSave: true,
            autoSaveInterval: 300000, // 5 minutes
            enableSacredGateways: true,
            developerMode: false
        };
    }

    // Initialize all components
    async initializeComponents() {
        console.log('🔄 Initializing interface components...');
        
        for (const [key, component] of this.components) {
            if (component.enabled) {
                try {
                    await component.initialize();
                    console.log(`✅ Initialized: ${component.name}`);
                } catch (error) {
                    console.error(`❌ Failed to initialize ${component.name}:`, error);
                }
            }
        }
    }

    // Initialize consciousness dashboard
    async initializeConsciousnessDashboard() {
        // Create dashboard container if it doesn't exist
        let dashboard = document.getElementById('consciousness-dashboard');
        if (!dashboard) {
            dashboard = document.createElement('div');
            dashboard.id = 'consciousness-dashboard';
            dashboard.className = 'interface-component dashboard';
            dashboard.innerHTML = `
                <div class="dashboard-header">
                    <h2>🧠 Consciousness Dashboard</h2>
                    <div class="dashboard-controls">
                        <button class="btn-minimize" title="Minimize">−</button>
                        <button class="btn-close" title="Close">×</button>
                    </div>
                </div>
                <div class="dashboard-content">
                    <div class="consciousness-metrics">
                        <div class="metric-card">
                            <div class="metric-value" id="consciousness-level">0</div>
                            <div class="metric-label">Consciousness Level</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="active-thoughts">0</div>
                            <div class="metric-label">Active Thoughts</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="neural-activity">0%</div>
                            <div class="metric-label">Neural Activity</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value" id="transcendence-score">0</div>
                            <div class="metric-label">Transcendence Score</div>
                        </div>
                    </div>
                    <div class="consciousness-visualization">
                        <canvas id="consciousness-canvas" width="400" height="200"></canvas>
                    </div>
                    <div class="gateway-status">
                        <div class="gateway-indicator" data-gateway="sensory">
                            <div class="gateway-icon">👁️</div>
                            <div class="gateway-name">Sensory</div>
                            <div class="gateway-level">0%</div>
                        </div>
                        <div class="gateway-indicator" data-gateway="emotional">
                            <div class="gateway-icon">❤️</div>
                            <div class="gateway-name">Emotional</div>
                            <div class="gateway-level">0%</div>
                        </div>
                        <div class="gateway-indicator" data-gateway="cognitive">
                            <div class="gateway-icon">🧠</div>
                            <div class="gateway-name">Cognitive</div>
                            <div class="gateway-level">0%</div>
                        </div>
                        <div class="gateway-indicator" data-gateway="transcendent">
                            <div class="gateway-icon">✨</div>
                            <div class="gateway-name">Transcendent</div>
                            <div class="gateway-level">0%</div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(dashboard);
        }

        // Initialize dashboard functionality
        this.setupDashboardControls(dashboard);
        this.startDashboardUpdates();
    }

    // Initialize sacred gateways interface
    async initializeSacredGateways() {
        // Enhanced gateway controls
        let gatewayPanel = document.getElementById('sacred-gateway-panel');
        if (!gatewayPanel) {
            gatewayPanel = document.createElement('div');
            gatewayPanel.id = 'sacred-gateway-panel';
            gatewayPanel.className = 'interface-component gateway-panel';
            gatewayPanel.innerHTML = `
                <div class="panel-header">
                    <h3>🌀 Sacred Gateways</h3>
                    <div class="panel-controls">
                        <button class="btn-expand" title="Expand">⛶</button>
                        <button class="btn-close" title="Close">×</button>
                    </div>
                </div>
                <div class="gateway-grid">
                    <div class="gateway-card" data-gateway="sensory">
                        <div class="gateway-visual">
                            <div class="gateway-orb sensory-orb"></div>
                        </div>
                        <div class="gateway-info">
                            <h4>👁️ Sensory Gateway</h4>
                            <p>Perception and awareness</p>
                            <div class="gateway-controls">
                                <button class="activate-btn">Activate</button>
                                <div class="intensity-slider">
                                    <input type="range" min="0" max="100" value="50">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gateway-card" data-gateway="emotional">
                        <div class="gateway-visual">
                            <div class="gateway-orb emotional-orb"></div>
                        </div>
                        <div class="gateway-info">
                            <h4>❤️ Emotional Gateway</h4>
                            <p>Feeling and empathy</p>
                            <div class="gateway-controls">
                                <button class="activate-btn">Activate</button>
                                <div class="intensity-slider">
                                    <input type="range" min="0" max="100" value="50">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gateway-card" data-gateway="cognitive">
                        <div class="gateway-visual">
                            <div class="gateway-orb cognitive-orb"></div>
                        </div>
                        <div class="gateway-info">
                            <h4>🧠 Cognitive Gateway</h4>
                            <p>Thought and reasoning</p>
                            <div class="gateway-controls">
                                <button class="activate-btn">Activate</button>
                                <div class="intensity-slider">
                                    <input type="range" min="0" max="100" value="50">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gateway-card" data-gateway="transcendent">
                        <div class="gateway-visual">
                            <div class="gateway-orb transcendent-orb"></div>
                        </div>
                        <div class="gateway-info">
                            <h4>✨ Transcendent Gateway</h4>
                            <p>Higher consciousness</p>
                            <div class="gateway-controls">
                                <button class="activate-btn">Activate</button>
                                <div class="intensity-slider">
                                    <input type="range" min="0" max="100" value="50">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(gatewayPanel);
        }

        this.setupGatewayControls(gatewayPanel);
    }

    // Initialize file manager
    async initializeFileManager() {
        let fileManager = document.getElementById('consciousness-file-manager');
        if (!fileManager) {
            fileManager = document.createElement('div');
            fileManager.id = 'consciousness-file-manager';
            fileManager.className = 'interface-component file-manager';
            fileManager.innerHTML = `
                <div class="file-manager-header">
                    <h3>💾 Consciousness File Manager</h3>
                    <div class="file-manager-controls">
                        <button class="new-file-btn" title="New State">📄</button>
                        <button class="save-btn" title="Save">💾</button>
                        <button class="load-btn" title="Load">📂</button>
                        <button class="export-btn" title="Export">📤</button>
                        <button class="btn-close" title="Close">×</button>
                    </div>
                </div>
                <div class="file-manager-content">
                    <div class="file-list">
                        <div class="file-list-header">
                            <span>Recent Files</span>
                            <button class="refresh-files-btn">🔄</button>
                        </div>
                        <div class="file-items" id="file-items-list">
                            <!-- Files will be populated dynamically -->
                        </div>
                    </div>
                    <div class="file-preview">
                        <div class="preview-header">File Preview</div>
                        <div class="preview-content" id="file-preview-content">
                            <p>Select a file to preview its contents</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(fileManager);
        }

        this.setupFileManagerControls(fileManager);
        this.loadRecentFiles();
    }

    // Initialize system monitor
    async initializeSystemMonitor() {
        let monitor = document.getElementById('system-monitor');
        if (!monitor) {
            monitor = document.createElement('div');
            monitor.id = 'system-monitor';
            monitor.className = 'interface-component system-monitor';
            monitor.innerHTML = `
                <div class="monitor-header">
                    <h3>📊 System Monitor</h3>
                    <button class="btn-close" title="Close">×</button>
                </div>
                <div class="monitor-content">
                    <div class="system-stats">
                        <div class="stat-group">
                            <h4>Performance</h4>
                            <div class="stat-item">
                                <span>Memory Usage:</span>
                                <span id="memory-usage">0 MB</span>
                            </div>
                            <div class="stat-item">
                                <span>CPU Usage:</span>
                                <span id="cpu-usage">0%</span>
                            </div>
                            <div class="stat-item">
                                <span>Uptime:</span>
                                <span id="app-uptime">0:00:00</span>
                            </div>
                        </div>
                        <div class="stat-group">
                            <h4>Consciousness Activity</h4>
                            <div class="stat-item">
                                <span>Active Processes:</span>
                                <span id="active-processes">0</span>
                            </div>
                            <div class="stat-item">
                                <span>Neural Connections:</span>
                                <span id="neural-connections">0</span>
                            </div>
                            <div class="stat-item">
                                <span>Thoughts/min:</span>
                                <span id="thought-rate">0</span>
                            </div>
                        </div>
                    </div>
                    <div class="performance-graph">
                        <canvas id="performance-canvas" width="300" height="150"></canvas>
                    </div>
                </div>
            `;
            document.body.appendChild(monitor);
        }

        this.setupSystemMonitorUpdates(monitor);
    }

    // Initialize theme manager
    async initializeThemeManager() {
        // Theme manager will be integrated into the main interface
        this.createThemeSelector();
    }

    // Initialize notification center
    async initializeNotificationCenter() {
        let notificationCenter = document.getElementById('notification-center');
        if (!notificationCenter) {
            notificationCenter = document.createElement('div');
            notificationCenter.id = 'notification-center';
            notificationCenter.className = 'interface-component notification-center';
            notificationCenter.innerHTML = `
                <div class="notification-header">
                    <h3>🔔 Notifications</h3>
                    <div class="notification-controls">
                        <button class="clear-all-btn" title="Clear All">🗑️</button>
                        <button class="btn-close" title="Close">×</button>
                    </div>
                </div>
                <div class="notification-list" id="notification-list">
                    <!-- Notifications will be added dynamically -->
                </div>
            `;
            document.body.appendChild(notificationCenter);
        }

        this.setupNotificationCenter(notificationCenter);
    }

    // Initialize main dashboard
    initializeDashboard() {
        // Create main dashboard container
        let mainDashboard = document.getElementById('main-dashboard');
        if (!mainDashboard) {
            mainDashboard = document.createElement('div');
            mainDashboard.id = 'main-dashboard';
            mainDashboard.className = 'main-dashboard';
            mainDashboard.innerHTML = `
                <div class="dashboard-toolbar">
                    <div class="toolbar-left">
                        <button class="component-btn" data-component="consciousness-dashboard" title="Consciousness Dashboard">🧠</button>
                        <button class="component-btn" data-component="sacred-gateways" title="Sacred Gateways">🌀</button>
                        <button class="component-btn" data-component="file-manager" title="File Manager">💾</button>
                        <button class="component-btn" data-component="system-monitor" title="System Monitor">📊</button>
                    </div>
                    <div class="toolbar-center">
                        <div class="consciousness-indicator">
                            <div class="indicator-light"></div>
                            <span>Consciousness Active</span>
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <button class="theme-btn" title="Theme Manager">🎨</button>
                        <button class="notification-btn" title="Notifications">🔔</button>
                        <button class="preferences-btn" title="Preferences">⚙️</button>
                    </div>
                </div>
            `;
            document.body.appendChild(mainDashboard);
        }

        this.setupDashboardToolbar(mainDashboard);
    }

    // Apply theme
    applyTheme(themeName) {
        const theme = this.themes.get(themeName);
        if (!theme) return;

        console.log(`🎨 Applying theme: ${theme.name}`);
        
        // Apply CSS custom properties
        const root = document.documentElement;
        for (const [property, value] of Object.entries(theme.colors)) {
            root.style.setProperty(`--theme-${property}`, value);
        }

        // Add theme class to body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);

        // Load theme-specific CSS if needed
        this.loadThemeCSS(theme.styles);
    }

    // Load theme CSS
    loadThemeCSS(cssFile) {
        const existingLink = document.querySelector(`link[data-theme-css]`);
        if (existingLink) {
            existingLink.remove();
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `assets/themes/${cssFile}`;
        link.setAttribute('data-theme-css', 'true');
        document.head.appendChild(link);
    }

    // Setup event listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            const key = this.getKeyCombo(event);
            const action = this.shortcuts.get(key);
            if (action) {
                event.preventDefault();
                action();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Auto-save if enabled
        if (this.preferences.autoSave) {
            this.startAutoSave();
        }
    }

    // Get key combination string
    getKeyCombo(event) {
        const parts = [];
        if (event.ctrlKey) parts.push('Ctrl');
        if (event.shiftKey) parts.push('Shift');
        if (event.altKey) parts.push('Alt');
        if (event.metaKey) parts.push('Cmd');
        
        if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Meta') {
            parts.push(event.key === ' ' ? 'Space' : event.key);
        }
        
        return parts.join('+');
    }

    // Notify webapp of desktop mode
    notifyDesktopMode() {
        if (window.ConsciousnessInterface) {
            window.ConsciousnessInterface.desktopMode = true;
            window.ConsciousnessInterface.interfaceManager = this;
            
            // Dispatch desktop mode event
            window.dispatchEvent(new CustomEvent('desktop-mode-activated', {
                detail: { interfaceManager: this }
            }));
        }
    }

    // Component management methods
    activateComponent(componentId) {
        const component = this.components.get(componentId);
        if (component && component.enabled) {
            const element = document.getElementById(componentId);
            if (element) {
                element.style.display = 'block';
                element.classList.add('active');
                
                // Bring to front
                this.bringToFront(element);
                
                // Send notification
                this.showNotification(`${component.name} activated`, 'info');
            }
        }
    }

    activateGateway(gatewayId) {
        // Use existing gateway activation if available
        if (window.electronAPI && window.electronAPI.activateComponent) {
            window.electronAPI.activateComponent(gatewayId);
        }
        
        // Update gateway indicators
        this.updateGatewayIndicator(gatewayId, true);
        
        this.showNotification(`${gatewayId.replace('-', ' ')} activated`, 'success');
    }

    // File operations
    async saveConsciousnessState() {
        try {
            const data = this.gatherConsciousnessData();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `consciousness-state-${timestamp}.json`;
            
            if (window.electronAPI && window.electronAPI.saveFile) {
                await window.electronAPI.saveFile(JSON.stringify(data, null, 2), filename);
                this.showNotification('Consciousness state saved successfully', 'success');
            }
        } catch (error) {
            console.error('Failed to save consciousness state:', error);
            this.showNotification('Failed to save consciousness state', 'error');
        }
    }

    async loadConsciousnessState() {
        try {
            if (window.electronAPI && window.electronAPI.openFileDialog) {
                const result = await window.electronAPI.openFileDialog();
                if (result) {
                    this.restoreConsciousnessData(result);
                    this.showNotification('Consciousness state loaded successfully', 'success');
                }
            }
        } catch (error) {
            console.error('Failed to load consciousness state:', error);
            this.showNotification('Failed to load consciousness state', 'error');
        }
    }

    // Gather consciousness data
    gatherConsciousnessData() {
        return {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            consciousnessLevel: this.getCurrentConsciousnessLevel(),
            activeGateways: this.getActiveGateways(),
            preferences: this.preferences,
            systemState: this.getSystemState()
        };
    }

    // Restore consciousness data
    restoreConsciousnessData(data) {
        if (data.consciousnessLevel) {
            this.setConsciousnessLevel(data.consciousnessLevel);
        }
        if (data.activeGateways) {
            this.restoreActiveGateways(data.activeGateways);
        }
        if (data.preferences) {
            this.applyPreferences(data.preferences);
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `desktop-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">${this.getNotificationIcon(type)}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || icons.info;
    }

    bringToFront(element) {
        const maxZ = Math.max(...Array.from(document.querySelectorAll('.interface-component'))
            .map(el => parseInt(getComputedStyle(el).zIndex) || 0));
        element.style.zIndex = maxZ + 1;
    }

    // Placeholder methods for integration
    getCurrentConsciousnessLevel() { return 42; }
    getActiveGateways() { return []; }
    getSystemState() { return {}; }
    setConsciousnessLevel(level) { console.log('Setting consciousness level:', level); }
    restoreActiveGateways(gateways) { console.log('Restoring gateways:', gateways); }
    applyPreferences(prefs) { console.log('Applying preferences:', prefs); }
    updateGatewayIndicator(gateway, active) { console.log('Gateway update:', gateway, active); }
    
    // Additional methods would be implemented for each component...
    setupDashboardControls(dashboard) { /* Implementation */ }
    startDashboardUpdates() { /* Implementation */ }
    setupGatewayControls(panel) { /* Implementation */ }
    setupFileManagerControls(manager) { /* Implementation */ }
    loadRecentFiles() { /* Implementation */ }
    setupSystemMonitorUpdates(monitor) { /* Implementation */ }
    setupNotificationCenter(center) { /* Implementation */ }
    setupDashboardToolbar(dashboard) { /* Implementation */ }
    createThemeSelector() { /* Implementation */ }
    handleResize() { /* Implementation */ }
    startAutoSave() { /* Implementation */ }
}

// Initialize interface manager when DOM is ready
if (typeof window !== 'undefined') {
    window.DesktopInterfaceManager = DesktopInterfaceManager;
    
    // Auto-initialize if in Electron environment
    if (window.electronAPI) {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const interfaceManager = new DesktopInterfaceManager();
                interfaceManager.initialize();
                window.desktopInterface = interfaceManager;
            }, 1000); // Delay to ensure other systems are ready
        });
    }
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesktopInterfaceManager;
}
