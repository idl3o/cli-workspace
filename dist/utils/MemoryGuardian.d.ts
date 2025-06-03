/**
 * MemoryGuardian: Advanced memory overload prevention system
 *
 * This guardian works alongside MemoryManager to provide comprehensive
 * memory protection with consciousness-aware interventions and graceful degradation.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import type { MemoryMetrics } from './MemoryManager.js';
export interface MemoryAlert {
    level: 'info' | 'warning' | 'critical' | 'emergency';
    message: string;
    metrics: MemoryMetrics;
    recommendedActions: string[];
    timestamp: Date;
}
export interface GuardianConfig {
    maxHeapSize: number;
    alertThresholds: {
        info: number;
        warning: number;
        critical: number;
        emergency: number;
    };
    preventiveActions: {
        enableDegradedMode: boolean;
        limitConcurrentOperations: boolean;
        reduceFeatureset: boolean;
        forceCleanupFrequency: number;
    };
    recoveryStrategies: {
        gracefulDegradation: boolean;
        emergencyRestart: boolean;
        dataPreservation: boolean;
    };
}
export interface OperationContext {
    id: string;
    type: 'command' | 'cache' | 'computation' | 'io';
    priority: 'low' | 'medium' | 'high' | 'critical';
    estimatedMemoryImpact: number;
    timeout: number;
}
/**
 * Memory Guardian: Proactive memory protection system
 */
export declare class MemoryGuardian extends EventEmitter {
    private static instance;
    private memoryManager;
    private config;
    private activeOperations;
    private degradedMode;
    private alertHistory;
    private monitoringActive;
    private emergencyShutdownTriggered;
    private constructor();
    static getInstance(): MemoryGuardian;
    /**
     * Initialize the guardian system
     */
    initialize(): Promise<void>;
    /**
     * Register an operation for memory tracking
     */
    registerOperation(context: OperationContext): Promise<boolean>;
    /**
     * Unregister a completed operation
     */
    unregisterOperation(operationId: string): void;
    /**
     * Pre-operation memory safety check
     */
    private preOperationCheck;
    /**
     * Setup memory event listeners
     */
    private setupMemoryListeners;
    /**
     * Setup process event listeners
     */
    private setupProcessListeners;
    /**
     * Handle memory warning state
     */ private handleMemoryWarning;
    /**
     * Handle critical memory state
     */ private handleMemoryCritical;
    /**
     * Handle emergency memory state
     */ private handleMemoryEmergency;
    /**
     * Enter degraded mode to preserve memory
     */
    enterDegradedMode(): Promise<void>;
    /**
     * Exit degraded mode when memory stabilizes
     */
    private exitDegradedMode;
    /**
     * Limit concurrent operations
     */
    private limitConcurrentOperations;
    /**
     * Emergency operation cleanup
     */
    private emergencyOperationCleanup;
    /**
     * Force comprehensive cleanup
     */
    private forceCleanup;
    /**
     * Initiate emergency restart procedure
     */
    private initiateEmergencyRestart;
    /**
     * Preserve critical data before restart
     */
    private preserveCriticalData;
    /**
     * Assess current memory state
     */ private assessMemoryState;
    /**
     * Emit memory alert
     */
    private emitAlert;
    /**
     * Graceful shutdown
     */
    private gracefulShutdown;
    /**
     * Get default configuration
     */
    private getDefaultConfig;
    /**
     * Get current status
     */
    getStatus(): {
        active: boolean;
        degradedMode: boolean;
        activeOperations: number;
        memoryUsage: number;
        alertLevel: MemoryAlert['level'];
        recentAlerts: MemoryAlert[];
    };
    /**
     * Update configuration
     */
    updateConfig(updates: Partial<GuardianConfig>): void;
}
//# sourceMappingURL=MemoryGuardian.d.ts.map