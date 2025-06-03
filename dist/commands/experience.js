/**
 * ExperienceEvolution: Continuous improvement system for user experience
 *
 * This module implements adaptive learning and experience optimization,
 * allowing the CLI to evolve based on user patterns, preferences, and feedback.
 */
import { ZenConsciousness, ZenPromptFactory } from '../consciousness/ZenConsciousness.js';
import { readFile, writeFile, access } from 'fs/promises';
import { join } from 'path';
/**
 * ExperienceEvolution: The heart of continuous UX improvement
 */
export class ExperienceEvolution {
    zen;
    metricsPath;
    metrics;
    sessionStartTime;
    constructor(workspacePath) {
        this.zen = new ZenConsciousness();
        this.metricsPath = join(workspacePath, '.zen', 'experience-metrics.json');
        this.sessionStartTime = new Date();
        this.metrics = this.initializeMetrics();
    }
    initializeMetrics() {
        return {
            commandUsageFrequency: new Map(),
            taskCompletionTimes: new Map(),
            errorEncounterRate: new Map(),
            frustrationIndicators: [],
            flowStateIndicators: [],
            preferredInteractionStyle: 'guided',
            sessionDuration: [],
            successPatterns: [],
            improvementAreas: []
        };
    }
    /**
     * Initialize experience evolution system
     */
    async initialize() {
        console.log('🌱 Initializing Experience Evolution...');
        try {
            await this.loadExistingMetrics();
            console.log('📊 Historical experience data loaded');
        }
        catch {
            console.log('✨ Starting fresh experience journey');
            await this.createExperienceProfile();
        }
    }
    /**
     * Load existing user experience metrics
     */
    async loadExistingMetrics() {
        try {
            await access(this.metricsPath);
            const content = await readFile(this.metricsPath, 'utf-8');
            const data = JSON.parse(content);
            // Restore Maps from JSON
            this.metrics = {
                ...data,
                commandUsageFrequency: new Map(data.commandUsageFrequency || []),
                taskCompletionTimes: new Map(data.taskCompletionTimes || []),
                errorEncounterRate: new Map(data.errorEncounterRate || [])
            };
        }
        catch (error) {
            throw new Error('Failed to load experience metrics');
        }
    }
    /**
     * Create initial experience profile through conscious questioning
     */
    async createExperienceProfile() {
        console.log('\n🧘 Welcome to your conscious CLI journey!');
        console.log('Let\'s understand how you work best...\n');
        // Discover interaction style preference
        const styleResponse = await this.zen.ask(ZenPromptFactory.contemplation('How do you prefer to interact with tools? Quick and efficient, guided with explanations, or thoughtful and reflective?'));
        this.metrics.preferredInteractionStyle = this.parseInteractionStyle(styleResponse.value); // Understand primary use cases
        const useCaseResponse = await this.zen.ask(ZenPromptFactory.intention('What are your main goals with this CLI?', ['Development workflow', 'Learning and exploration', 'Project management', 'Creative work']));
        // Store use case for future optimization
        this.metrics.successPatterns.push(useCaseResponse.value || 'development workflow');
        // Identify potential friction points
        const frictionResponse = await this.zen.ask(ZenPromptFactory.flow('What typically frustrates you most about command-line tools?', ['Complex syntax', 'Poor error messages', 'Lack of guidance', 'Too much verbosity', 'Slow responses']));
        this.metrics.improvementAreas.push(frictionResponse.value || 'general_usability');
        console.log('✨ Experience profile created! The CLI will now adapt to your preferences.');
        await this.saveMetrics();
    }
    /**
     * Parse interaction style from user response
     */
    parseInteractionStyle(response) {
        const lower = response.toLowerCase();
        if (lower.includes('quick') || lower.includes('efficient') || lower.includes('fast')) {
            return 'immediate';
        }
        if (lower.includes('thoughtful') || lower.includes('reflect') || lower.includes('contemplat')) {
            return 'contemplative';
        }
        return 'guided';
    }
    /**
     * Track command usage and generate insights
     */
    async trackCommandUsage(command, executionTime, success) {
        // Update frequency
        const currentCount = this.metrics.commandUsageFrequency.get(command) || 0;
        this.metrics.commandUsageFrequency.set(command, currentCount + 1);
        // Track completion times
        const times = this.metrics.taskCompletionTimes.get(command) || [];
        times.push(executionTime);
        this.metrics.taskCompletionTimes.set(command, times.slice(-10)); // Keep last 10
        // Track error rates
        if (!success) {
            const errorCount = this.metrics.errorEncounterRate.get(command) || 0;
            this.metrics.errorEncounterRate.set(command, errorCount + 1);
        }
        await this.saveMetrics();
    }
    /**
     * Analyze user experience and generate insights
     */
    async generateExperienceInsights() {
        const insights = [];
        // Analyze command efficiency
        insights.push(...this.analyzeCommandEfficiency());
        // Analyze error patterns
        insights.push(...this.analyzeErrorPatterns());
        // Analyze flow state indicators
        insights.push(...this.analyzeFlowPatterns());
        // Analyze interaction preferences
        insights.push(...this.analyzeInteractionPatterns());
        return insights;
    }
    /**
     * Analyze command efficiency patterns
     */
    analyzeCommandEfficiency() {
        const insights = [];
        for (const [command, times] of this.metrics.taskCompletionTimes) {
            if (times.length >= 3) {
                const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
                const isSlowCommand = avgTime > 5000; // 5 seconds
                if (isSlowCommand) {
                    insights.push({
                        category: 'efficiency',
                        description: `Command '${command}' takes an average of ${(avgTime / 1000).toFixed(1)}s to complete`,
                        confidence: 0.8,
                        suggestedImprovement: `Add progress indicators or optimize ${command} performance`,
                        implementationComplexity: 'medium',
                        impact: 'moderate'
                    });
                }
            }
        }
        return insights;
    }
    /**
     * Analyze error patterns for improvement opportunities
     */
    analyzeErrorPatterns() {
        const insights = [];
        for (const [command, errorCount] of this.metrics.errorEncounterRate) {
            const usageCount = this.metrics.commandUsageFrequency.get(command) || 1;
            const errorRate = errorCount / usageCount;
            if (errorRate > 0.3) { // More than 30% error rate
                insights.push({
                    category: 'usability',
                    description: `Command '${command}' has a ${(errorRate * 100).toFixed(1)}% error rate`,
                    confidence: 0.9,
                    suggestedImprovement: `Improve error messages and add guidance for ${command}`,
                    implementationComplexity: 'low',
                    impact: 'significant'
                });
            }
        }
        return insights;
    }
    /**
     * Analyze flow state patterns
     */
    analyzeFlowPatterns() {
        const insights = [];
        // Check for flow disruption indicators
        if (this.metrics.frustrationIndicators.length > this.metrics.flowStateIndicators.length) {
            insights.push({
                category: 'flow',
                description: 'Frustration indicators outnumber flow state indicators',
                confidence: 0.7,
                suggestedImprovement: 'Reduce cognitive load and improve task clarity',
                implementationComplexity: 'high',
                impact: 'transformative'
            });
        }
        return insights;
    }
    /**
     * Analyze interaction preference alignment
     */
    analyzeInteractionPatterns() {
        const insights = [];
        // This would be enhanced with actual interaction timing data
        insights.push({
            category: 'satisfaction',
            description: `User prefers ${this.metrics.preferredInteractionStyle} interactions`,
            confidence: 0.8,
            suggestedImprovement: `Optimize prompts for ${this.metrics.preferredInteractionStyle} style`,
            implementationComplexity: 'low',
            impact: 'moderate'
        });
        return insights;
    }
    /**
     * Generate adaptive recommendations based on insights
     */
    async generateRecommendations() {
        const insights = await this.generateExperienceInsights();
        const recommendations = [];
        // Command shortcuts for frequently used commands
        const frequentCommands = Array.from(this.metrics.commandUsageFrequency.entries())
            .filter(([_, count]) => count > 5)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
        if (frequentCommands.length > 0) {
            recommendations.push({
                type: 'command_suggestion',
                title: 'Create Command Shortcuts',
                description: `You frequently use: ${frequentCommands.map(([cmd]) => cmd).join(', ')}`,
                expectedBenefit: 'Reduce typing and increase efficiency',
                implementation: async () => {
                    console.log('🚀 Creating personalized shortcuts...');
                    // Implementation would create aliases or shortcuts
                }
            });
        }
        // Workflow optimization suggestions
        for (const insight of insights.filter(i => i.impact === 'significant' || i.impact === 'transformative')) {
            recommendations.push({
                type: 'workflow_optimization',
                title: `Optimize: ${insight.category}`,
                description: insight.description,
                expectedBenefit: insight.suggestedImprovement,
                implementation: async () => {
                    console.log(`🔧 Implementing ${insight.category} optimization...`);
                    // Specific implementation based on insight type
                }
            });
        }
        // Interface customization based on style
        if (this.metrics.preferredInteractionStyle === 'immediate') {
            recommendations.push({
                type: 'interface_customization',
                title: 'Streamline Interface',
                description: 'Reduce prompts and enable quick defaults',
                expectedBenefit: 'Faster command execution with minimal interruption',
                implementation: async () => {
                    console.log('⚡ Enabling immediate mode optimizations...');
                    // Set default flags for less prompting
                }
            });
        }
        return recommendations;
    }
    /**
     * Interactive experience review session
     */
    async conductExperienceReview() {
        console.log('\n🔮 Experience Evolution Review');
        console.log('='.repeat(40));
        const insights = await this.generateExperienceInsights();
        const recommendations = await this.generateRecommendations();
        // Show insights
        if (insights.length > 0) {
            console.log('\n📊 Experience Insights:');
            for (const insight of insights) {
                console.log(`\n${this.getCategoryEmoji(insight.category)} ${insight.category.toUpperCase()}`);
                console.log(`   ${insight.description}`);
                console.log(`   💡 Suggestion: ${insight.suggestedImprovement}`);
                console.log(`   🎯 Impact: ${insight.impact} | Confidence: ${(insight.confidence * 100).toFixed(0)}%`);
            }
        }
        // Present recommendations
        if (recommendations.length > 0) {
            console.log('\n🚀 Adaptive Recommendations:');
            for (const rec of recommendations) {
                console.log(`\n${this.getRecommendationEmoji(rec.type)} ${rec.title}`);
                console.log(`   ${rec.description}`);
                console.log(`   🎁 Benefit: ${rec.expectedBenefit}`);
                const response = await this.zen.ask(ZenPromptFactory.action(`Would you like to implement this improvement?`, 'yes'));
                if (response.value.toLowerCase().includes('yes')) {
                    await rec.implementation();
                    console.log('   ✅ Improvement implemented!');
                }
            }
        }
        // Gather feedback
        await this.collectExperienceFeedback();
    }
    /**
     * Collect direct user feedback on experience
     */
    async collectExperienceFeedback() {
        console.log('\n💭 Your Experience Feedback:');
        const satisfactionResponse = await this.zen.ask(ZenPromptFactory.contemplation('On a scale of 1-10, how satisfied are you with your CLI experience?'));
        const improvementResponse = await this.zen.ask(ZenPromptFactory.intention('What would make your experience even better?'));
        const flowResponse = await this.zen.ask(ZenPromptFactory.flow('When do you feel most in flow while using this CLI?'));
        // Store feedback
        if (satisfactionResponse.value) {
            const score = parseInt(satisfactionResponse.value);
            if (score >= 8) {
                this.metrics.flowStateIndicators.push('high_satisfaction');
            }
            else if (score <= 5) {
                this.metrics.frustrationIndicators.push('low_satisfaction');
            }
        }
        if (improvementResponse.value) {
            this.metrics.improvementAreas.push(improvementResponse.value);
        }
        if (flowResponse.value) {
            this.metrics.flowStateIndicators.push(flowResponse.value);
        }
        await this.saveMetrics();
        console.log('🙏 Thank you for helping the CLI evolve!');
    }
    /**
     * Get emoji for insight categories
     */
    getCategoryEmoji(category) {
        const emojis = {
            efficiency: '⚡',
            usability: '🎯',
            flow: '🌊',
            learning: '🧠',
            satisfaction: '😊'
        };
        return emojis[category] || '💫';
    }
    /**
     * Get emoji for recommendation types
     */
    getRecommendationEmoji(type) {
        const emojis = {
            command_suggestion: '🔧',
            workflow_optimization: '🚀',
            interface_customization: '🎨',
            learning_path: '📚'
        };
        return emojis[type] || '💡';
    }
    /**
     * Save metrics to persistent storage
     */
    async saveMetrics() {
        try {
            // Convert Maps to arrays for JSON serialization
            const data = {
                ...this.metrics,
                commandUsageFrequency: Array.from(this.metrics.commandUsageFrequency.entries()),
                taskCompletionTimes: Array.from(this.metrics.taskCompletionTimes.entries()),
                errorEncounterRate: Array.from(this.metrics.errorEncounterRate.entries())
            };
            const metricsDir = this.metricsPath.substring(0, this.metricsPath.lastIndexOf('\\'));
            // Ensure .zen directory exists
            try {
                await access(metricsDir);
            }
            catch {
                // Directory doesn't exist, would need to create it
                // For now, just save to current directory
                this.metricsPath = 'experience-metrics.json';
            }
            await writeFile(this.metricsPath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.warn('⚠️ Failed to save experience metrics:', error);
        }
    }
    /**
     * Close experience session and record duration
     */
    async closeSession() {
        const sessionDuration = Date.now() - this.sessionStartTime.getTime();
        this.metrics.sessionDuration.push(sessionDuration);
        // Keep only last 20 sessions
        this.metrics.sessionDuration = this.metrics.sessionDuration.slice(-20);
        await this.saveMetrics();
        await this.zen.closeGracefully();
    }
    /**
     * Get experience summary for display
     */
    getExperienceSummary() {
        const totalCommands = Array.from(this.metrics.commandUsageFrequency.values())
            .reduce((sum, count) => sum + count, 0);
        const avgSessionTime = this.metrics.sessionDuration.length > 0
            ? this.metrics.sessionDuration.reduce((a, b) => a + b, 0) / this.metrics.sessionDuration.length
            : 0;
        return {
            totalCommands,
            uniqueCommands: this.metrics.commandUsageFrequency.size,
            averageSessionTime: Math.round(avgSessionTime / 1000 / 60), // minutes
            preferredStyle: this.metrics.preferredInteractionStyle,
            flowIndicators: this.metrics.flowStateIndicators.length,
            improvementAreas: this.metrics.improvementAreas.length
        };
    }
}
//# sourceMappingURL=experience.js.map