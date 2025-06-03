/**
 * MemoryManager: Conscious memory optimization and cleanup system
 *
 * Prevents memory overloading while maintaining the zen experience through
 * intelligent caching, cleanup strategies, and resource monitoring.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface MemoryMetrics {
    heapUsed: number;
    heapTotal: number;
    external: number;
    arrayBuffers: number;
    rss: number;
    timestamp: Date;
}
export interface MemoryThresholds {
    warning: number;
    critical: number;
    emergency: number;
}
export interface CacheItem<T> {
    data: T;
    timestamp: Date;
    accessCount: number;
    lastAccess: Date;
    size: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
}
export interface MemoryCleanupStrategy {
    name: string;
    description: string;
    execute: () => Promise<number>;
    priority: number;
    aggressive: boolean;
}
/**
 * Intelligent Memory Cache with conscious eviction policies
 */
export declare class ConsciousCache<T> {
    private cache;
    private maxSize;
    private maxAge;
    private accessOrder;
    constructor(maxSize?: number, maxAgeMinutes?: number);
    set(key: string, value: T, priority?: 'low' | 'medium' | 'high' | 'critical'): void;
    get(key: string): T | undefined;
    private estimateSize;
    private updateAccessOrder;
    private removeFromAccessOrder;
    private enforceMemoryLimits;
    cleanupExpired(): void;
    private evictLeastValuable;
    private getPriorityScore;
    clear(): void;
    getStats(): {
        size: number;
        totalBytes: number;
        hitRate: number;
    };
}
/**
 * Memory Manager: Conscious memory monitoring and optimization
 */
export declare class MemoryManager extends EventEmitter {
    private static instance;
    private monitoringInterval;
    private metrics;
    private thresholds;
    private cleanupStrategies;
    private caches;
    private isCleaningUp;
    private constructor();
    static getInstance(): MemoryManager;
    /**
     * Start conscious memory monitoring
     */
    startMonitoring(intervalMs?: number): void;
    /**
     * Stop memory monitoring
     */
    stopMonitoring(): void;
    /**
     * Get or create a conscious cache
     */
    getCache<T>(name: string, maxSize?: number, maxAgeMinutes?: number): ConsciousCache<T>;
    /**
     * Check current memory usage and take action if needed
     */
    private checkMemoryUsage;
    /**
     * Initialize cleanup strategies
     */
    private initializeCleanupStrategies;
    /**
     * Gentle cleanup for warning state
     */
    private gentleCleanup;
    /**
     * Critical cleanup for high memory usage
     */
    criticalCleanup(): Promise<void>;
    /**
     * Emergency cleanup for memory crisis
     */
    private emergencyCleanup;
    /**
     * Get memory usage statistics
     */
    getMemoryStats(): {
        current: MemoryMetrics;
        thresholds: MemoryThresholds;
        trend: 'improving' | 'stable' | 'degrading';
        cacheStats: Record<string, any>;
    };
    /**
     * Format bytes for human-readable display
     */
    private formatBytes;
    /**
     * Add custom cleanup strategy
     */
    addCleanupStrategy(strategy: MemoryCleanupStrategy): void;
    /**
     * Get memory usage percentage
     */
    getMemoryUsagePercentage(): number;
    /**
     * Get current memory usage in bytes
     */
    getCurrentUsage(): number;
    /**
     * Get memory usage trend from recent metrics
     */
    getMemoryTrend(): number[];
    /**
     * Get memory limit threshold
     */
    getMemoryLimit(): number;
    /**
     * Graceful shutdown with memory cleanup
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=MemoryManager.d.ts.map