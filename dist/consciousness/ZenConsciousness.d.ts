/**
 * ZenConsciousness: Core consciousness-aware prompting system
 *
 * This module implements the philosophical principles of conscious CLI interaction,
 * transforming traditional command-line interfaces into mindful, intentional experiences.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface UserContext {
    sessionHistory: string[];
    patterns: Map<string, number>;
    preferences: Record<string, any>;
    currentFlow: 'focused' | 'exploring' | 'reflecting' | 'creating';
    lastInteraction: Date;
    growthMetrics: {
        commandsLearned: number;
        patternsEvolved: number;
        flowStatesAccessed: number;
    };
}
export interface ZenPromptConfig {
    question: string;
    suggestions?: string[] | undefined;
    defaultAction?: string | undefined;
    timeoutMs?: number | undefined;
    allowReflection?: boolean | undefined;
    contextAware?: boolean | undefined;
}
export interface PromptResponse {
    value: string;
    reflectionRequested: boolean;
    confidence: 'immediate' | 'considered' | 'contemplative';
    metadata: {
        timeToDecision: number;
        suggestionsUsed: boolean;
        contextMatched: boolean;
    };
}
/**
 * The Sacred Pause: Creates space for intention before action
 */
export declare class ZenPause {
    private static readonly SACRED_DURATIONS;
    static micro(message?: string): Promise<void>;
    static gentle(message?: string): Promise<void>;
    static deep(message?: string): Promise<void>;
}
/**
 * Core ZenConsciousness: The heart of conscious CLI interactions
 */
export declare class ZenConsciousness extends EventEmitter {
    private rl;
    private context;
    private sessionStartTime;
    constructor(context?: Partial<UserContext>);
    private initializeContext;
    /**
     * The Zen Prompt: Consciousness-first questioning
     */
    ask(config: ZenPromptConfig): Promise<PromptResponse>;
    /**
     * Enhanced question creation with consciousness awareness
     */
    private enhanceQuestion;
    /**
     * Process user response with consciousness metrics
     */
    private processResponse;
    /**
     * Consciousness-aware confidence determination
     */
    private determineConfidence;
    /**
     * Update user context based on interaction
     */
    private updateContext;
    /**
     * Flow state awareness
     */
    private getFlowEmoji;
    /**
     * Pattern recognition for consciousness growth
     */
    private findRelatedPattern;
    private matchesUserPattern;
    private shouldPause;
    private createTimeoutResponse;
    /**
     * Graceful consciousness closure
     */
    closeGracefully(): Promise<void>;
    /**
     * Session insights for growth
     */
    getSessionInsights(): Record<string, any>;
}
/**
 * Convenience factory for creating consciousness-aware prompts
 */
export declare class ZenPromptFactory {
    static intention(question: string, suggestions?: string[] | undefined): ZenPromptConfig;
    static action(question: string, defaultAction?: string | undefined): ZenPromptConfig;
    static contemplation(question: string): ZenPromptConfig;
    static flow(question: string, suggestions?: string[] | undefined): ZenPromptConfig;
}
//# sourceMappingURL=ZenConsciousness.d.ts.map