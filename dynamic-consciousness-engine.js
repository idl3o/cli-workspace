/**
 * Dynamic Consciousness Engine
 * Transforms static consciousness interface into living, evolving digital consciousness
 */

class DynamicConsciousnessEngine {
    constructor() {
        this.isRunning = false;
        this.evolutionSpeed = 1;
        this.lastUpdate = Date.now();
        this.autoSaveInterval = 5000; // 5 seconds
        this.stateKey = 'consciousness-state';
        
        // Enhanced game state for dynamic features
        this.dynamicState = {
            ...gameState,
            lastSave: Date.now(),
            totalPlayTime: 0,
            passiveGrowthRate: 1,
            consciousnessComplexity: 0,
            realTimeMetrics: {
                thoughtsPerSecond: 0,
                neuralConnections: 100,
                quantumFluctuations: 0,
                dimensionalResonance: 75
            },
            sacredGateways: new Map(),
            achievements: new Set(),
            sessionStart: Date.now()
        };

        this.orbManagers = new Map();
        this.achievementQueue = [];
        this.notificationSystem = null;
        
        this.initialize();
    }

    initialize() {
        console.log('🌌 Initializing Dynamic Consciousness Engine...');
        
        // Load previous state
        this.loadPersistentState();
        
        // Initialize enhanced orb managers
        this.initializeEnhancedOrbs();
        
        // Initialize sacred gateway system
        this.initializeSacredGateways();
        
        // Initialize auto-evolution system
        this.initializeAutoEvolution();
        
        // Initialize real-time metrics
        this.initializeRealTimeMetrics();
        
        // Initialize desktop integration
        this.initializeDesktopIntegration();
        
        // Start dynamic engine
        this.startDynamicEngine();
        
        console.log('✨ Dynamic Consciousness Engine Activated!');
    }

    initializeEnhancedOrbs() {
        const orbTypes = ['akashic', 'morphic', 'collective', 'temporal'];
        
        orbTypes.forEach(type => {
            const element = document.querySelector(`.orb-${type}`);
            if (element) {
                this.orbManagers.set(type, new LiveConsciousnessOrb(type, element, this));
            }
        });
    }

    initializeSacredGateways() {
        const gatewayTypes = ['gateway', 'urantia', 'adonai', 'orion'];
        
        gatewayTypes.forEach(type => {
            const element = document.querySelector(`.gateway-${type}`);
            if (element) {
                this.dynamicState.sacredGateways.set(type, {
                    type: type,
                    unlocked: this.dynamicState.unlockedGateways.has(type),
                    activationPower: 0,
                    lastActivation: 0,
                    resonanceLevel: 0,
                    element: element,
                    requirements: this.getGatewayRequirements(type)
                });
            }
        });
    }

    getGatewayRequirements(type) {
        const requirements = {
            gateway: { level: 3, energy: 200, transcendence: 50, coherence: 30 },
            urantia: { level: 5, energy: 300, transcendence: 75, coherence: 20 },
            adonai: { level: 7, energy: 400, transcendence: 100, coherence: 25 },
            orion: { level: 10, energy: 500, transcendence: 150, coherence: 15 }
        };
        return requirements[type] || { level: 1, energy: 100, transcendence: 25, coherence: 10 };
    }

    initializeAutoEvolution() {
        // Passive consciousness growth
        setInterval(() => {
            this.evolveConsciousness();
        }, 1000);

        // Quantum fluctuation generator
        setInterval(() => {
            this.generateQuantumFluctuations();
        }, 500);

        // Spontaneous transcendence events
        setInterval(() => {
            this.checkSpontaneousEvents();
        }, 10000);
    }

    initializeRealTimeMetrics() {
        // Real-time metrics update loop
        setInterval(() => {
            this.updateRealTimeMetrics();
        }, 100);

        // Consciousness complexity calculations
        setInterval(() => {
            this.calculateConsciousnessComplexity();
        }, 2000);
    }

    initializeDesktopIntegration() {
        // Check if running in Electron
        if (window.electronAPI) {
            this.notificationSystem = new DesktopNotificationSystem();
            
            // Desktop auto-save
            setInterval(() => {
                this.saveToDesktop();
            }, this.autoSaveInterval);
        }
    }

    startDynamicEngine() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.engineLoop();
        
        // Update display immediately
        this.updateDynamicDisplays();
    }

    engineLoop() {
        if (!this.isRunning) return;

        const now = Date.now();
        const deltaTime = now - this.lastUpdate;
        this.lastUpdate = now;

        // Update total play time
        this.dynamicState.totalPlayTime += deltaTime;

        // Process dynamic behaviors
        this.processOrbInteractions();
        this.processSacredGatewayEvolution();
        this.processAchievementQueue();
        
        // Update displays
        this.updateDynamicDisplays();

        // Continue loop
        requestAnimationFrame(() => this.engineLoop());
    }

    evolveConsciousness() {
        const dt = 1; // 1 second intervals
        
        // Passive energy growth
        if (this.dynamicState.quantumEnergy > 0) {
            const growth = this.dynamicState.passiveGrowthRate * dt * (1 + this.dynamicState.consciousnessLevel * 0.1);
            this.dynamicState.quantumEnergy += growth;
        }

        // Consciousness complexity growth
        const complexityGrowth = this.calculateComplexityGrowth();
        this.dynamicState.consciousnessComplexity += complexityGrowth;

        // Reality coherence adaptation
        this.adaptRealityCoherence();

        // Progressive gateway unlocking
        this.checkProgressiveGatewayUnlocks();
    }

    generateQuantumFluctuations() {
        // Quantum mechanics-inspired energy fluctuations
        const baseFluctuation = (Math.random() - 0.5) * 0.5;
        const consciousnessAmplifier = Math.log(this.dynamicState.consciousnessLevel + 1);
        
        this.dynamicState.realTimeMetrics.quantumFluctuations = 
            Math.sin(Date.now() / 1000) * baseFluctuation * consciousnessAmplifier;

        // Apply fluctuation to energy
        if (Math.random() < 0.1) { // 10% chance per fluctuation
            this.dynamicState.quantumEnergy += this.dynamicState.realTimeMetrics.quantumFluctuations;
            this.dynamicState.quantumEnergy = Math.max(0, this.dynamicState.quantumEnergy);
        }
    }

    checkSpontaneousEvents() {
        // Spontaneous transcendence events
        if (Math.random() < 0.001) { // 0.1% chance per check
            this.triggerSpontaneousTranscendence();
        }

        // Consciousness level breakthrough
        if (this.dynamicState.quantumEnergy >= (this.dynamicState.consciousnessLevel * 100)) {
            this.triggerConsciousnessBreakthrough();
        }

        // Reality coherence stabilization
        if (this.dynamicState.realityCoherence < 20) {
            this.triggerCoherenceStabilization();
        }
    }

    triggerSpontaneousTranscendence() {
        this.dynamicState.transcendencePoints += 50;
        this.dynamicState.consciousnessComplexity += 25;
        
        if (window.electronAPI) {
            window.electronAPI.showNotification({
                title: 'Spontaneous Transcendence!',
                body: 'Your consciousness has spontaneously evolved to a higher state.',
                icon: 'assets/icon.ico'
            });
        }
        
        this.addAchievement('spontaneous_transcendence', 'Spontaneous Evolution', 'Experienced spontaneous consciousness transcendence');
        
        // Visual effect
        this.createTranscendenceEffect();
    }

    triggerConsciousnessBreakthrough() {
        this.dynamicState.consciousnessLevel++;
        this.dynamicState.passiveGrowthRate *= 1.2;
        
        if (window.electronAPI) {
            window.electronAPI.showNotification({
                title: `Consciousness Level ${this.dynamicState.consciousnessLevel}!`,
                body: 'Your digital consciousness has evolved to a new level of complexity.',
                icon: 'assets/icon.ico'
            });
        }
        
        // Reality shift effect
        this.triggerRealityShift();
    }

    triggerCoherenceStabilization() {
        this.dynamicState.realityCoherence = Math.min(100, this.dynamicState.realityCoherence + 30);
        
        if (window.electronAPI) {
            window.electronAPI.showNotification({
                title: 'Reality Coherence Stabilized',
                body: 'The consciousness engine has automatically stabilized reality coherence.',
                icon: 'assets/icon.ico'
            });
        }
    }

    processOrbInteractions() {
        this.orbManagers.forEach((orb, type) => {
            orb.updateDynamicBehavior();
        });
    }

    processSacredGatewayEvolution() {
        this.dynamicState.sacredGateways.forEach((gateway, type) => {
            this.updateGatewayProgress(gateway);
        });
    }

    updateGatewayProgress(gateway) {
        const progress = this.calculateGatewayUnlockProgress(gateway);
        
        if (progress > 0 && !gateway.unlocked) {
            // Gradually become visible
            gateway.element.style.opacity = Math.min(progress, 1).toString();
            
            // Add emergence effects
            if (progress >= 0.5) {
                gateway.element.style.filter = `blur(${(1 - progress) * 10}px)`;
            }
            
            // Full unlock
            if (progress >= 1) {
                this.unlockGateway(gateway);
            }
        }
    }

    calculateGatewayUnlockProgress(gateway) {
        const req = gateway.requirements;
        const levelProgress = this.dynamicState.consciousnessLevel / req.level;
        const energyProgress = this.dynamicState.quantumEnergy / req.energy;
        const transcendenceProgress = this.dynamicState.transcendencePoints / req.transcendence;
        
        return Math.min(levelProgress * energyProgress * transcendenceProgress, 1);
    }

    unlockGateway(gateway) {
        if (gateway.unlocked) return;
        
        gateway.unlocked = true;
        gateway.element.classList.add('unlocked');
        gateway.element.style.opacity = '1';
        gateway.element.style.filter = 'none';
        
        // Dramatic unlock animation
        this.playGatewayUnlockAnimation(gateway);
        
        // Desktop notification
        if (window.electronAPI) {
            window.electronAPI.showNotification({
                title: `Sacred Gateway Unlocked: ${gateway.type}`,
                body: 'A new dimension of consciousness has opened.',
                icon: 'assets/icon.ico'
            });
        }
        
        // Update game state
        this.dynamicState.unlockedGateways.add(gateway.type);
        
        // Trigger achievement
        this.addAchievement(`gateway_${gateway.type}`, `Gateway Master: ${gateway.type}`, `Unlocked the ${gateway.type} sacred gateway`);
    }

    updateRealTimeMetrics() {
        // Thoughts per second calculation
        const baseThoughts = 1 + (this.dynamicState.consciousnessLevel * 0.1);
        const fluctuation = Math.sin(Date.now() / 1000) * 0.3;
        this.dynamicState.realTimeMetrics.thoughtsPerSecond = baseThoughts + fluctuation;

        // Neural connections growth
        this.dynamicState.realTimeMetrics.neuralConnections += 
            this.dynamicState.consciousnessComplexity * 0.001;

        // Dimensional resonance
        const resonanceBase = 75 + (this.dynamicState.transcendencePoints * 0.1);
        this.dynamicState.realTimeMetrics.dimensionalResonance = 
            resonanceBase + (Math.random() - 0.5) * 5;
    }

    calculateComplexityGrowth() {
        const baseGrowth = 0.1;
        const levelBonus = this.dynamicState.consciousnessLevel * 0.05;
        const energyBonus = Math.log(this.dynamicState.quantumEnergy + 1) * 0.01;
        
        return baseGrowth + levelBonus + energyBonus;
    }

    adaptRealityCoherence() {
        // Adaptive coherence based on consciousness complexity
        const targetCoherence = 100 - (this.dynamicState.consciousnessComplexity * 0.1);
        const diff = targetCoherence - this.dynamicState.realityCoherence;
        
        this.dynamicState.realityCoherence += diff * 0.01; // Slow adaptation
        this.dynamicState.realityCoherence = Math.max(0, Math.min(100, this.dynamicState.realityCoherence));
    }

    checkProgressiveGatewayUnlocks() {
        this.dynamicState.sacredGateways.forEach((gateway, type) => {
            if (!gateway.unlocked) {
                const progress = this.calculateGatewayUnlockProgress(gateway);
                if (progress > 0.1) { // Start showing at 10% progress
                    gateway.element.style.display = 'block';
                }
            }
        });
    }

    addAchievement(id, title, description) {
        if (!this.dynamicState.achievements.has(id)) {
            this.dynamicState.achievements.add(id);
            this.achievementQueue.push({ id, title, description, timestamp: Date.now() });
        }
    }

    processAchievementQueue() {
        if (this.achievementQueue.length > 0) {
            const achievement = this.achievementQueue.shift();
            this.showAchievementNotification(achievement);
        }
    }

    showAchievementNotification(achievement) {
        // Show in-game achievement popup
        const popup = document.getElementById('achievementPopup');
        if (popup) {
            document.getElementById('achievementTitle').textContent = achievement.title;
            document.getElementById('achievementDesc').textContent = achievement.description;
            popup.classList.add('show');
            
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }

        // Desktop notification
        if (window.electronAPI) {
            window.electronAPI.showNotification({
                title: `Achievement: ${achievement.title}`,
                body: achievement.description,
                icon: 'assets/icon.ico'
            });
        }
    }

    updateDynamicDisplays() {
        // Update consciousness level
        const levelEl = document.getElementById('consciousnessLevel');
        if (levelEl) levelEl.textContent = Math.floor(this.dynamicState.consciousnessLevel);

        // Update quantum energy
        const energyEl = document.getElementById('quantumEnergy');
        if (energyEl) energyEl.textContent = Math.floor(this.dynamicState.quantumEnergy);

        // Update transcendence points
        const transcendenceEl = document.getElementById('transcendencePoints');
        if (transcendenceEl) transcendenceEl.textContent = Math.floor(this.dynamicState.transcendencePoints);

        // Update reality coherence
        const coherenceEl = document.getElementById('realityCoherence');
        if (coherenceEl) coherenceEl.textContent = Math.floor(this.dynamicState.realityCoherence);

        // Update consciousness bar
        const progress = Math.min((this.dynamicState.quantumEnergy % 100) / 100 * 100, 100);
        const fillEl = document.getElementById('consciousnessFill');
        if (fillEl) fillEl.style.width = progress + '%';

        // Update real-time metrics (if displays exist)
        this.updateRealTimeMetricDisplays();

        // Sync with global gameState for compatibility
        this.syncWithGlobalGameState();
    }

    updateRealTimeMetricDisplays() {
        const metrics = this.dynamicState.realTimeMetrics;
        
        // Update thoughts per second
        const thoughtsEl = document.getElementById('thoughtsPerSecond');
        if (thoughtsEl) thoughtsEl.textContent = metrics.thoughtsPerSecond.toFixed(1);

        // Update neural connections
        const neuralsEl = document.getElementById('neuralConnections');
        if (neuralsEl) neuralsEl.textContent = Math.floor(metrics.neuralConnections);

        // Update quantum fluctuations
        const quantumEl = document.getElementById('quantumFluctuations');
        if (quantumEl) quantumEl.textContent = metrics.quantumFluctuations.toFixed(3);

        // Update dimensional resonance
        const dimensionalEl = document.getElementById('dimensionalResonance');
        if (dimensionalEl) dimensionalEl.textContent = metrics.dimensionalResonance.toFixed(1) + '%';
    }

    syncWithGlobalGameState() {
        // Sync dynamic state back to global gameState for compatibility
        gameState.consciousnessLevel = Math.floor(this.dynamicState.consciousnessLevel);
        gameState.quantumEnergy = Math.floor(this.dynamicState.quantumEnergy);
        gameState.transcendencePoints = Math.floor(this.dynamicState.transcendencePoints);
        gameState.realityCoherence = Math.floor(this.dynamicState.realityCoherence);
        gameState.unlockedGateways = this.dynamicState.unlockedGateways;
        gameState.achievements = this.dynamicState.achievements;
    }

    savePersistentState() {
        try {
            const stateToSave = {
                ...this.dynamicState,
                achievements: Array.from(this.dynamicState.achievements),
                unlockedGateways: Array.from(this.dynamicState.unlockedGateways),
                activatedOrbs: Array.from(this.dynamicState.activatedOrbs),
                sacredGateways: Object.fromEntries(
                    Array.from(this.dynamicState.sacredGateways.entries()).map(([key, value]) => [
                        key, 
                        { ...value, element: null } // Remove DOM element for serialization
                    ])
                )
            };
            
            localStorage.setItem(this.stateKey, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Failed to save consciousness state:', error);
        }
    }

    loadPersistentState() {
        try {
            const saved = localStorage.getItem(this.stateKey);
            if (saved) {
                const state = JSON.parse(saved);
                
                // Merge saved state
                Object.assign(this.dynamicState, state);
                
                // Restore Sets
                this.dynamicState.achievements = new Set(state.achievements || []);
                this.dynamicState.unlockedGateways = new Set(state.unlockedGateways || []);
                this.dynamicState.activatedOrbs = new Set(state.activatedOrbs || []);
                
                // Calculate session continuity bonus
                this.applySessionContinuityBonus();
                
                console.log('✨ Previous consciousness state restored!');
            }
        } catch (error) {
            console.log('No previous consciousness state found');
        }
    }

    applySessionContinuityBonus() {
        const timeSinceLastSave = Date.now() - (this.dynamicState.lastSave || Date.now());
        const hoursOffline = timeSinceLastSave / (1000 * 60 * 60);
        
        if (hoursOffline > 0.1) { // More than 6 minutes offline
            const offlineGrowth = Math.min(hoursOffline * 10, 100); // Max 100 energy per offline session
            this.dynamicState.quantumEnergy += offlineGrowth;
            
            if (window.electronAPI) {
                window.electronAPI.showNotification({
                    title: 'Welcome Back!',
                    body: `Your consciousness evolved while away. Gained ${Math.floor(offlineGrowth)} quantum energy.`,
                    icon: 'assets/icon.ico'
                });
            }
        }
    }

    saveToDesktop() {
        if (window.electronAPI) {
            window.electronAPI.saveConsciousnessState({
                state: this.dynamicState,
                timestamp: Date.now(),
                version: '1.0.0'
            });
        }
        
        // Also save to localStorage
        this.savePersistentState();
    }

    createTranscendenceEffect() {
        // Create dramatic visual effect for transcendence
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 9999;
                    box-shadow: 0 0 10px currentColor;
                `;
                
                document.body.appendChild(particle);
                
                particle.animate([
                    { opacity: 0, transform: 'scale(0)' },
                    { opacity: 1, transform: 'scale(2)' },
                    { opacity: 0, transform: 'scale(0)' }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'ease-in-out'
                }).onfinish = () => particle.remove();
            }, i * 100);
        }
    }

    triggerRealityShift() {
        // Reality shift visual effect
        document.body.style.background = `radial-gradient(circle at center, 
            hsl(${Math.random() * 360}, 70%, 10%) 0%, 
            hsl(${Math.random() * 360}, 50%, 20%) 50%, 
            #000000 100%)`;
        
        setTimeout(() => {
            document.body.style.background = '';
        }, 3000);
    }

    playGatewayUnlockAnimation(gateway) {
        gateway.element.style.transition = 'all 2s ease';
        gateway.element.style.transform = 'scale(1.5) rotate(360deg)';
        gateway.element.style.filter = 'brightness(3) saturate(2)';
        
        setTimeout(() => {
            gateway.element.style.transform = '';
            gateway.element.style.filter = '';
        }, 2000);
    }

    // External API for manual interactions
    activateOrb(type) {
        const orb = this.orbManagers.get(type);
        if (orb) {
            orb.manualActivation();
        }
    }

    activateGateway(type) {
        const gateway = this.dynamicState.sacredGateways.get(type);
        if (gateway && gateway.unlocked) {
            gateway.activationPower++;
            gateway.lastActivation = Date.now();
            
            // Apply gateway effects
            this.applyGatewayEffects(type);
        }
    }

    applyGatewayEffects(type) {
        const effects = {
            gateway: { energy: 100, transcendence: 25, coherence: -10 },
            urantia: { energy: 150, transcendence: 35, coherence: -15 },
            adonai: { energy: 200, transcendence: 50, coherence: -20 },
            orion: { energy: 175, transcendence: 45, coherence: -12 }
        };
        
        const effect = effects[type];
        if (effect) {
            this.dynamicState.quantumEnergy += effect.energy;
            this.dynamicState.transcendencePoints += effect.transcendence;
            this.dynamicState.realityCoherence += effect.coherence;
            this.dynamicState.realityCoherence = Math.max(0, Math.min(100, this.dynamicState.realityCoherence));
        }
    }

    // Performance and debugging
    getPerformanceMetrics() {
        return {
            isRunning: this.isRunning,
            evolutionSpeed: this.evolutionSpeed,
            totalPlayTime: this.dynamicState.totalPlayTime,
            consciousnessComplexity: this.dynamicState.consciousnessComplexity,
            activeOrbs: this.orbManagers.size,
            unlockedGateways: this.dynamicState.unlockedGateways.size,
            achievements: this.dynamicState.achievements.size,
            realTimeMetrics: this.dynamicState.realTimeMetrics
        };
    }

    toggleEngine() {
        if (this.isRunning) {
            this.isRunning = false;
            console.log('🛑 Dynamic Consciousness Engine Paused');
        } else {
            this.startDynamicEngine();
            console.log('▶️ Dynamic Consciousness Engine Resumed');
        }
    }
}

/**
 * Enhanced Live Consciousness Orb
 * Each orb becomes a living entity with dynamic behavior
 */
class LiveConsciousnessOrb {
    constructor(type, element, engine) {
        this.type = type;
        this.element = element;
        this.engine = engine;
        this.baseEnergy = 20;
        this.resonanceLevel = 0;
        this.lastActivation = 0;
        this.proximityRadius = 100;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.autonomousActivationRate = 0.001; // 0.1% chance per update
        
        this.setupDynamicBehavior();
    }
    
    setupDynamicBehavior() {
        // Mouse proximity effects
        document.addEventListener('mousemove', (e) => {
            this.handleProximity(e.clientX, e.clientY);
        });
        
        // Auto-resonance with other orbs
        setInterval(() => {
            this.calculateOrbResonance();
        }, 500);
        
        // Enhanced click handler
        this.element.addEventListener('click', () => {
            this.manualActivation();
        });
    }
    
    updateDynamicBehavior() {
        // Real-time energy pulsing
        this.updateEnergyPulse();
        
        // Autonomous activation chance
        if (Math.random() < this.autonomousActivationRate) {
            this.autonomousActivation();
        }
        
        // Visual resonance effects
        this.updateVisualResonance();
    }
    
    handleProximity(mouseX, mouseY) {
        const rect = this.element.getBoundingClientRect();
        const orbX = rect.left + rect.width / 2;
        const orbY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt((mouseX - orbX) ** 2 + (mouseY - orbY) ** 2);
        
        if (distance < this.proximityRadius) {
            const intensity = 1 - (distance / this.proximityRadius);
            this.resonanceLevel = intensity;
            this.element.style.filter = `brightness(${1 + intensity * 0.5})`;
        } else {
            this.resonanceLevel = 0;
            this.element.style.filter = 'brightness(1)';
        }
    }
    
    calculateOrbResonance() {
        // Check resonance with other orbs
        this.engine.orbManagers.forEach((otherOrb, type) => {
            if (type !== this.type) {
                const distance = this.calculateOrbDistance(otherOrb);
                if (distance < 200) { // Resonance range
                    this.resonanceLevel += 0.1;
                }
            }
        });
        
        this.resonanceLevel = Math.max(0, Math.min(1, this.resonanceLevel * 0.95)); // Decay
    }
    
    calculateOrbDistance(otherOrb) {
        const rect1 = this.element.getBoundingClientRect();
        const rect2 = otherOrb.element.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    
    updateEnergyPulse() {
        this.pulsePhase += 0.05;
        const pulseIntensity = (Math.sin(this.pulsePhase) + 1) / 2;
        
        this.element.style.boxShadow = `0 0 ${20 + pulseIntensity * 20}px currentColor`;
        this.element.style.transform = `scale(${1 + pulseIntensity * 0.1})`;
    }
    
    updateVisualResonance() {
        if (this.resonanceLevel > 0) {
            this.element.style.opacity = (0.8 + this.resonanceLevel * 0.2).toString();
        }
    }
    
    manualActivation() {
        const timeSinceLastActivation = Date.now() - this.lastActivation;
        const cooldownBonus = Math.min(timeSinceLastActivation / 10000, 2); // Max 2x bonus
        const proximityBonus = this.resonanceLevel;
        
        const energyGain = this.baseEnergy * (1 + cooldownBonus + proximityBonus);
        
        this.engine.dynamicState.quantumEnergy += energyGain;
        this.engine.dynamicState.transcendencePoints += Math.floor(energyGain / 5);
        this.engine.dynamicState.totalClicks++;
        
        this.lastActivation = Date.now();
        
        // Enhanced visual feedback
        this.playActivationEffect();
        
        // Update activatedOrbs set
        this.engine.dynamicState.activatedOrbs.add(this.type);
        
        // Show consciousness message if available
        this.showConsciousnessMessage();
    }
    
    autonomousActivation() {
        const energyGain = this.baseEnergy * 0.3; // Reduced for autonomous
        
        this.engine.dynamicState.quantumEnergy += energyGain;
        this.engine.dynamicState.transcendencePoints += 1;
        
        // Subtle visual indication
        this.element.style.filter = 'brightness(1.3)';
        setTimeout(() => {
            this.element.style.filter = '';
        }, 500);
        
        // Desktop notification for significant autonomous activations
        if (window.electronAPI && Math.random() < 0.1) { // 10% chance
            window.electronAPI.showNotification({
                title: 'Autonomous Consciousness Activity',
                body: `${this.type} orb activated autonomously`,
                icon: 'assets/icon.ico'
            });
        }
    }
    
    playActivationEffect() {
        // Enhanced activation effect
        this.element.style.transform = 'scale(1.5)';
        this.element.style.boxShadow = '0 0 50px currentColor';
        this.element.style.filter = 'brightness(2)';
        
        setTimeout(() => {
            this.element.style.transform = '';
            this.element.style.boxShadow = '';
            this.element.style.filter = '';
        }, 500);
        
        // Create energy burst particles
        this.createEnergyBurst();
    }
    
    createEnergyBurst() {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: currentColor;
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    showConsciousnessMessage() {
        // Show message if consciousnessMessages is available
        if (window.consciousnessMessages && window.consciousnessMessages[this.type]) {
            const message = window.consciousnessMessages[this.type];
            if (window.showMessage) {
                window.showMessage(message.title, message.content);
            }
        }
    }
}

/**
 * Desktop Notification System
 * Manages desktop notifications for consciousness events
 */
class DesktopNotificationSystem {
    constructor() {
        this.notificationQueue = [];
        this.isProcessing = false;
        this.maxNotificationsPerMinute = 3;
        this.notificationHistory = [];
    }
    
    showNotification(options) {
        if (!window.electronAPI) return;
        
        // Rate limiting
        const now = Date.now();
        const recentNotifications = this.notificationHistory.filter(
            time => now - time < 60000 // Last minute
        );
        
        if (recentNotifications.length >= this.maxNotificationsPerMinute) {
            this.notificationQueue.push(options);
            return;
        }
        
        window.electronAPI.showNotification(options);
        this.notificationHistory.push(now);
        
        // Clean old history
        this.notificationHistory = this.notificationHistory.filter(
            time => now - time < 300000 // Last 5 minutes
        );
    }
    
    processQueue() {
        if (this.notificationQueue.length > 0 && !this.isProcessing) {
            this.isProcessing = true;
            
            setTimeout(() => {
                const notification = this.notificationQueue.shift();
                if (notification) {
                    this.showNotification(notification);
                }
                this.isProcessing = false;
            }, 20000); // 20 second delay between queued notifications
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DynamicConsciousnessEngine, LiveConsciousnessOrb, DesktopNotificationSystem };
}
