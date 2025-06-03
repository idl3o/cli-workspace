/**
 * Guided Prompting Command Structure
 *
 * This module implements a comprehensive command system that guides users through
 * conscious interactions, adaptive learning, and experience optimization.
 */
import { Command } from 'commander';
export interface GuidedSession {
    type: 'onboarding' | 'configuration' | 'troubleshooting' | 'optimization' | 'reflection';
    currentStep: number;
    totalSteps: number;
    context: Record<string, any>;
    userPreferences: Record<string, any>;
}
export interface PromptingRoute {
    name: string;
    description: string;
    icon: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
    prerequisites?: string[];
    benefits: string[];
}
/**
 * GuidedPromptingSystem: The main orchestrator for user guidance
 */
export declare class GuidedPromptingSystem {
    private zen;
    private config;
    private experience;
    private currentSession;
    constructor(workspacePath: string);
    /**
     * Initialize the guided prompting system
     */
    initialize(): Promise<void>;
    /**
     * Main menu for guided experiences
     */
    showGuidedMenu(): Promise<void>;
    /**
     * Handle main menu choice
     */
    private handleMenuChoice;
    /**
     * Get available guidance routes based on user level
     */
    private getAvailableRoutes;
    /**
     * Start a guided session based on selected route
     */
    private startGuidedSession;
    /**
     * Show detailed information about a route
     */
    private showRouteDetails;
    /**
     * Execute the main guided session logic
     */
    private executeGuidedSession;
    /**
     * First Steps guided session
     */
    private runFirstStepsSession;
    /**
     * Configuration Journey guided session
     */
    private runConfigurationSession;
    /**
     * Problem Solving guided session
     */
    private runProblemSolvingSession;
    /**
     * Flow Optimization guided session
     */
    private runFlowOptimizationSession;
    /**
     * Mastery Path guided session
     */
    private runMasterySession;
    /**
     * Reflection & Growth guided session
     */
    private runReflectionSession;
    /**
     * Show progress indicator for current step
     */
    private showStep;
    /**
     * Complete the guided session
     */
    private completeSession;
    /**
     * Show user progress and achievements
     */
    showUserProgress(): Promise<void>;
    /**
     * Open settings menu
     */
    private openSettings;
    /**
     * Graceful exit with wisdom
     */
    private gracefulExit;
    private mapRouteToSessionType;
    private getSessionSteps;
}
/**
 * Create guided prompting commands for the CLI
 */
export declare function createGuidedCommands(program: Command, workspacePath: string): void;
//# sourceMappingURL=guided.d.ts.map