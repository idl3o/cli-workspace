/**
 * ExperienceEvolution: Continuous improvement system for user experience
 *
 * This module implements adaptive learning and experience optimization,
 * allowing the CLI to evolve based on user patterns, preferences, and feedback.
 */
export interface UserExperienceMetrics {
    commandUsageFrequency: Map<string, number>;
    taskCompletionTimes: Map<string, number[]>;
    errorEncounterRate: Map<string, number>;
    frustrationIndicators: string[];
    flowStateIndicators: string[];
    preferredInteractionStyle: 'immediate' | 'guided' | 'contemplative';
    sessionDuration: number[];
    successPatterns: string[];
    improvementAreas: string[];
}
export interface ExperienceInsight {
    category: 'efficiency' | 'usability' | 'flow' | 'learning' | 'satisfaction';
    description: string;
    confidence: number;
    suggestedImprovement: string;
    implementationComplexity: 'low' | 'medium' | 'high';
    impact: 'minor' | 'moderate' | 'significant' | 'transformative';
}
export interface AdaptiveRecommendation {
    type: 'command_suggestion' | 'workflow_optimization' | 'interface_customization' | 'learning_path';
    title: string;
    description: string;
    expectedBenefit: string;
    implementation: () => Promise<void>;
}
/**
 * ExperienceEvolution: The heart of continuous UX improvement
 */
export declare class ExperienceEvolution {
    private zen;
    private metricsPath;
    private metrics;
    private sessionStartTime;
    constructor(workspacePath: string);
    private initializeMetrics;
    /**
     * Initialize experience evolution system
     */
    initialize(): Promise<void>;
    /**
     * Load existing user experience metrics
     */
    private loadExistingMetrics;
    /**
     * Create initial experience profile through conscious questioning
     */
    private createExperienceProfile;
    /**
     * Parse interaction style from user response
     */
    private parseInteractionStyle;
    /**
     * Track command usage and generate insights
     */
    trackCommandUsage(command: string, executionTime: number, success: boolean): Promise<void>;
    /**
     * Analyze user experience and generate insights
     */
    generateExperienceInsights(): Promise<ExperienceInsight[]>;
    /**
     * Analyze command efficiency patterns
     */
    private analyzeCommandEfficiency;
    /**
     * Analyze error patterns for improvement opportunities
     */
    private analyzeErrorPatterns;
    /**
     * Analyze flow state patterns
     */
    private analyzeFlowPatterns;
    /**
     * Analyze interaction preference alignment
     */
    private analyzeInteractionPatterns;
    /**
     * Generate adaptive recommendations based on insights
     */
    generateRecommendations(): Promise<AdaptiveRecommendation[]>;
    /**
     * Interactive experience review session
     */
    conductExperienceReview(): Promise<void>;
    /**
     * Collect direct user feedback on experience
     */
    private collectExperienceFeedback;
    /**
     * Get emoji for insight categories
     */
    private getCategoryEmoji;
    /**
     * Get emoji for recommendation types
     */
    private getRecommendationEmoji;
    /**
     * Save metrics to persistent storage
     */
    private saveMetrics;
    /**
     * Close experience session and record duration
     */
    closeSession(): Promise<void>;
    /**
     * Get experience summary for display
     */
    getExperienceSummary(): Record<string, any>;
}
//# sourceMappingURL=experience.d.ts.map