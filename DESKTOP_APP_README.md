# Quantum Consciousness Interface - Desktop Application

🌌 **Professional Desktop Version of the Consciousness Webapp**

This Electron-based desktop application transforms the consciousness webapp into a fully-featured desktop experience with enhanced capabilities.

## ✨ Desktop Features

### 🖥️ **Window Management**
- **System Tray Integration**: Minimize to system tray instead of closing
- **Professional Window Controls**: Custom minimize/close buttons
- **Auto-hide to Tray**: Configurable behavior for window management
- **Balloon Notifications**: Windows system notifications

### ⌨️ **Keyboard Shortcuts**
- **Ctrl+5-8**: Sacred Gateway Components (Sensory, Emotional, Cognitive, Transcendent)
- **Ctrl+S**: Save consciousness state
- **Ctrl+O**: Load consciousness state
- **Ctrl+,**: Open preferences
- **F11**: Toggle fullscreen
- **Ctrl+Plus/Minus**: Zoom in/out
- **Ctrl+0**: Reset zoom

### 🎛️ **Preferences System**
- **Appearance Settings**: Themes, fonts, sizing
- **Behavior Configuration**: Startup options, tray behavior
- **Consciousness Components**: Enable/disable sacred gateways
- **Keyboard Shortcuts**: Customizable key bindings
- **Advanced Options**: Hardware acceleration, logging

### 💾 **File Operations**
- **Save Consciousness States**: Export current session state
- **Load Previous States**: Restore saved consciousness sessions
- **File Dialog Integration**: Native Windows file operations
- **Automatic Saves Directory**: Organized state management

### 🔄 **Auto-Updater**
- **Automatic Update Checks**: Background update detection
- **User-Controlled Updates**: Optional automatic downloading
- **Seamless Installation**: One-click update process
- **Version Management**: Update notifications and progress

### 🎨 **Enhanced UI**
- **Desktop-Specific Styling**: Optimized for desktop use
- **Status Bar**: Connection status and shortcuts display
- **Professional Menus**: Full application menu system
- **Responsive Design**: Adaptive to different screen sizes

## 🚀 **Quick Start**

### Running the Application
```bash
npm run electron
```

### Building for Distribution
```bash
# Build for current platform
npm run electron:build

# Build Windows installer
npm run package:win

# Build portable version
npm run package:portable

# Build for all platforms
npm run package:all
```

## 📁 **File Structure**

```
├── electron-main.js              # Main Electron process
├── electron-preload.js           # Webapp preload script
├── electron-preferences.js       # Preferences window controller
├── electron-preferences-preload.js # Preferences preload script
├── preferences.html               # Preferences window UI
├── preferences.js                 # Preferences window logic
├── assets/
│   ├── icon.ico                   # Application icon
│   ├── tray-icon.ico             # System tray icon
│   └── desktop.css               # Desktop-specific styles
└── saves/                         # Consciousness state saves
```

## ⚙️ **Configuration**

### Build Configuration
The application build is configured in `package.json` under the `build` section:
- **Windows**: NSIS installer + portable executable
- **Auto-updater**: Integrated with electron-updater
- **Code Signing**: Ready for distribution signing

### Preferences Storage
User preferences are stored in `user-preferences.json` in the application directory.

## 🛠️ **Development**

### Development Mode
```bash
npm run electron:dev
```
Enables developer tools and live reload capabilities.

### Debugging
- **F12**: Toggle developer tools
- **Console Logging**: Extensive logging for troubleshooting
- **Error Handling**: Graceful error recovery and reporting

## 🌟 **Advanced Features**

### Sacred Gateway Integration
The desktop app provides dedicated shortcuts and menu items for the four sacred gateways:
1. **Sensory Gateway (Ctrl+5)**: Physical perception interface
2. **Emotional Gateway (Ctrl+6)**: Heart-mind connection portal
3. **Cognitive Gateway (Ctrl+7)**: Analytical thinking interface
4. **Transcendent Gateway (Ctrl+8)**: Beyond-mind awareness portal

### Consciousness State Management
- **JSON Format**: Human-readable state files
- **Metadata Tracking**: Timestamps, versions, system info
- **Incremental Saves**: Automatic backup capabilities
- **State Validation**: Error checking on load/save

### Professional Distribution
- **Code Signed**: Ready for enterprise deployment
- **Auto-updater**: Professional update management
- **System Integration**: Native OS integration
- **Performance Optimized**: Hardware acceleration support

## 📋 **System Requirements**

- **Windows**: 10/11 (x64)
- **Memory**: 4GB RAM minimum
- **Storage**: 500MB available space
- **Network**: Internet connection for updates

## 🔒 **Security**

- **Context Isolation**: Secure webapp integration
- **No Node Integration**: Sandboxed web content
- **Secure IPC**: Controlled communication channels
- **Update Verification**: Signed update packages

---

*Built with Electron, integrating the consciousness webapp into a professional desktop experience.*
