/**
 * ErrorConsciousness: Mindful error handling and learning
 *
 * Transforms traditional error messages into opportunities for growth and understanding.
 * Provides conscious guidance during challenging development moments.
 */
import { ZenConsciousness, ZenPromptFactory, ZenPause } from './ZenConsciousness.js';
/**
 * ErrorConsciousness: Transform errors into wisdom
 */
export class ErrorConsciousness {
    zen;
    errorPatterns;
    errorHistory;
    constructor() {
        this.zen = new ZenConsciousness();
        this.errorHistory = [];
        this.errorPatterns = this.initializeErrorPatterns();
    }
    /**
     * Initialize consciousness-aware error patterns
     */
    initializeErrorPatterns() {
        return [
            {
                pattern: /ENOENT.*package\.json/i,
                category: 'Project Structure',
                guidance: 'It seems like we\'re not in the right directory or the project hasn\'t been initialized yet.',
                actionSuggestions: ['Navigate to project root', 'Initialize new project', 'Check current directory'],
                learningOpportunity: 'Understanding project structure and navigation is fundamental to development flow.'
            },
            {
                pattern: /Cannot find module/i,
                category: 'Dependencies',
                guidance: 'A required module is missing. This is often resolved by installing dependencies.',
                actionSuggestions: ['Run npm install', 'Check package.json', 'Verify module name'],
                learningOpportunity: 'Dependency management is crucial for maintaining project stability.'
            },
            {
                pattern: /Permission denied|EACCES/i,
                category: 'Permissions',
                guidance: 'Access permissions are preventing this operation. Let\'s find a mindful solution.',
                actionSuggestions: ['Check file permissions', 'Use sudo (carefully)', 'Change ownership'],
                learningOpportunity: 'Understanding file permissions helps maintain system security and functionality.'
            },
            {
                pattern: /Unexpected token|SyntaxError/i,
                category: 'Syntax',
                guidance: 'There\'s a syntax issue in the code. This is a perfect learning moment.',
                actionSuggestions: ['Review recent changes', 'Check brackets and quotes', 'Use linting tools'],
                learningOpportunity: 'Syntax errors teach us about language structure and attention to detail.'
            },
            {
                pattern: /EADDRINUSE.*port/i,
                category: 'Network',
                guidance: 'A port is already in use. Let\'s find a peaceful resolution.',
                actionSuggestions: ['Use a different port', 'Stop the running process', 'Check what\'s using the port'],
                learningOpportunity: 'Port management teaches us about system resources and process coordination.'
            }
        ];
    }
    /**
     * Process error with consciousness and wisdom
     */
    async handleError(error, context) {
        const errorContext = {
            error,
            command: context?.command,
            stackTrace: error.stack,
            userAction: context?.userAction,
            timestamp: new Date(),
            severity: this.determineSeverity(error)
        };
        // Add to history for pattern recognition
        this.errorHistory.push(errorContext);
        // Apply sacred pause for reflection
        await ZenPause.micro('Taking a breath to understand what happened...');
        console.log('\n🌊 An obstacle has appeared on our path. Let\'s explore it together.');
        console.log(`💥 ${error.name}: ${error.message}`);
        // Find matching pattern
        const pattern = this.findMatchingPattern(error.message);
        if (pattern) {
            return await this.handleKnownPattern(errorContext, pattern);
        }
        else {
            return await this.handleUnknownError(errorContext);
        }
    }
    /**
     * Handle errors with known patterns
     */
    async handleKnownPattern(context, pattern) {
        console.log(`\n🎯 Category: ${pattern.category}`);
        console.log(`🧘 Guidance: ${pattern.guidance}`);
        console.log(`💡 Learning opportunity: ${pattern.learningOpportunity}`);
        const response = await this.zen.ask(ZenPromptFactory.flow('How would you like to proceed?', [...pattern.actionSuggestions, 'Take time to learn', 'Seek guidance', 'Continue anyway']));
        return this.createRecoveryAction(response.value, pattern, context);
    }
    /**
     * Handle unknown errors with curiosity
     */
    async handleUnknownError(context) {
        console.log('\n🔮 This appears to be a new type of challenge.');
        console.log('🌱 Every error is an opportunity to grow our understanding.');
        const response = await this.zen.ask(ZenPromptFactory.contemplation('Would you like to explore this error together, or shall we try a different approach?'));
        if (response.value.toLowerCase().includes('explore')) {
            return await this.exploreUnknownError(context);
        }
        else {
            return await this.suggestAlternativeApproaches(context);
        }
    }
    /**
     * Explore unknown errors with curiosity
     */
    async exploreUnknownError(context) {
        console.log('\n🔍 Let\'s examine this error mindfully:');
        if (context.stackTrace) {
            console.log('📚 Stack trace insights:');
            const relevantLines = this.extractRelevantStackLines(context.stackTrace);
            relevantLines.forEach((line, index) => {
                console.log(`   ${index + 1}. ${line}`);
            });
        }
        const analysisResponse = await this.zen.ask(ZenPromptFactory.intention('What pattern do you notice in this error?'));
        if (analysisResponse.value) {
            // Learn from user insight
            const newPattern = {
                pattern: new RegExp(this.extractKeywords(context.error.message).join('|'), 'i'),
                category: 'User Identified',
                guidance: `Based on your insight: ${analysisResponse.value}`,
                actionSuggestions: ['Investigate further', 'Try alternative approach', 'Seek documentation'],
                learningOpportunity: 'This error taught us something new about the system.'
            };
            this.errorPatterns.push(newPattern);
            console.log('🌟 Thank you! I\'ve learned something new from your insight.');
        }
        return {
            type: 'learn',
            description: 'Explored error with conscious awareness',
            explanation: 'Sometimes the greatest learning comes from sitting with uncertainty and exploring together.'
        };
    }
    /**
     * Suggest alternative approaches
     */
    async suggestAlternativeApproaches(context) {
        const alternatives = this.generateAlternativeApproaches(context);
        const response = await this.zen.ask(ZenPromptFactory.flow('Here are some alternative paths we could explore:', alternatives));
        return {
            type: 'modify',
            description: `Try alternative approach: ${response.value}`,
            explanation: 'Sometimes the path forward requires creative thinking and flexibility.'
        };
    }
    /**
     * Create recovery action based on user choice
     */
    createRecoveryAction(choice, pattern, _context) {
        const lowerChoice = choice.toLowerCase();
        if (lowerChoice.includes('install') || lowerChoice.includes('npm')) {
            return {
                type: 'retry',
                description: 'Install missing dependencies',
                command: 'npm install',
                explanation: 'Installing dependencies often resolves module-related issues.'
            };
        }
        if (lowerChoice.includes('learn')) {
            return {
                type: 'learn',
                description: `Learn about ${pattern.category}`,
                explanation: pattern.learningOpportunity
            };
        }
        if (lowerChoice.includes('seek') || lowerChoice.includes('guidance')) {
            return {
                type: 'seek_help',
                description: 'Seek additional guidance',
                explanation: 'Sometimes wisdom comes from connecting with others or consulting documentation.'
            };
        }
        if (lowerChoice.includes('continue')) {
            return {
                type: 'skip',
                description: 'Continue despite the error',
                explanation: 'Sometimes we can move forward while keeping the error in awareness.'
            };
        }
        // Default action based on pattern
        return {
            type: 'modify',
            description: choice,
            explanation: `Attempting: ${choice}`
        };
    }
    /**
     * Determine error severity with consciousness
     */
    determineSeverity(error) {
        const message = error.message.toLowerCase();
        if (message.includes('warn') || message.includes('deprecated')) {
            return 'warning';
        }
        if (message.includes('fatal') || message.includes('cannot start') || message.includes('out of memory')) {
            return 'critical';
        }
        if (message.includes('info') || message.includes('notice')) {
            return 'info';
        }
        return 'error';
    }
    /**
     * Find matching error pattern
     */
    findMatchingPattern(errorMessage) {
        return this.errorPatterns.find(pattern => pattern.pattern.test(errorMessage)) || null;
    }
    /**
     * Extract relevant lines from stack trace
     */
    extractRelevantStackLines(stackTrace) {
        const lines = stackTrace.split('\n');
        return lines
            .filter(line => line.trim() && !line.includes('node_modules'))
            .slice(0, 5) // Top 5 relevant lines
            .map(line => line.trim());
    }
    /**
     * Extract keywords from error message
     */
    extractKeywords(message) {
        return message
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 3 && !['error', 'failed', 'cannot'].includes(word))
            .slice(0, 3);
    }
    /**
     * Generate alternative approaches based on error context
     */
    generateAlternativeApproaches(context) {
        const alternatives = ['Take a step back and review', 'Try a simpler approach', 'Check documentation'];
        if (context.command) {
            alternatives.push(`Modify the command: ${context.command}`);
        }
        alternatives.push('Ask for help from the community');
        alternatives.push('Take a break and return with fresh perspective');
        return alternatives;
    }
    /**
     * Get error insights and patterns
     */
    getErrorInsights() {
        const categoryCount = new Map();
        this.errorHistory.forEach(error => {
            const pattern = this.findMatchingPattern(error.error.message);
            const category = pattern?.category || 'Unknown';
            categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
        });
        return {
            totalErrors: this.errorHistory.length,
            categoriesEncountered: categoryCount.size,
            mostCommonCategory: this.getMostCommonCategory(categoryCount),
            recentErrors: this.errorHistory.slice(-5),
            patternsLearned: this.errorPatterns.length
        };
    }
    /**
     * Get most common error category
     */
    getMostCommonCategory(categoryCount) {
        let maxCount = 0;
        let mostCommon = 'None';
        for (const [category, count] of categoryCount) {
            if (count > maxCount) {
                maxCount = count;
                mostCommon = category;
            }
        }
        return mostCommon;
    }
    /**
     * Show session error summary
     */
    async showErrorSummary() {
        const insights = this.getErrorInsights();
        console.log('\n🔮 Error Consciousness Session Summary:');
        console.log(`📊 Errors encountered: ${insights.totalErrors}`);
        console.log(`🎯 Categories explored: ${insights.categoriesEncountered}`);
        console.log(`🌊 Most common pattern: ${insights.mostCommonCategory}`);
        console.log(`🌱 Patterns learned: ${insights.patternsLearned}`);
        if (insights.totalErrors > 0) {
            const response = await this.zen.ask(ZenPromptFactory.contemplation('What wisdom have these challenges brought to your development practice?'));
            if (response.value) {
                console.log(`💎 Your wisdom: ${response.value}`);
            }
        }
    }
    /**
     * Close error consciousness session
     */
    async close() {
        await this.showErrorSummary();
        await this.zen.closeGracefully();
    }
}
//# sourceMappingURL=ErrorConsciousness.js.map