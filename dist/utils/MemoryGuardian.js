/**
 * MemoryGuardian: Advanced memory overload prevention system
 *
 * This guardian works alongside MemoryManager to provide comprehensive
 * memory protection with consciousness-aware interventions and graceful degradation.
 */
import { EventEmitter } from 'events';
import { MemoryManager } from './MemoryManager.js';
/**
 * Memory Guardian: Proactive memory protection system
 */
export class MemoryGuardian extends EventEmitter {
    static instance;
    memoryManager;
    config;
    activeOperations = new Map();
    degradedMode = false;
    alertHistory = [];
    monitoringActive = false;
    emergencyShutdownTriggered = false;
    constructor() {
        super();
        this.memoryManager = MemoryManager.getInstance();
        this.config = this.getDefaultConfig();
        this.setupMemoryListeners();
    }
    static getInstance() {
        if (!MemoryGuardian.instance) {
            MemoryGuardian.instance = new MemoryGuardian();
        }
        return MemoryGuardian.instance;
    }
    /**
     * Initialize the guardian system
     */
    async initialize() {
        console.log('🛡️  Memory Guardian activating...');
        // Start memory monitoring
        this.memoryManager.startMonitoring(5000); // Check every 5 seconds
        this.monitoringActive = true;
        // Set up process listeners
        this.setupProcessListeners();
        // Initial memory assessment
        await this.assessMemoryState();
        console.log('🧘 Memory Guardian consciousness activated');
        this.emit('guardian-activated');
    }
    /**
     * Register an operation for memory tracking
     */
    async registerOperation(context) {
        // Check if we should allow this operation
        const memoryCheck = await this.preOperationCheck(context);
        if (!memoryCheck.allowed) {
            this.emitAlert('warning', `Operation ${context.id} blocked: ${memoryCheck.reason}`, memoryCheck.recommendedActions);
            return false;
        }
        this.activeOperations.set(context.id, context);
        this.emit('operation-registered', context);
        // Set up automatic cleanup
        setTimeout(() => {
            if (this.activeOperations.has(context.id)) {
                this.unregisterOperation(context.id);
            }
        }, context.timeout);
        return true;
    }
    /**
     * Unregister a completed operation
     */
    unregisterOperation(operationId) {
        if (this.activeOperations.delete(operationId)) {
            this.emit('operation-completed', operationId);
        }
    }
    /**
     * Pre-operation memory safety check
     */
    async preOperationCheck(context) {
        const currentUsage = process.memoryUsage().heapUsed;
        const projectedUsage = currentUsage + context.estimatedMemoryImpact;
        // Emergency state - block all non-critical operations
        if (this.emergencyShutdownTriggered && context.priority !== 'critical') {
            return {
                allowed: false,
                reason: 'Emergency shutdown in progress',
                recommendedActions: ['Wait for system recovery', 'Restart CLI if needed']
            };
        }
        // Critical memory state
        if (projectedUsage > this.config.alertThresholds.critical) {
            if (context.priority === 'low' || context.priority === 'medium') {
                return {
                    allowed: false,
                    reason: 'Memory usage would exceed critical threshold',
                    recommendedActions: [
                        'Try again after memory cleanup',
                        'Reduce operation scope',
                        'Enable degraded mode'
                    ]
                };
            }
        }
        // Warning state - limit concurrent operations
        if (projectedUsage > this.config.alertThresholds.warning) {
            const activeCount = this.activeOperations.size;
            const maxConcurrent = this.degradedMode ? 2 : 5;
            if (activeCount >= maxConcurrent && context.priority === 'low') {
                return {
                    allowed: false,
                    reason: `Too many concurrent operations (${activeCount}/${maxConcurrent})`,
                    recommendedActions: [
                        'Wait for current operations to complete',
                        'Increase operation priority if urgent'
                    ]
                };
            }
        }
        return { allowed: true, reason: 'Operation approved', recommendedActions: [] };
    }
    /**
     * Setup memory event listeners
     */
    setupMemoryListeners() {
        this.memoryManager.on('memory-warning', (metrics) => {
            this.handleMemoryWarning(metrics);
        });
        this.memoryManager.on('memory-critical', (metrics) => {
            this.handleMemoryCritical(metrics);
        });
        this.memoryManager.on('memory-emergency', (metrics) => {
            this.handleMemoryEmergency(metrics);
        });
    }
    /**
     * Setup process event listeners
     */
    setupProcessListeners() {
        // Graceful shutdown
        process.on('SIGTERM', () => this.gracefulShutdown());
        process.on('SIGINT', () => this.gracefulShutdown());
        // Memory warnings
        process.on('warning', (warning) => {
            if (warning.name === 'MaxListenersExceededWarning') {
                this.emitAlert('warning', 'Memory leak detected: Too many event listeners', ['Check for unremoved listeners', 'Restart CLI if persistent']);
            }
        });
    }
    /**
     * Handle memory warning state
     */ async handleMemoryWarning(metrics) {
        this.emitAlert('warning', `Memory usage warning: ${Math.round(metrics.heapUsed / 1024 / 1024)}MB heap used`, [
            'Consider closing unnecessary features',
            'Clear caches if possible',
            'Monitor memory usage'
        ]);
        // Enable preventive measures
        if (this.config.preventiveActions.limitConcurrentOperations) {
            this.limitConcurrentOperations();
        }
    }
    /**
     * Handle critical memory state
     */ async handleMemoryCritical(metrics) {
        this.emitAlert('critical', `Critical memory usage: ${Math.round(metrics.heapUsed / 1024 / 1024)}MB heap, ${Math.round(metrics.rss / 1024 / 1024)}MB RSS`, [
            'Enabling degraded mode',
            'Reducing feature set',
            'Forcing memory cleanup'
        ]);
        // Enter degraded mode
        await this.enterDegradedMode();
        // Force cleanup more frequently
        if (this.config.preventiveActions.forceCleanupFrequency > 0) {
            setTimeout(() => this.forceCleanup(), this.config.preventiveActions.forceCleanupFrequency);
        }
    }
    /**
     * Handle emergency memory state
     */ async handleMemoryEmergency(metrics) {
        this.emitAlert('emergency', `MEMORY EMERGENCY: ${Math.round(metrics.heapUsed / 1024 / 1024)}MB heap, ${Math.round(metrics.rss / 1024 / 1024)}MB RSS - System stability at risk`, [
            'Emergency procedures activated',
            'All non-critical operations suspended',
            'Preparing for graceful shutdown if needed'
        ]);
        this.emergencyShutdownTriggered = true;
        // Cancel all low-priority operations
        await this.emergencyOperationCleanup();
        // Force maximum cleanup
        await this.forceCleanup();
        // Consider restart if still critical after cleanup
        setTimeout(async () => {
            const currentUsage = process.memoryUsage().heapUsed;
            if (currentUsage > this.config.alertThresholds.critical) {
                await this.initiateEmergencyRestart();
            }
            else {
                this.emergencyShutdownTriggered = false;
                this.emitAlert('info', 'Memory emergency resolved', ['System stabilized']);
            }
        }, 5000);
    }
    /**
     * Enter degraded mode to preserve memory
     */
    async enterDegradedMode() {
        if (this.degradedMode)
            return;
        this.degradedMode = true;
        console.log('⚠️  Entering degraded mode to preserve memory');
        // Reduce cache sizes
        const caches = ['user-context', 'command-history', 'suggestions'];
        for (const cacheName of caches) {
            const cache = this.memoryManager.getCache(cacheName, 20, 10); // Smaller limits
            cache.clear();
        }
        // Disable non-essential features
        this.emit('degraded-mode-enabled', {
            reducedCaching: true,
            limitedSuggestions: true,
            simplifiedUI: true
        });
    }
    /**
     * Exit degraded mode when memory stabilizes
     */
    async exitDegradedMode() {
        if (!this.degradedMode)
            return;
        this.degradedMode = false;
        console.log('✨ Exiting degraded mode - full features restored');
        this.emit('degraded-mode-disabled');
    }
    /**
     * Limit concurrent operations
     */
    limitConcurrentOperations() {
        const lowPriorityOps = Array.from(this.activeOperations.entries())
            .filter(([_, context]) => context.priority === 'low')
            .slice(2); // Keep only first 2
        for (const [id, _] of lowPriorityOps) {
            this.unregisterOperation(id);
            this.emit('operation-cancelled', id);
        }
    }
    /**
     * Emergency operation cleanup
     */
    async emergencyOperationCleanup() {
        const nonCriticalOps = Array.from(this.activeOperations.entries())
            .filter(([_, context]) => context.priority !== 'critical');
        for (const [id, _] of nonCriticalOps) {
            this.unregisterOperation(id);
        }
        console.log(`🚨 Cancelled ${nonCriticalOps.length} non-critical operations`);
    }
    /**
     * Force comprehensive cleanup
     */
    async forceCleanup() {
        console.log('🧹 Forcing comprehensive memory cleanup...');
        // Clear operation history
        this.activeOperations.clear();
        // Trigger memory manager cleanup
        await this.memoryManager.criticalCleanup();
        // Force garbage collection if available
        if (global.gc) {
            global.gc();
        }
        console.log('✨ Forced cleanup completed');
    }
    /**
     * Initiate emergency restart procedure
     */
    async initiateEmergencyRestart() {
        if (!this.config.recoveryStrategies.emergencyRestart) {
            this.emitAlert('critical', 'Manual restart recommended - memory usage remains critical', ['Please restart the CLI manually']);
            return;
        }
        console.log('🚨 Initiating emergency restart procedure...');
        // Save critical data if enabled
        if (this.config.recoveryStrategies.dataPreservation) {
            await this.preserveCriticalData();
        }
        this.emitAlert('emergency', 'Emergency restart initiated', ['System will restart automatically', 'Unsaved data may be lost']);
        setTimeout(() => {
            process.exit(1); // Let process manager restart
        }, 2000);
    }
    /**
     * Preserve critical data before restart
     */
    async preserveCriticalData() {
        try {
            // This would save essential state to disk
            console.log('💾 Preserving critical data...');
            // Implementation would depend on what data needs to be preserved
        }
        catch (error) {
            console.error('Failed to preserve data:', error);
        }
    }
    /**
     * Assess current memory state
     */ async assessMemoryState() {
        const percentage = this.memoryManager.getMemoryUsagePercentage();
        if (percentage > 85) {
            this.emitAlert('critical', `High memory usage: ${percentage.toFixed(1)}%`, []);
        }
        else if (percentage > 70) {
            this.emitAlert('warning', `Elevated memory usage: ${percentage.toFixed(1)}%`, []);
        }
        else {
            this.emitAlert('info', `Memory usage normal: ${percentage.toFixed(1)}%`, []);
            // Exit degraded mode if memory usage is now safe
            if (this.degradedMode && percentage < 60) {
                await this.exitDegradedMode();
            }
        }
    }
    /**
     * Emit memory alert
     */
    emitAlert(level, message, recommendedActions) {
        const alert = {
            level,
            message,
            metrics: {
                ...process.memoryUsage(),
                timestamp: new Date()
            },
            recommendedActions,
            timestamp: new Date()
        };
        this.alertHistory.push(alert);
        // Keep only last 50 alerts
        if (this.alertHistory.length > 50) {
            this.alertHistory = this.alertHistory.slice(-50);
        }
        this.emit('memory-alert', alert);
        // Console output based on level
        const icons = { info: 'ℹ️', warning: '⚠️', critical: '🔥', emergency: '🚨' };
        console.log(`${icons[level]} ${message}`);
        if (recommendedActions.length > 0) {
            console.log('   Recommended actions:');
            recommendedActions.forEach(action => console.log(`   • ${action}`));
        }
    }
    /**
     * Graceful shutdown
     */
    async gracefulShutdown() {
        if (!this.monitoringActive)
            return;
        console.log('🛡️  Memory Guardian initiating graceful shutdown...');
        this.monitoringActive = false;
        // Cancel all operations
        this.activeOperations.clear();
        // Shutdown memory manager
        await this.memoryManager.shutdown();
        console.log('🙏 Memory Guardian deactivated gracefully');
        this.emit('guardian-shutdown');
    }
    /**
     * Get default configuration
     */
    getDefaultConfig() {
        const totalMem = process.memoryUsage().heapTotal;
        return {
            maxHeapSize: totalMem,
            alertThresholds: {
                info: totalMem * 0.6,
                warning: totalMem * 0.7,
                critical: totalMem * 0.85,
                emergency: totalMem * 0.95
            },
            preventiveActions: {
                enableDegradedMode: true,
                limitConcurrentOperations: true,
                reduceFeatureset: true,
                forceCleanupFrequency: 30000 // 30 seconds
            },
            recoveryStrategies: {
                gracefulDegradation: true,
                emergencyRestart: false, // Disabled by default for safety
                dataPreservation: true
            }
        };
    }
    /**
     * Get current status
     */
    getStatus() {
        const recentAlerts = this.alertHistory.slice(-5);
        const latestAlert = recentAlerts[recentAlerts.length - 1];
        return {
            active: this.monitoringActive,
            degradedMode: this.degradedMode,
            activeOperations: this.activeOperations.size,
            memoryUsage: this.memoryManager.getMemoryUsagePercentage(),
            alertLevel: latestAlert?.level || 'info',
            recentAlerts
        };
    }
    /**
     * Update configuration
     */
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        this.emit('config-updated', this.config);
    }
}
//# sourceMappingURL=MemoryGuardian.js.map