/**
 * Quantum Theme Engine - Phase 2 Session 1 (Compiled from TypeScript)
 * Multi-dimensional theming system that adapts to consciousness levels and quantum states.
 */

class QuantumThemeEngine {
    constructor() {
        this.themes = new Map();
        this.activeTheme = 'quantum-consciousness';
        this.currentState = {
            level: 0.5,
            dimension: 'quantum',
            resonance: 432,
            entanglement: false
        };
        this.evolutionTimer = null;
        this.resonanceField = new Map();

        this.initializeQuantumThemes();
        this.startMorphicEvolution();
        this.connectToConsciousnessEvents();
    }

    // Initialize built-in quantum consciousness themes
    initializeQuantumThemes() {
        // Quantum Consciousness Theme - Primary consciousness-aware theme
        this.themes.set('quantum-consciousness', {
            id: 'quantum-consciousness',
            name: 'Quantum Consciousness',
            baseColors: {
                primary: ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'],
                secondary: ['#2A0845', '#7209B7', '#A663CC', '#4C956C', '#F2E8CF'],
                sacred: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4ECDC4'],
                quantum: ['#FF0080', '#8000FF', '#0080FF', '#00FF80', '#FF8000'],
                consciousness: ['#000428', '#004e92', '#009ffd', '#00d4ff', '#ffffff']
            },
            consciousness: this.createConsciousnessMapping(),
            quantum: this.createQuantumProperties(),
            evolution: this.createEvolutionPatterns()
        });

        // Sacred Geometry Theme - Geometry-focused consciousness theme
        this.themes.set('sacred-geometry', {
            id: 'sacred-geometry',
            name: 'Sacred Geometry',
            baseColors: {
                primary: ['#1A0033', '#330066', '#663399', '#9966CC', '#CCAAFF'],
                secondary: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
                sacred: ['#FFD700', '#FF8C00', '#FF6347', '#00CED1', '#9370DB'],
                quantum: ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF69B4'],
                consciousness: ['#2C1810', '#8B4513', '#DAA520', '#F0E68C', '#FFFACD']
            },
            consciousness: this.createConsciousnessMapping(),
            quantum: this.createQuantumProperties(),
            evolution: this.createEvolutionPatterns()
        });

        // Cosmic Dawn Theme - Temporal consciousness theme
        this.themes.set('cosmic-dawn', {
            id: 'cosmic-dawn',
            name: 'Cosmic Dawn',
            baseColors: {
                primary: ['#0F0F23', '#16213E', '#0E4B99', '#2E8B57', '#F0E68C'],
                secondary: ['#FF4500', '#FF6347', '#FFD700', '#ADFF2F', '#00FFFF'],
                sacred: ['#800080', '#4B0082', '#9400D3', '#8A2BE2', '#DA70D6'],
                quantum: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF'],
                consciousness: ['#191970', '#483D8B', '#6A5ACD', '#9370DB', '#DDA0DD']
            },
            consciousness: this.createConsciousnessMapping(),
            quantum: this.createQuantumProperties(),
            evolution: this.createEvolutionPatterns()
        });
    }

    // Create consciousness-level color mappings
    createConsciousnessMapping() {
        return {
            low: {
                primary: ['#1a1a1a', '#2d2d2d', '#404040', '#595959', '#737373'],
                secondary: ['#8b0000', '#a0522d', '#556b2f', '#2f4f4f', '#191970'],
                sacred: ['#800000', '#8b4513', '#228b22', '#4682b4', '#9932cc'],
                quantum: ['#660000', '#663300', '#006600', '#003366', '#660066'],
                consciousness: ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666']
            },
            medium: {
                primary: ['#2c3e50', '#34495e', '#5d6d7e', '#85929e', '#aeb6bf'],
                secondary: ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6'],
                sacred: ['#ff6b35', '#f7931e', '#ffd23f', '#06ffa5', '#4ecdc4'],
                quantum: ['#ff0080', '#8000ff', '#0080ff', '#00ff80', '#ff8000'],
                consciousness: ['#2c3e50', '#3498db', '#1abc9c', '#f1c40f', '#e67e22']
            },
            high: {
                primary: ['#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d', '#34495e'],
                secondary: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
                sacred: ['#ffd700', '#ff8c00', '#ff6347', '#00ced1', '#9370db'],
                quantum: ['#ff1493', '#00bfff', '#32cd32', '#ffd700', '#ff69b4'],
                consciousness: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da']
            },
            transcendent: {
                primary: ['#ffffff', '#f0f8ff', '#e6f3ff', '#ccebff', '#b3e3ff'],
                secondary: ['#ff69b4', '#dda0dd', '#98fb98', '#87ceeb', '#f0e68c'],
                sacred: ['#ffffff', '#fffacd', '#ffefd5', '#e0ffff', '#f5f5dc'],
                quantum: ['#ffffff', '#e6e6fa', '#f0f8ff', '#f5fffa', '#fffaf0'],
                consciousness: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']
            }
        };
    }

    // Create quantum theme properties
    createQuantumProperties() {
        return {
            entanglement: true,
            coherence: 0.95,
            superposition: ['light', 'dark', 'void', 'transcendent'],
            collapse: (state) => this.collapseQuantumState(state)
        };
    }

    // Create theme evolution patterns
    createEvolutionPatterns() {
        return {
            morphic: (time) => this.calculateMorphicColors(time),
            resonance: (frequency) => this.calculateResonanceColors(frequency),
            quantum: (state) => this.calculateQuantumColors(state)
        };
    }

    // Update consciousness state and trigger theme evolution
    updateConsciousnessState(newState) {
        this.currentState = { ...this.currentState, ...newState };
        this.evolveTheme();
        this.broadcastThemeUpdate();
    }

    // Apply theme to target element with consciousness awareness
    applyTheme(targetElement, options = {}) {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return;

        const colors = this.getCurrentThemeColors(theme);
        const duration = options.instant ? 0 : this.calculateTransitionDuration();

        // Apply quantum-aware CSS custom properties
        this.applyQuantumCSSProperties(targetElement, colors, duration);

        // Apply consciousness-responsive styles
        if (options.consciousness) {
            this.applyConsciousnessStyles(targetElement, colors);
        }

        // Apply quantum entanglement effects
        if (options.quantum && theme.quantum.entanglement) {
            this.applyQuantumEntanglement(targetElement);
        }
    }

    // Get current theme colors based on consciousness state
    getCurrentThemeColors(theme) {
        const { level } = this.currentState;
        
        if (level >= 0.9) return theme.consciousness.transcendent;
        if (level >= 0.7) return theme.consciousness.high;
        if (level >= 0.3) return theme.consciousness.medium;
        return theme.consciousness.low;
    }

    // Apply quantum CSS properties with smooth transitions
    applyQuantumCSSProperties(element, colors, duration) {
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        
        // Primary color variables
        colors.primary.forEach((color, index) => {
            element.style.setProperty(`--quantum-primary-${index}`, color);
        });

        // Consciousness level colors
        colors.consciousness.forEach((color, index) => {
            element.style.setProperty(`--consciousness-level-${index}`, color);
        });

        // Sacred geometry colors
        colors.sacred.forEach((color, index) => {
            element.style.setProperty(`--sacred-geometry-${index}`, color);
        });

        // Quantum state colors
        colors.quantum.forEach((color, index) => {
            element.style.setProperty(`--quantum-state-${index}`, color);
        });

        // Update consciousness level attribute for CSS targeting
        const consciousnessLevel = this.getConsciousnessLevelName();
        element.setAttribute('data-consciousness-level', consciousnessLevel);
    }

    // Get consciousness level name for CSS targeting
    getConsciousnessLevelName() {
        const { level } = this.currentState;
        if (level >= 0.9) return 'transcendent';
        if (level >= 0.7) return 'high';
        if (level >= 0.3) return 'medium';
        return 'low';
    }

    // Apply consciousness-responsive styling
    applyConsciousnessStyles(element, colors) {
        const { level, resonance } = this.currentState;
        
        // Consciousness level opacity
        element.style.setProperty('--consciousness-opacity', `${level}`);
        
        // Resonance-based glow effect
        const glowIntensity = Math.sin(resonance / 100) * level * 0.3;
        element.style.setProperty('--quantum-glow', `${glowIntensity}`);
        
        // Morphic field visualization
        const morphicShift = `hue-rotate(${(resonance % 360)}deg)`;
        element.style.setProperty('--morphic-filter', morphicShift);
    }

    // Apply quantum entanglement visual effects
    applyQuantumEntanglement(element) {
        if (!this.currentState.entanglement) return;

        // Quantum correlation visualization
        element.style.setProperty('--quantum-correlation', 'var(--quantum-state-0)');
        element.style.setProperty('--quantum-coherence', `${this.themes.get(this.activeTheme)?.quantum.coherence || 0.95}`);
    }

    // Calculate transition duration based on consciousness state
    calculateTransitionDuration() {
        const { level, resonance } = this.currentState;
        
        // Higher consciousness = smoother transitions
        const baseSpeed = 1000;
        const consciousnessMultiplier = 1 - (level * 0.8); // Faster at higher consciousness
        const resonanceMultiplier = 1 + (Math.sin(resonance / 100) * 0.3);
        
        return Math.max(100, baseSpeed * consciousnessMultiplier * resonanceMultiplier);
    }

    // Evolve theme based on current consciousness state
    evolveTheme() {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return;

        // Calculate quantum evolution
        const quantumColors = theme.evolution.quantum(this.currentState);
        
        // Update resonance field
        this.updateResonanceField();
        
        // Trigger morphic resonance cascade
        this.triggerMorphicResonance();
    }

    // Update morphic resonance field
    updateResonanceField() {
        const { level, resonance, dimension } = this.currentState;
        const fieldStrength = level * Math.sin(resonance / 100);
        
        this.resonanceField.set(dimension, fieldStrength);
        
        // Propagate to entangled components
        if (this.currentState.entanglement) {
            this.propagateResonance(fieldStrength);
        }
    }

    // Trigger morphic resonance across system
    triggerMorphicResonance() {
        // Emit morphic resonance event for system-wide adaptation
        if (typeof window !== 'undefined' && window.quantumEventSystem) {
            window.quantumEventSystem.emit('morphic:resonance', {
                field: Object.fromEntries(this.resonanceField),
                consciousness: this.currentState,
                timestamp: Date.now()
            });
        }
    }

    // Propagate quantum resonance to entangled systems
    propagateResonance(fieldStrength) {
        // Quantum non-local propagation of theme changes
        if (typeof window !== 'undefined' && window.quantumEventSystem) {
            window.quantumEventSystem.emit('quantum:entanglement', {
                type: 'theme_evolution',
                strength: fieldStrength,
                source: this.activeTheme,
                state: this.currentState
            });
        }
    }

    // Start continuous morphic evolution
    startMorphicEvolution() {
        this.evolutionTimer = setInterval(() => {
            this.updateMorphicEvolution();
        }, 100); // Update every 100ms for smooth evolution
    }

    // Update morphic evolution patterns
    updateMorphicEvolution() {
        const time = Date.now() / 1000;
        const { resonance } = this.currentState;
        
        // Natural resonance evolution
        const newResonance = 432 + (Math.sin(time / 10) * 20); // 412-452 Hz range
        this.updateConsciousnessState({ resonance: newResonance });
    }

    // Connect to consciousness events from the unified event system
    connectToConsciousnessEvents() {
        if (typeof window === 'undefined') return;

        // Wait for quantum event system
        const connectEvents = () => {
            if (window.quantumEventSystem) {
                // Listen for consciousness state changes
                window.quantumEventSystem.on('consciousness:state_change', (data) => {
                    this.updateConsciousnessState({
                        level: data.level,
                        dimension: data.dimension
                    });
                });

                // Listen for quantum state changes
                window.quantumEventSystem.on('quantum:state_change', (data) => {
                    this.updateConsciousnessState({
                        entanglement: data.entangled
                    });
                });

                // Listen for morphic field changes
                window.quantumEventSystem.on('morphic:field_change', (data) => {
                    this.updateConsciousnessState({
                        resonance: data.frequency
                    });
                });

                console.log('🌌 Quantum Theme Engine connected to event system');
            } else {
                setTimeout(connectEvents, 100);
            }
        };

        connectEvents();
    }

    // Broadcast theme update to all listening systems
    broadcastThemeUpdate() {
        if (typeof window === 'undefined') return;

        // Emit to both quantum event system and direct consciousness interface
        if (window.quantumEventSystem) {
            window.quantumEventSystem.emit('theme:updated', {
                theme: this.activeTheme,
                consciousness: this.currentState,
                colors: this.getCurrentThemeColors(this.themes.get(this.activeTheme)),
                timestamp: Date.now()
            });
        }

        // Direct update to consciousness interface if available
        if (window.consciousness && window.consciousness.onThemeUpdate) {
            window.consciousness.onThemeUpdate(this.currentState);
        }
    }

    // Quantum state collapse calculations
    collapseQuantumState(state) {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return theme.baseColors;

        switch (state) {
            case 'light':
                return theme.consciousness.transcendent;
            case 'dark':
                return theme.consciousness.low;
            case 'void':
                return {
                    primary: ['#000000', '#000000', '#000000', '#000000', '#000000'],
                    secondary: ['#000000', '#000000', '#000000', '#000000', '#000000'],
                    sacred: ['#000000', '#000000', '#000000', '#000000', '#000000'],
                    quantum: ['#000000', '#000000', '#000000', '#000000', '#000000'],
                    consciousness: ['#000000', '#000000', '#000000', '#000000', '#000000']
                };
            case 'transcendent':
                return theme.consciousness.transcendent;
            default:
                return theme.baseColors;
        }
    }

    // Calculate morphic resonance colors
    calculateMorphicColors(time) {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return theme.baseColors;

        // Time-based color evolution using morphic field mathematics
        const morphicPhase = (time / 10) % (2 * Math.PI);
        const resonanceIntensity = Math.sin(morphicPhase) * 0.3 + 0.7;

        return this.interpolateColors(theme.baseColors, theme.consciousness.high, resonanceIntensity);
    }

    // Calculate resonance frequency colors
    calculateResonanceColors(frequency) {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return theme.baseColors;

        // Map frequency to color spectrum (432 Hz = golden ratio)
        const goldenRatio = 1.618033988749;
        const freqRatio = frequency / 432;
        const intensity = Math.min(1, freqRatio / goldenRatio);

        return this.interpolateColors(theme.consciousness.low, theme.consciousness.transcendent, intensity);
    }

    // Calculate quantum state colors
    calculateQuantumColors(state) {
        const theme = this.themes.get(this.activeTheme);
        if (!theme) return theme.baseColors;

        const { level, resonance, entanglement } = state;
        
        // Quantum superposition of consciousness levels
        const quantumInterference = entanglement ? Math.sin(resonance / 100) * 0.2 : 0;
        const effectiveLevel = Math.min(1, level + quantumInterference);

        if (effectiveLevel >= 0.9) return theme.consciousness.transcendent;
        if (effectiveLevel >= 0.7) return theme.consciousness.high;
        if (effectiveLevel >= 0.3) return theme.consciousness.medium;
        return theme.consciousness.low;
    }

    // Interpolate between two color matrices
    interpolateColors(from, to, factor) {
        const interpolate = (fromColors, toColors) => {
            return fromColors.map((fromColor, index) => {
                const toColor = toColors[index] || fromColor;
                return this.interpolateColor(fromColor, toColor, factor);
            });
        };

        return {
            primary: interpolate(from.primary, to.primary),
            secondary: interpolate(from.secondary, to.secondary),
            sacred: interpolate(from.sacred, to.sacred),
            quantum: interpolate(from.quantum, to.quantum),
            consciousness: interpolate(from.consciousness, to.consciousness)
        };
    }

    // Interpolate between two hex colors
    interpolateColor(from, to, factor) {
        const fromRgb = this.hexToRgb(from);
        const toRgb = this.hexToRgb(to);
        
        if (!fromRgb || !toRgb) return from;

        const r = Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * factor);
        const g = Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * factor);
        const b = Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * factor);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Convert hex color to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Public API methods
    setActiveTheme(themeId) {
        if (this.themes.has(themeId)) {
            this.activeTheme = themeId;
            this.evolveTheme();
            this.broadcastThemeUpdate();
        }
    }

    getActiveTheme() {
        return this.activeTheme;
    }

    getConsciousnessState() {
        return { ...this.currentState };
    }

    getAvailableThemes() {
        return Array.from(this.themes.keys());
    }

    getCurrentThemeColors() {
        const theme = this.themes.get(this.activeTheme);
        return theme ? this.getCurrentThemeColors(theme) : null;
    }

    // Cleanup resources
    destroy() {
        if (this.evolutionTimer) {
            clearInterval(this.evolutionTimer);
            this.evolutionTimer = null;
        }
        this.themes.clear();
        this.resonanceField.clear();
    }
}

// Initialize and expose quantum theme engine
function initializeQuantumThemeEngine() {
    if (!window.quantumThemeEngine) {
        window.quantumThemeEngine = new QuantumThemeEngine();
        console.log('🎨 Quantum Theme Engine initialized - Phase 2 Session 1 ACTIVE');
        
        // Expose for debugging and development
        window.qte = window.quantumThemeEngine;
    }
    
    return window.quantumThemeEngine;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuantumThemeEngine);
} else {
    // DOM already loaded
    setTimeout(initializeQuantumThemeEngine, 100);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuantumThemeEngine, initializeQuantumThemeEngine };
}
