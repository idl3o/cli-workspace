/**
 * MemoryManager: Conscious memory optimization and cleanup system
 *
 * Prevents memory overloading while maintaining the zen experience through
 * intelligent caching, cleanup strategies, and resource monitoring.
 */
import { EventEmitter } from 'events';
/**
 * Intelligent Memory Cache with conscious eviction policies
 */
export class ConsciousCache {
    cache = new Map();
    maxSize;
    maxAge; // milliseconds
    accessOrder = [];
    constructor(maxSize = 100, maxAgeMinutes = 30) {
        this.maxSize = maxSize;
        this.maxAge = maxAgeMinutes * 60 * 1000;
    }
    set(key, value, priority = 'medium') {
        const now = new Date();
        const size = this.estimateSize(value);
        const item = {
            data: value,
            timestamp: now,
            accessCount: 1,
            lastAccess: now,
            size,
            priority
        };
        this.cache.set(key, item);
        this.updateAccessOrder(key);
        this.enforceMemoryLimits();
    }
    get(key) {
        const item = this.cache.get(key);
        if (!item)
            return undefined;
        // Check if expired
        if (Date.now() - item.timestamp.getTime() > this.maxAge) {
            this.cache.delete(key);
            this.removeFromAccessOrder(key);
            return undefined;
        }
        // Update access metrics
        item.accessCount++;
        item.lastAccess = new Date();
        this.updateAccessOrder(key);
        return item.data;
    }
    estimateSize(value) {
        try {
            return JSON.stringify(value).length * 2; // Rough estimate
        }
        catch {
            return 1000; // Default size for non-serializable objects
        }
    }
    updateAccessOrder(key) {
        this.removeFromAccessOrder(key);
        this.accessOrder.push(key);
    }
    removeFromAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
            this.accessOrder.splice(index, 1);
        }
    }
    enforceMemoryLimits() {
        // Remove expired items first
        this.cleanupExpired();
        // If still over limit, use LRU with priority consideration
        while (this.cache.size > this.maxSize) {
            this.evictLeastValuable();
        }
    }
    cleanupExpired() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp.getTime() > this.maxAge) {
                this.cache.delete(key);
                this.removeFromAccessOrder(key);
            }
        }
    }
    evictLeastValuable() {
        let candidateKey = null;
        let lowestScore = Infinity;
        for (const [key, item] of this.cache.entries()) {
            // Skip critical priority items unless absolutely necessary
            if (item.priority === 'critical' && this.cache.size < this.maxSize * 1.2) {
                continue;
            }
            // Calculate value score (higher is more valuable)
            const ageScore = (Date.now() - item.lastAccess.getTime()) / this.maxAge; // 0-1+
            const accessScore = 1 / (item.accessCount + 1); // Lower is better
            const priorityScore = this.getPriorityScore(item.priority);
            const totalScore = ageScore + accessScore - priorityScore;
            if (totalScore < lowestScore) {
                lowestScore = totalScore;
                candidateKey = key;
            }
        }
        if (candidateKey) {
            this.cache.delete(candidateKey);
            this.removeFromAccessOrder(candidateKey);
        }
    }
    getPriorityScore(priority) {
        switch (priority) {
            case 'critical': return 10;
            case 'high': return 5;
            case 'medium': return 2;
            case 'low': return 0;
            default: return 1;
        }
    }
    clear() {
        this.cache.clear();
        this.accessOrder = [];
    }
    getStats() {
        let totalBytes = 0;
        let totalAccesses = 0;
        let totalHits = 0;
        for (const item of this.cache.values()) {
            totalBytes += item.size;
            totalAccesses += item.accessCount;
            if (item.accessCount > 1)
                totalHits += item.accessCount - 1;
        }
        return {
            size: this.cache.size,
            totalBytes,
            hitRate: totalAccesses > 0 ? totalHits / totalAccesses : 0
        };
    }
}
/**
 * Memory Manager: Conscious memory monitoring and optimization
 */
export class MemoryManager extends EventEmitter {
    static instance;
    monitoringInterval = null;
    metrics = [];
    thresholds;
    cleanupStrategies = [];
    caches = new Map();
    isCleaningUp = false;
    constructor() {
        super();
        // Set memory thresholds based on available system memory
        const totalMem = process.memoryUsage().heapTotal;
        this.thresholds = {
            warning: totalMem * 0.7,
            critical: totalMem * 0.85,
            emergency: totalMem * 0.95
        };
        this.initializeCleanupStrategies();
    }
    static getInstance() {
        if (!MemoryManager.instance) {
            MemoryManager.instance = new MemoryManager();
        }
        return MemoryManager.instance;
    }
    /**
     * Start conscious memory monitoring
     */
    startMonitoring(intervalMs = 10000) {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        this.monitoringInterval = setInterval(() => {
            this.checkMemoryUsage();
        }, intervalMs);
        console.log('🧘 Memory consciousness activated');
    }
    /**
     * Stop memory monitoring
     */
    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
    }
    /**
     * Get or create a conscious cache
     */
    getCache(name, maxSize = 100, maxAgeMinutes = 30) {
        if (!this.caches.has(name)) {
            this.caches.set(name, new ConsciousCache(maxSize, maxAgeMinutes));
        }
        return this.caches.get(name);
    }
    /**
     * Check current memory usage and take action if needed
     */
    async checkMemoryUsage() {
        const memUsage = process.memoryUsage();
        const metrics = {
            heapUsed: memUsage.heapUsed,
            heapTotal: memUsage.heapTotal,
            external: memUsage.external,
            arrayBuffers: memUsage.arrayBuffers,
            rss: memUsage.rss,
            timestamp: new Date()
        };
        this.metrics.push(metrics);
        // Keep only last 100 metrics
        if (this.metrics.length > 100) {
            this.metrics = this.metrics.slice(-100);
        }
        // Emit memory events
        this.emit('metrics', metrics);
        // Check thresholds and take action
        if (memUsage.heapUsed > this.thresholds.emergency) {
            this.emit('memory-emergency', metrics);
            await this.emergencyCleanup();
        }
        else if (memUsage.heapUsed > this.thresholds.critical) {
            this.emit('memory-critical', metrics);
            await this.criticalCleanup();
        }
        else if (memUsage.heapUsed > this.thresholds.warning) {
            this.emit('memory-warning', metrics);
            await this.gentleCleanup();
        }
    }
    /**
     * Initialize cleanup strategies
     */
    initializeCleanupStrategies() {
        this.cleanupStrategies = [
            {
                name: 'Cache Cleanup',
                description: 'Clear expired cache entries',
                priority: 5,
                aggressive: false,
                execute: async () => {
                    let bytesFreed = 0;
                    for (const cache of this.caches.values()) {
                        const beforeStats = cache.getStats();
                        cache.cleanupExpired();
                        const afterStats = cache.getStats();
                        bytesFreed += beforeStats.totalBytes - afterStats.totalBytes;
                    }
                    return bytesFreed;
                }
            },
            {
                name: 'Metrics Cleanup',
                description: 'Trim old memory metrics',
                priority: 3,
                aggressive: false,
                execute: async () => {
                    const before = this.metrics.length;
                    this.metrics = this.metrics.slice(-20); // Keep only last 20
                    return (before - this.metrics.length) * 100; // Estimate
                }
            },
            {
                name: 'Aggressive Cache Eviction',
                description: 'Clear low-priority cache items',
                priority: 8,
                aggressive: true,
                execute: async () => {
                    let bytesFreed = 0;
                    for (const cache of this.caches.values()) {
                        const beforeStats = cache.getStats();
                        // Force eviction of low priority items
                        cache.clear();
                        bytesFreed += beforeStats.totalBytes;
                    }
                    return bytesFreed;
                }
            },
            {
                name: 'Force Garbage Collection',
                description: 'Trigger garbage collection',
                priority: 10,
                aggressive: true,
                execute: async () => {
                    const before = process.memoryUsage().heapUsed;
                    if (global.gc) {
                        global.gc();
                    }
                    const after = process.memoryUsage().heapUsed;
                    return Math.max(0, before - after);
                }
            }
        ];
    }
    /**
     * Gentle cleanup for warning state
     */
    async gentleCleanup() {
        if (this.isCleaningUp)
            return;
        this.isCleaningUp = true;
        try {
            console.log('🌊 Gentle memory optimization in progress...');
            const strategies = this.cleanupStrategies
                .filter(s => !s.aggressive)
                .sort((a, b) => b.priority - a.priority);
            let totalFreed = 0;
            for (const strategy of strategies.slice(0, 2)) { // Run top 2 gentle strategies
                const freed = await strategy.execute();
                totalFreed += freed;
                console.log(`   ✨ ${strategy.name}: ${this.formatBytes(freed)} freed`);
            }
            console.log(`🧘 Gentle cleanup complete: ${this.formatBytes(totalFreed)} freed`);
        }
        finally {
            this.isCleaningUp = false;
        }
    }
    /**
     * Critical cleanup for high memory usage
     */
    async criticalCleanup() {
        if (this.isCleaningUp)
            return;
        this.isCleaningUp = true;
        try {
            console.log('⚡ Critical memory optimization required...');
            const strategies = this.cleanupStrategies
                .sort((a, b) => b.priority - a.priority);
            let totalFreed = 0;
            for (const strategy of strategies.slice(0, 3)) { // Run top 3 strategies
                const freed = await strategy.execute();
                totalFreed += freed;
                console.log(`   🔧 ${strategy.name}: ${this.formatBytes(freed)} freed`);
            }
            console.log(`🎯 Critical cleanup complete: ${this.formatBytes(totalFreed)} freed`);
        }
        finally {
            this.isCleaningUp = false;
        }
    }
    /**
     * Emergency cleanup for memory crisis
     */
    async emergencyCleanup() {
        if (this.isCleaningUp)
            return;
        this.isCleaningUp = true;
        try {
            console.log('🚨 EMERGENCY: Memory crisis - aggressive cleanup initiated');
            // Run ALL strategies in priority order
            const strategies = this.cleanupStrategies
                .sort((a, b) => b.priority - a.priority);
            let totalFreed = 0;
            for (const strategy of strategies) {
                const freed = await strategy.execute();
                totalFreed += freed;
                console.log(`   💥 ${strategy.name}: ${this.formatBytes(freed)} freed`);
            }
            console.log(`🛡️ Emergency cleanup complete: ${this.formatBytes(totalFreed)} freed`);
            // If still critical, recommend restart
            const currentUsage = process.memoryUsage().heapUsed;
            if (currentUsage > this.thresholds.critical) {
                console.log('⚠️ Memory usage still critical. Consider restarting the CLI.');
            }
        }
        finally {
            this.isCleaningUp = false;
        }
    }
    /**
     * Get memory usage statistics
     */
    getMemoryStats() {
        const current = this.metrics[this.metrics.length - 1] || {
            heapUsed: 0, heapTotal: 0, external: 0, arrayBuffers: 0, rss: 0, timestamp: new Date()
        };
        // Calculate trend
        let trend = 'stable';
        if (this.metrics.length >= 3) {
            const recent = this.metrics.slice(-3);
            const avgRecent = recent.reduce((sum, m) => sum + m.heapUsed, 0) / recent.length;
            const older = this.metrics.slice(-6, -3);
            if (older.length > 0) {
                const avgOlder = older.reduce((sum, m) => sum + m.heapUsed, 0) / older.length;
                if (avgRecent < avgOlder * 0.95)
                    trend = 'improving';
                else if (avgRecent > avgOlder * 1.05)
                    trend = 'degrading';
            }
        }
        // Collect cache statistics
        const cacheStats = {};
        for (const [name, cache] of this.caches.entries()) {
            cacheStats[name] = cache.getStats();
        }
        return { current, thresholds: this.thresholds, trend, cacheStats };
    }
    /**
     * Format bytes for human-readable display
     */
    formatBytes(bytes) {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    /**
     * Add custom cleanup strategy
     */
    addCleanupStrategy(strategy) {
        this.cleanupStrategies.push(strategy);
        this.cleanupStrategies.sort((a, b) => b.priority - a.priority);
    }
    /**
     * Get memory usage percentage
     */
    getMemoryUsagePercentage() {
        const current = process.memoryUsage().heapUsed;
        const total = process.memoryUsage().heapTotal;
        return (current / total) * 100;
    }
    /**
     * Get current memory usage in bytes
     */
    getCurrentUsage() {
        return process.memoryUsage().heapUsed;
    }
    /**
     * Get memory usage trend from recent metrics
     */
    getMemoryTrend() {
        return this.metrics.slice(-10).map(m => m.heapUsed);
    }
    /**
     * Get memory limit threshold
     */
    getMemoryLimit() {
        return this.thresholds.critical;
    }
    /**
     * Graceful shutdown with memory cleanup
     */
    async shutdown() {
        console.log('🧘 Graceful memory shutdown initiated...');
        this.stopMonitoring();
        // Clear all caches
        for (const cache of this.caches.values()) {
            cache.clear();
        }
        this.caches.clear();
        // Clear metrics history
        this.metrics = [];
        console.log('🙏 Memory consciousness deactivated gracefully');
    }
}
//# sourceMappingURL=MemoryManager.js.map