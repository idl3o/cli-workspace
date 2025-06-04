// Preferences Window JavaScript
let currentPreferences = {};

// Initialize preferences window
document.addEventListener('DOMContentLoaded', async () => {
    setupTabs();
    setupRangeSliders();
    await loadPreferences();
    setupEventListeners();
});

// Setup tab navigation
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetTab = tab.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Setup range sliders with live value display
function setupRangeSliders() {
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    fontSizeSlider.addEventListener('input', (e) => {
        fontSizeValue.textContent = e.target.value + 'px';
    });
}

// Load current preferences
async function loadPreferences() {
    try {
        currentPreferences = await window.electronAPI.getPreferences();
        populateForm(currentPreferences);
    } catch (error) {
        console.error('Failed to load preferences:', error);
        // Use defaults if loading fails
        currentPreferences = getDefaultPreferences();
        populateForm(currentPreferences);
    }
}

// Populate form with preference values
function populateForm(preferences) {
    // Appearance
    document.getElementById('theme').value = preferences.theme || 'quantum-dark';
    document.getElementById('fontSize').value = preferences.fontSize || 14;
    document.getElementById('fontSizeValue').textContent = (preferences.fontSize || 14) + 'px';
    document.getElementById('fontFamily').value = preferences.fontFamily || 'Consolas, Monaco, monospace';
    
    // Behavior
    document.getElementById('startMinimized').checked = preferences.startMinimized || false;
    document.getElementById('minimizeToTray').checked = preferences.minimizeToTray !== false;
    document.getElementById('closeToTray').checked = preferences.closeToTray !== false;
    document.getElementById('autoStart').checked = preferences.autoStart || false;
    
    // Updates
    document.getElementById('checkForUpdates').checked = preferences.checkForUpdates !== false;
    document.getElementById('autoDownloadUpdates').checked = preferences.autoDownloadUpdates || false;
    
    // Consciousness Components
    document.getElementById('enableSensoryGateway').checked = preferences.enableSensoryGateway !== false;
    document.getElementById('enableEmotionalGateway').checked = preferences.enableEmotionalGateway !== false;
    document.getElementById('enableCognitiveGateway').checked = preferences.enableCognitiveGateway !== false;
    document.getElementById('enableTranscendentGateway').checked = preferences.enableTranscendentGateway !== false;
    
    // Advanced
    document.getElementById('hardwareAcceleration').checked = preferences.hardwareAcceleration !== false;
    document.getElementById('enableLogging').checked = preferences.enableLogging || false;
    document.getElementById('logLevel').value = preferences.logLevel || 'info';
    
    // Shortcuts (display only for now)
    if (preferences.shortcuts) {
        document.getElementById('shortcut-sensory').textContent = preferences.shortcuts['sensory-gateway'] || 'Ctrl+5';
        document.getElementById('shortcut-emotional').textContent = preferences.shortcuts['emotional-gateway'] || 'Ctrl+6';
        document.getElementById('shortcut-cognitive').textContent = preferences.shortcuts['cognitive-gateway'] || 'Ctrl+7';
        document.getElementById('shortcut-transcendent').textContent = preferences.shortcuts['transcendent-gateway'] || 'Ctrl+8';
        document.getElementById('shortcut-save').textContent = preferences.shortcuts['save-state'] || 'Ctrl+S';
        document.getElementById('shortcut-load').textContent = preferences.shortcuts['load-state'] || 'Ctrl+O';
    }
}

// Get form values as preferences object
function getFormPreferences() {
    return {
        // Appearance
        theme: document.getElementById('theme').value,
        fontSize: parseInt(document.getElementById('fontSize').value),
        fontFamily: document.getElementById('fontFamily').value,
        
        // Behavior
        startMinimized: document.getElementById('startMinimized').checked,
        minimizeToTray: document.getElementById('minimizeToTray').checked,
        closeToTray: document.getElementById('closeToTray').checked,
        autoStart: document.getElementById('autoStart').checked,
        
        // Updates
        checkForUpdates: document.getElementById('checkForUpdates').checked,
        autoDownloadUpdates: document.getElementById('autoDownloadUpdates').checked,
        
        // Consciousness Components
        enableSensoryGateway: document.getElementById('enableSensoryGateway').checked,
        enableEmotionalGateway: document.getElementById('enableEmotionalGateway').checked,
        enableCognitiveGateway: document.getElementById('enableCognitiveGateway').checked,
        enableTranscendentGateway: document.getElementById('enableTranscendentGateway').checked,
        
        // Advanced
        hardwareAcceleration: document.getElementById('hardwareAcceleration').checked,
        enableLogging: document.getElementById('enableLogging').checked,
        logLevel: document.getElementById('logLevel').value,
        
        // Keep existing shortcuts
        shortcuts: currentPreferences.shortcuts || {
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

// Setup event listeners for buttons
function setupEventListeners() {
    // Save button
    document.getElementById('saveBtn').addEventListener('click', async () => {
        const preferences = getFormPreferences();
        try {
            const result = await window.electronAPI.savePreferences(preferences);
            if (result.success) {
                showNotification('Preferences saved successfully!', 'success');
                setTimeout(() => {
                    window.electronAPI.closePreferences();
                }, 1000);
            } else {
                showNotification('Failed to save preferences: ' + result.error, 'error');
            }
        } catch (error) {
            showNotification('Error saving preferences: ' + error.message, 'error');
        }
    });
    
    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', () => {
        window.electronAPI.closePreferences();
    });
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', async () => {
        if (confirm('Are you sure you want to reset all preferences to their default values?')) {
            try {
                const defaults = await window.electronAPI.resetPreferences();
                populateForm(defaults);
                currentPreferences = defaults;
                showNotification('Preferences reset to defaults', 'info');
            } catch (error) {
                showNotification('Error resetting preferences: ' + error.message, 'error');
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 
                        type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 
                        'rgba(0, 123, 255, 0.9)'};
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 's':
                event.preventDefault();
                document.getElementById('saveBtn').click();
                break;
            case 'w':
                event.preventDefault();
                window.electronAPI.closePreferences();
                break;
        }
    } else if (event.key === 'Escape') {
        window.electronAPI.closePreferences();
    }
});

// Default preferences (fallback)
function getDefaultPreferences() {
    return {
        theme: 'quantum-dark',
        fontSize: 14,
        fontFamily: 'Consolas, Monaco, monospace',
        startMinimized: false,
        minimizeToTray: true,
        closeToTray: true,
        autoStart: false,
        enableSensoryGateway: true,
        enableEmotionalGateway: true,
        enableCognitiveGateway: true,
        enableTranscendentGateway: true,
        checkForUpdates: true,
        autoDownloadUpdates: false,
        enableLogging: false,
        logLevel: 'info',
        hardwareAcceleration: true,
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
