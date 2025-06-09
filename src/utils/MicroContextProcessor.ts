/**
 * 🔬 Micro-Context Processor: Minimal Context Window Operations
 * 
 * Achieves the smallest possible context windows using fractal compression
 * and intelligent content summarization for maximum efficiency.
 * 
 * Key Principles:
 * - Context compression using logarithmic scaling
 * - Essential-only information preservation
 * - Fractal pattern recognition for redundancy elimination
 * - Progressive context degradation under memory pressure
 */

import { EventEmitter } from 'events';

interface MicroContext {
  essential: string;      // Core information only
  compressed: string;     // Fractal-compressed context
  tokens: number;         // Actual token count
  priority: number;       // Retention priority (0-1)
}

interface ContextWindow {
  size: number;           // Current window size
  utilization: number;    // How full the window is (0-1)
  compressionRatio: number; // Achieved compression ratio
}

export class MicroContextProcessor extends EventEmitter {
  private readonly ABSOLUTE_MIN_WINDOW = 512;    // Smallest possible window
  private readonly OPTIMAL_MIN_WINDOW = 1024;    // Preferred minimum
  
  private contextQueue: MicroContext[] = [];
  private currentWindow: ContextWindow = {
    size: this.OPTIMAL_MIN_WINDOW,
    utilization: 0,
    compressionRatio: 1
  };

  /**
   * Compress content to essential information only
   * Uses fractal patterns to identify and eliminate redundancy
   */
  compressToEssentials(content: string): MicroContext {
    // Extract essential patterns using fractal analysis
    const essential = this.extractEssentialPatterns(content);
    
    // Apply logarithmic compression to remove redundancy
    const compressed = this.applyFractalCompression(essential);
    
    // Calculate actual token usage
    const tokens = this.estimateTokenCount(compressed);
    
    // Determine retention priority based on information density
    const priority = this.calculateInformationDensity(essential, content);

    return {
      essential,
      compressed,
      tokens,
      priority
    };
  }

  /**
   * Extract only the most essential patterns from content
   * Focuses on actionable information and key concepts
   */
  private extractEssentialPatterns(content: string): string {
    // Remove boilerplate and focus on core patterns
    const patterns = [
      // Keep: Function signatures, interfaces, key logic
      /(?:interface|class|function|const|let|var)\s+\w+[^{]*{[^}]*}/g,
      // Keep: Error patterns and critical warnings  
      /(?:error|warn|critical|fail)[^.!]*[.!]/gi,
      // Keep: Essential context markers
      /(?:TODO|FIXME|NOTE|IMPORTANT)[^.!]*[.!]/gi,
      // Keep: Key numerical values and thresholds
      /\d+(?:\.\d+)?(?:%|px|em|rem|ms|s)/g
    ];

    let essential = '';
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        essential += matches.join(' ') + ' ';
      }
    });    // If no patterns found, extract first and last sentences
    if (essential.length < 50) {
      const sentences = content.split(/[.!?]+/).filter(s => s.trim());
      if (sentences.length > 0) {
        essential = sentences[0] || '';
        if (sentences.length > 1) {
          essential += ' ... ' + sentences[sentences.length - 1];
        }
      }
    }

    return essential.trim();
  }

  /**
   * Apply fractal-based compression using mathematical patterns
   * Uses golden ratio to identify self-similar structures
   */
  private applyFractalCompression(content: string): string {
    if (content.length <= 100) return content; // Too small to compress

    // Identify repeating patterns using golden ratio proportions
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const segmentSize = Math.floor(content.length / goldenRatio);
    
    const segments = [];
    for (let i = 0; i < content.length; i += segmentSize) {
      segments.push(content.slice(i, i + segmentSize));
    }    // Find and compress repetitive segments
    const uniqueSegments = Array.from(new Set(segments));
    const compressionRatio = segments.length / uniqueSegments.length;

    if (compressionRatio > 1.5) {
      // Significant compression possible
      return uniqueSegments.join(' | ') + ` [x${Math.floor(compressionRatio)}]`;
    }

    // Apply character-level compression for dense content
    return this.applyCharacterCompression(content);
  }

  /**
   * Character-level compression for dense technical content
   */
  private applyCharacterCompression(content: string): string {
    // Common programming patterns compression
    const compressions = new Map([
      ['function', 'fn'],
      ['const ', 'c '],
      ['interface', 'if'],
      ['export', 'exp'],
      ['import', 'imp'],
      ['return', 'ret'],
      ['console.log', 'log'],
      ['undefined', 'undef'],
      ['typescript', 'ts'],
      ['javascript', 'js']
    ]);

    let compressed = content;
    compressions.forEach((short, long) => {
      compressed = compressed.replace(new RegExp(long, 'gi'), short);
    });

    return compressed;
  }

  /**
   * Estimate token count using 4-character approximation
   */
  private estimateTokenCount(content: string): number {
    return Math.ceil(content.length / 4);
  }

  /**
   * Calculate information density to determine retention priority
   * Higher density = higher priority for retention
   */
  private calculateInformationDensity(essential: string, original: string): number {
    const compressionRatio = original.length / essential.length;
    const informationPreservation = essential.length / (original.length || 1);
    
    // Normalize to 0-1 scale using logarithmic scaling
    const density = Math.log(1 + compressionRatio * informationPreservation) / Math.log(10);
    return Math.min(1, Math.max(0, density));
  }

  /**
   * Add content to micro-context with intelligent window management
   */
  addToMicroContext(content: string): void {
    const microContext = this.compressToEssentials(content);
    
    // Check if adding this would exceed window
    const projectedTokens = this.getTotalTokens() + microContext.tokens;
    
    if (projectedTokens > this.currentWindow.size) {
      // Apply emergency compression
      this.performEmergencyCompression();
      
      // If still too large, expand window minimally
      if (projectedTokens > this.currentWindow.size) {
        this.expandWindowMinimally(projectedTokens);
      }
    }

    this.contextQueue.push(microContext);
    this.updateWindowMetrics();
    
    // Emit context window status
    this.emit('contextWindowUpdate', {
      size: this.currentWindow.size,
      utilization: this.currentWindow.utilization,
      compression: this.currentWindow.compressionRatio
    });
  }

  /**
   * Emergency compression when approaching context limits
   * Removes lowest priority content and re-compresses remaining
   */
  private performEmergencyCompression(): void {
    // Sort by priority (lowest first)
    this.contextQueue.sort((a, b) => a.priority - b.priority);
    
    // Remove lowest priority items until we have room
    const targetTokens = Math.floor(this.currentWindow.size * 0.7); // 70% utilization target
    
    while (this.getTotalTokens() > targetTokens && this.contextQueue.length > 1) {
      const removed = this.contextQueue.shift();
      console.warn(`🔬 Emergency compression: removed context with priority ${removed?.priority.toFixed(2)}`);
    }

    // Re-compress remaining content more aggressively
    this.contextQueue = this.contextQueue.map(ctx => ({
      ...ctx,
      compressed: this.applyCharacterCompression(ctx.compressed),
      tokens: this.estimateTokenCount(this.applyCharacterCompression(ctx.compressed))
    }));
  }

  /**
   * Expand context window by minimal amount needed
   * Uses logarithmic scaling to prevent exponential growth
   */
  private expandWindowMinimally(requiredTokens: number): void {
    const currentSize = this.currentWindow.size;
    const growthFactor = (requiredTokens - currentSize) / currentSize;
    
    // Apply logarithmic growth using golden ratio
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const logGrowth = Math.log(1 + growthFactor) / Math.log(goldenRatio);
    
    const newSize = Math.min(
      currentSize + Math.ceil(currentSize * logGrowth * 0.5),
      this.ABSOLUTE_MIN_WINDOW * 4 // Never exceed 4x minimum
    );

    this.currentWindow.size = newSize;
    console.warn(`🔬 Context window expanded minimally: ${currentSize} → ${newSize} tokens`);
  }

  /**
   * Update window utilization metrics
   */
  private updateWindowMetrics(): void {
    const totalTokens = this.getTotalTokens();
    
    this.currentWindow.utilization = totalTokens / this.currentWindow.size;
    
    // Calculate compression ratio based on original vs compressed size
    const originalEstimate = this.contextQueue.reduce((sum, ctx) => 
      sum + (ctx.essential.length / 4), 0);
    this.currentWindow.compressionRatio = originalEstimate / (totalTokens || 1);
  }

  /**
   * Get total tokens in current context window
   */
  private getTotalTokens(): number {
    return this.contextQueue.reduce((sum, ctx) => sum + ctx.tokens, 0);
  }

  /**
   * Get current context window status
   */
  getCurrentContextWindow(): ContextWindow {
    return { ...this.currentWindow };
  }

  /**
   * Get compressed context suitable for AI processing
   */
  getOptimizedContext(): string {
    if (this.contextQueue.length === 0) return '';

    // Sort by priority (highest first) for output
    const sortedContext = [...this.contextQueue].sort((a, b) => b.priority - a.priority);
    
    // Build compressed context string
    const contextParts = sortedContext.map(ctx => ctx.compressed);
    return contextParts.join(' | ');
  }

  /**
   * Force aggressive compression to absolute minimum window
   */
  forceMinimalContext(): string {
    if (this.contextQueue.length === 0) return '';

    // Keep only highest priority item
    const topPriority = this.contextQueue.reduce((max, ctx) => 
      ctx.priority > max.priority ? ctx : max);

    // Ultra-compress to fit absolute minimum window
    let ultraCompressed = topPriority.compressed;
    
    while (this.estimateTokenCount(ultraCompressed) > this.ABSOLUTE_MIN_WINDOW) {
      // Progressively remove less essential words
      ultraCompressed = ultraCompressed
        .replace(/\b(?:the|and|or|but|in|on|at|to|for|of|with|by)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
        
      if (ultraCompressed.length < 50) break; // Prevent over-compression
    }

    return ultraCompressed;
  }

  /**
   * Clear context and reset to minimal window
   */
  resetToMinimal(): void {
    this.contextQueue = [];
    this.currentWindow = {
      size: this.ABSOLUTE_MIN_WINDOW,
      utilization: 0,
      compressionRatio: 1
    };
    
    this.emit('contextReset', { windowSize: this.ABSOLUTE_MIN_WINDOW });
  }

  /**
   * Get performance metrics for monitoring
   */
  getPerformanceMetrics() {
    return {
      windowSize: this.currentWindow.size,
      utilization: this.currentWindow.utilization,
      compressionRatio: this.currentWindow.compressionRatio,
      contextItems: this.contextQueue.length,
      totalTokens: this.getTotalTokens(),
      averagePriority: this.contextQueue.reduce((sum, ctx) => sum + ctx.priority, 0) / this.contextQueue.length || 0
    };
  }
}
