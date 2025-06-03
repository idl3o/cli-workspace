/**
 * ConfigConsciousness: Mindful configuration management
 *
 * Transforms traditional config file handling into conscious, intention-driven experiences.
 * Guides users through thoughtful configuration choices with awareness and wisdom.
 */
import { ZenConsciousness, ZenPromptFactory } from './ZenConsciousness.js';
import { readFile, writeFile, access } from 'fs/promises';
import * as yaml from 'yaml';
/**
 * ConfigConsciousness: Mindful configuration with intention awareness
 */
export class ConfigConsciousness {
    zen;
    configPath;
    metadata;
    currentConfig = {};
    constructor(configPath) {
        this.zen = new ZenConsciousness();
        this.configPath = configPath;
        this.metadata = {
            lastModified: new Date(),
            modificationCount: 0,
            userPreferences: {},
            frequentlyChanged: new Set()
        };
    }
    /**
     * Conscious configuration initialization
     */
    async initialize() {
        console.log('🧘 Initializing mindful configuration...');
        try {
            await access(this.configPath);
            await this.loadExistingConfig();
        }
        catch {
            await this.createNewConfig();
        }
    }
    /**
     * Load existing configuration with consciousness
     */
    async loadExistingConfig() {
        try {
            const content = await readFile(this.configPath, 'utf-8');
            this.currentConfig = yaml.parse(content) || {};
            console.log(`✨ Configuration loaded with ${Object.keys(this.currentConfig).length} settings`);
            // Offer insight into current config
            const response = await this.zen.ask(ZenPromptFactory.contemplation('Would you like insight into your current configuration patterns?'));
            if (response.value.toLowerCase().includes('yes') || response.value.toLowerCase().includes('y')) {
                this.showConfigInsights();
            }
        }
        catch (error) {
            console.warn('⚠️ Configuration file exists but cannot be parsed. Creating conscious backup...');
            await this.createNewConfig();
        }
    }
    /**
     * Create new configuration with intention
     */
    async createNewConfig() {
        const response = await this.zen.ask(ZenPromptFactory.intention('This appears to be a new configuration. What is your primary intention for this project?', ['Development', 'Production', 'Learning', 'Experimentation']));
        const intention = response.value || 'Development';
        this.currentConfig = this.generateMindfulDefaults(intention);
        await this.saveConfig(`Initial configuration created with intention: ${intention}`);
        console.log(`🌱 Mindful configuration created with ${intention.toLowerCase()} focus`);
    }
    /**
     * Generate thoughtful default configurations
     */
    generateMindfulDefaults(intention) {
        const baseConfig = {
            project: {
                name: 'zen-workspace',
                intention: intention.toLowerCase(),
                createdAt: new Date().toISOString()
            },
            development: {
                watchMode: true,
                hotReload: true,
                sourceMaps: true
            },
            consciousness: {
                enableDeepThinking: true,
                pauseOnSignificantChanges: true,
                patternRecognition: true
            }
        };
        // Intention-based customization
        switch (intention.toLowerCase()) {
            case 'production':
                baseConfig.development = {
                    watchMode: false,
                    hotReload: false,
                    sourceMaps: false
                };
                break;
            case 'learning':
                baseConfig.consciousness.enableDeepThinking = true;
                baseConfig.consciousness.pauseOnSignificantChanges = true;
                break;
            case 'experimentation':
                baseConfig.development.watchMode = true;
                baseConfig.consciousness.patternRecognition = false;
                break;
        }
        return baseConfig;
    }
    /**
     * Conscious configuration modification
     */
    async modifyConfig(request) {
        console.log(`\n🎯 Configuration change requested for: ${request.key}`);
        console.log(`💭 Intention: ${request.intention}`);
        // Deep thinking pause for significant changes
        if (this.isSignificantChange(request.key)) {
            console.log('🔮 This seems like a significant change...');
            const response = await this.zen.ask(ZenPromptFactory.contemplation(`Changing ${request.key} will affect your project's behavior. Are you certain this aligns with your intention?`));
            if (response.reflectionRequested || !response.value.toLowerCase().includes('yes')) {
                console.log('🙏 Taking time to reflect is wise. Change cancelled.');
                return false;
            }
        }
        // Apply change with consciousness
        await this.applyConfigChange(request);
        return true;
    }
    /**
     * Apply configuration change with awareness
     */
    async applyConfigChange(request) {
        // Track change frequency
        this.metadata.frequentlyChanged.add(request.key);
        this.metadata.modificationCount++;
        // Set nested config value
        this.setNestedValue(this.currentConfig, request.key, request.value);
        // Save with intention comment
        await this.saveConfig(`${request.intention} - Modified ${request.key}`);
        console.log(`✨ Configuration updated: ${request.key} = ${JSON.stringify(request.value)}`);
        // Offer to explain impact
        if (request.confidence === 'experimental') {
            const response = await this.zen.ask(ZenPromptFactory.intention('Would you like me to explain the potential impact of this experimental change?'));
            if (response.value.toLowerCase().includes('yes')) {
                this.explainChangeImpact(request.key, request.value);
            }
        }
    }
    /**
     * Explain the impact of configuration changes
     */
    explainChangeImpact(key, value) {
        const explanations = {
            'development.watchMode': 'This controls whether files are automatically watched for changes',
            'development.hotReload': 'This enables instant updates without full rebuilds',
            'consciousness.enableDeepThinking': 'This adds thoughtful pauses during complex operations',
            'project.intention': 'This sets the overall focus and behavior patterns for your workspace'
        };
        const explanation = explanations[key] || 'This setting affects how your development environment behaves';
        console.log(`\n💡 Impact: ${explanation}`);
        console.log(`🎯 New value: ${JSON.stringify(value)}`);
    }
    /**
     * Show configuration insights and patterns
     */
    showConfigInsights() {
        console.log('\n🔮 Configuration Consciousness Insights:');
        console.log(`📊 Total settings: ${Object.keys(this.currentConfig).length}`);
        console.log(`🔄 Modifications made: ${this.metadata.modificationCount}`);
        console.log(`🎯 Current intention: ${this.currentConfig.project?.intention || 'undefined'}`);
        if (this.metadata.frequentlyChanged.size > 0) {
            console.log(`🌊 Frequently modified: ${Array.from(this.metadata.frequentlyChanged).join(', ')}`);
        }
    }
    /**
     * Interactive configuration session
     */
    async interactiveConfiguration() {
        console.log('\n🧘 Entering conscious configuration mode...');
        let continueSession = true;
        while (continueSession) {
            const response = await this.zen.ask(ZenPromptFactory.flow('What would you like to configure?', ['Project settings', 'Development environment', 'Consciousness options', 'View current config', 'Exit']));
            switch (response.value.toLowerCase()) {
                case 'project settings':
                case 'project':
                    await this.configureProjectSettings();
                    break;
                case 'development environment':
                case 'development':
                    await this.configureDevelopmentSettings();
                    break;
                case 'consciousness options':
                case 'consciousness':
                    await this.configureConsciousnessSettings();
                    break;
                case 'view current config':
                case 'view':
                    this.displayCurrentConfig();
                    break;
                case 'exit':
                case '':
                    continueSession = false;
                    break;
                default:
                    console.log('🤔 I did not understand that choice. Let me show you the options again.');
            }
        }
        console.log('🙏 Configuration session complete. Changes have been saved mindfully.');
    }
    /**
     * Configure project-level settings
     */
    async configureProjectSettings() {
        const nameResponse = await this.zen.ask(ZenPromptFactory.intention('What name embodies your project\'s essence?', [this.currentConfig.project?.name || 'zen-workspace']));
        if (nameResponse.value) {
            await this.modifyConfig({
                key: 'project.name',
                value: nameResponse.value,
                intention: 'Express project identity',
                confidence: 'certain'
            });
        }
        const intentionResponse = await this.zen.ask(ZenPromptFactory.contemplation('What is the deeper intention driving this project?'));
        if (intentionResponse.value) {
            await this.modifyConfig({
                key: 'project.intention',
                value: intentionResponse.value,
                intention: 'Align with deeper purpose',
                confidence: 'certain'
            });
        }
    }
    /**
     * Configure development environment settings
     */
    async configureDevelopmentSettings() {
        const watchResponse = await this.zen.ask(ZenPromptFactory.action('Enable automatic file watching for instant feedback?', 'yes'));
        await this.modifyConfig({
            key: 'development.watchMode',
            value: watchResponse.value.toLowerCase().includes('yes'),
            intention: 'Optimize development flow',
            confidence: 'certain'
        });
        const hotReloadResponse = await this.zen.ask(ZenPromptFactory.action('Enable hot reload for seamless updates?', 'yes'));
        await this.modifyConfig({
            key: 'development.hotReload',
            value: hotReloadResponse.value.toLowerCase().includes('yes'),
            intention: 'Maintain development momentum',
            confidence: 'certain'
        });
    }
    /**
     * Configure consciousness-aware settings
     */
    async configureConsciousnessSettings() {
        const deepThinkingResponse = await this.zen.ask(ZenPromptFactory.contemplation('Would you like mindful pauses during complex operations?'));
        await this.modifyConfig({
            key: 'consciousness.enableDeepThinking',
            value: deepThinkingResponse.value.toLowerCase().includes('yes'),
            intention: 'Cultivate mindful development',
            confidence: 'certain'
        });
    }
    /**
     * Display current configuration beautifully
     */
    displayCurrentConfig() {
        console.log('\n🔮 Current Configuration State:');
        console.log('='.repeat(50));
        console.log(this.formatConfigForDisplay(this.currentConfig));
        console.log('='.repeat(50));
    }
    /**
     * Format configuration for beautiful display
     */
    formatConfigForDisplay(config, indent = 0) {
        const spaces = '  '.repeat(indent);
        let result = '';
        for (const [key, value] of Object.entries(config)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                result += `${spaces}🌿 ${key}:\n`;
                result += this.formatConfigForDisplay(value, indent + 1);
            }
            else {
                const emoji = this.getValueEmoji(key, value);
                result += `${spaces}${emoji} ${key}: ${JSON.stringify(value)}\n`;
            }
        }
        return result;
    }
    /**
     * Get appropriate emoji for configuration values
     */
    getValueEmoji(key, value) {
        if (key.includes('intention'))
            return '🎯';
        if (key.includes('name'))
            return '✨';
        if (typeof value === 'boolean')
            return value ? '✅' : '❌';
        if (typeof value === 'number')
            return '🔢';
        if (key.includes('date') || key.includes('time'))
            return '📅';
        return '💫';
    }
    /**
     * Determine if a change is significant
     */
    isSignificantChange(key) {
        const significantKeys = [
            'project.intention',
            'project.name',
            'consciousness.enableDeepThinking'
        ];
        return significantKeys.includes(key);
    }
    /**
     * Set nested configuration value
     */
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!key)
                continue;
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        const finalKey = keys[keys.length - 1];
        if (finalKey) {
            current[finalKey] = value;
        }
    }
    /**
     * Save configuration with consciousness
     */
    async saveConfig(intention) {
        try {
            const yamlContent = `# Zen Configuration - ${intention}\n# Generated with consciousness at ${new Date().toISOString()}\n\n${yaml.stringify(this.currentConfig)}`;
            await writeFile(this.configPath, yamlContent, 'utf-8');
            this.metadata.lastModified = new Date();
        }
        catch (error) {
            console.error('💥 Failed to save configuration:', error);
            throw error;
        }
    }
    /**
     * Get current configuration
     */
    getCurrentConfig() {
        return { ...this.currentConfig };
    }
    /**
     * Close consciousness session gracefully
     */
    async close() {
        await this.zen.closeGracefully();
    }
}
//# sourceMappingURL=ConfigConsciousness.js.map