/**
 * ConfigConsciousness: Mindful configuration management
 *
 * Transforms traditional config file handling into conscious, intention-driven experiences.
 * Guides users through thoughtful configuration choices with awareness and wisdom.
 */
export interface ConfigMetadata {
    lastModified: Date;
    modificationCount: number;
    userPreferences: Record<string, any>;
    frequentlyChanged: Set<string>;
}
export interface ConfigChangeRequest {
    key: string;
    value: any;
    intention: string;
    confidence: 'suggested' | 'certain' | 'experimental';
}
/**
 * ConfigConsciousness: Mindful configuration with intention awareness
 */
export declare class ConfigConsciousness {
    private zen;
    private configPath;
    private metadata;
    private currentConfig;
    constructor(configPath: string);
    /**
     * Conscious configuration initialization
     */
    initialize(): Promise<void>;
    /**
     * Load existing configuration with consciousness
     */
    private loadExistingConfig;
    /**
     * Create new configuration with intention
     */
    private createNewConfig;
    /**
     * Generate thoughtful default configurations
     */
    private generateMindfulDefaults;
    /**
     * Conscious configuration modification
     */
    modifyConfig(request: ConfigChangeRequest): Promise<boolean>;
    /**
     * Apply configuration change with awareness
     */
    private applyConfigChange;
    /**
     * Explain the impact of configuration changes
     */
    private explainChangeImpact;
    /**
     * Show configuration insights and patterns
     */
    private showConfigInsights;
    /**
     * Interactive configuration session
     */
    interactiveConfiguration(): Promise<void>;
    /**
     * Configure project-level settings
     */
    private configureProjectSettings;
    /**
     * Configure development environment settings
     */
    private configureDevelopmentSettings;
    /**
     * Configure consciousness-aware settings
     */
    private configureConsciousnessSettings;
    /**
     * Display current configuration beautifully
     */
    private displayCurrentConfig;
    /**
     * Format configuration for beautiful display
     */
    private formatConfigForDisplay;
    /**
     * Get appropriate emoji for configuration values
     */
    private getValueEmoji;
    /**
     * Determine if a change is significant
     */
    private isSignificantChange;
    /**
     * Set nested configuration value
     */
    private setNestedValue;
    /**
     * Save configuration with consciousness
     */
    private saveConfig;
    /**
     * Get current configuration
     */
    getCurrentConfig(): Record<string, any>;
    /**
     * Close consciousness session gracefully
     */
    close(): Promise<void>;
}
//# sourceMappingURL=ConfigConsciousness.d.ts.map