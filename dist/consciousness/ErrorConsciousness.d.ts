/**
 * ErrorConsciousness: Mindful error handling and learning
 *
 * Transforms traditional error messages into opportunities for growth and understanding.
 * Provides conscious guidance during challenging development moments.
 */
export interface ErrorContext {
    error: Error;
    command?: string | undefined;
    stackTrace?: string | undefined;
    userAction?: string | undefined;
    timestamp: Date;
    severity: 'info' | 'warning' | 'error' | 'critical';
}
export interface ErrorPattern {
    pattern: RegExp;
    category: string;
    guidance: string;
    actionSuggestions: string[];
    learningOpportunity: string;
}
export interface ErrorRecoveryAction {
    type: 'retry' | 'modify' | 'skip' | 'learn' | 'seek_help';
    description: string;
    command?: string;
    explanation: string;
}
/**
 * ErrorConsciousness: Transform errors into wisdom
 */
export declare class ErrorConsciousness {
    private zen;
    private errorPatterns;
    private errorHistory;
    constructor();
    /**
     * Initialize consciousness-aware error patterns
     */
    private initializeErrorPatterns;
    /**
     * Process error with consciousness and wisdom
     */
    handleError(error: Error, context?: Partial<ErrorContext>): Promise<ErrorRecoveryAction | null>;
    /**
     * Handle errors with known patterns
     */
    private handleKnownPattern;
    /**
     * Handle unknown errors with curiosity
     */
    private handleUnknownError;
    /**
     * Explore unknown errors with curiosity
     */
    private exploreUnknownError;
    /**
     * Suggest alternative approaches
     */
    private suggestAlternativeApproaches;
    /**
     * Create recovery action based on user choice
     */
    private createRecoveryAction;
    /**
     * Determine error severity with consciousness
     */
    private determineSeverity;
    /**
     * Find matching error pattern
     */
    private findMatchingPattern;
    /**
     * Extract relevant lines from stack trace
     */
    private extractRelevantStackLines;
    /**
     * Extract keywords from error message
     */
    private extractKeywords;
    /**
     * Generate alternative approaches based on error context
     */
    private generateAlternativeApproaches;
    /**
     * Get error insights and patterns
     */
    getErrorInsights(): Record<string, any>;
    /**
     * Get most common error category
     */
    private getMostCommonCategory;
    /**
     * Show session error summary
     */
    showErrorSummary(): Promise<void>;
    /**
     * Close error consciousness session
     */
    close(): Promise<void>;
}
//# sourceMappingURL=ErrorConsciousness.d.ts.map