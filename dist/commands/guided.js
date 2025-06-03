/**
 * Guided Prompting Command Structure
 *
 * This module implements a comprehensive command system that guides users through
 * conscious interactions, adaptive learning, and experience optimization.
 */
import { Command } from 'commander';
import { ZenConsciousness, ZenPromptFactory } from '../consciousness/ZenConsciousness.js';
import { ConfigConsciousness } from '../consciousness/ConfigConsciousness.js';
import { ExperienceEvolution } from './experience.js';
/**
 * GuidedPromptingSystem: The main orchestrator for user guidance
 */
export class GuidedPromptingSystem {
    zen;
    config;
    experience;
    currentSession = null;
    constructor(workspacePath) {
        this.zen = new ZenConsciousness();
        this.config = new ConfigConsciousness(`${workspacePath}/zen.config.yaml`);
        this.experience = new ExperienceEvolution(workspacePath);
    }
    /**
     * Initialize the guided prompting system
     */
    async initialize() {
        await this.config.initialize();
        await this.experience.initialize();
        console.log('🧘 Guided Prompting System activated');
    }
    /**
     * Main menu for guided experiences
     */
    async showGuidedMenu() {
        console.log('\n🌟 Welcome to Conscious CLI Guidance');
        console.log('═'.repeat(50));
        const routes = this.getAvailableRoutes();
        const routeOptions = routes.map(route => `${route.icon} ${route.name} (${route.estimatedTime})`);
        const response = await this.zen.ask(ZenPromptFactory.flow('What would you like guidance with today?', [...routeOptions, '🔍 View my progress', '⚙️ Settings', '🚪 Exit']));
        const choice = response.value.toLowerCase();
        await this.handleMenuChoice(choice, routes);
    }
    /**
     * Handle main menu choice
     */
    async handleMenuChoice(choice, routes) {
        if (choice.includes('progress')) {
            await this.showUserProgress();
        }
        else if (choice.includes('settings')) {
            await this.openSettings();
        }
        else if (choice.includes('exit')) {
            await this.gracefulExit();
        }
        else {
            // Find matching route
            const selectedRoute = routes.find(route => choice.includes(route.name.toLowerCase()) || choice.includes(route.icon));
            if (selectedRoute) {
                await this.startGuidedSession(selectedRoute);
            }
            else {
                console.log('🤔 I didn\'t understand that choice. Let me show you the options again.');
                await this.showGuidedMenu();
            }
        }
    }
    /**
     * Get available guidance routes based on user level
     */
    getAvailableRoutes() {
        return [
            {
                name: 'First Steps',
                description: 'Learn the fundamentals of conscious CLI interaction',
                icon: '🌱',
                difficulty: 'beginner',
                estimatedTime: '5-10 min',
                benefits: ['Understanding zen commands', 'Basic prompting patterns', 'Flow state awareness']
            },
            {
                name: 'Configuration Journey',
                description: 'Set up your personalized development environment',
                icon: '⚙️',
                difficulty: 'beginner',
                estimatedTime: '10-15 min',
                benefits: ['Tailored settings', 'Workflow optimization', 'Conscious defaults']
            },
            {
                name: 'Problem Solving',
                description: 'Navigate challenges with mindful troubleshooting',
                icon: '🔧',
                difficulty: 'intermediate',
                estimatedTime: '15-20 min',
                prerequisites: ['Basic CLI familiarity'],
                benefits: ['Error resolution', 'Pattern recognition', 'Calm debugging']
            },
            {
                name: 'Flow Optimization',
                description: 'Enhance your productivity and focus states',
                icon: '🌊',
                difficulty: 'intermediate',
                estimatedTime: '20-25 min',
                prerequisites: ['Configuration Journey'],
                benefits: ['Deep work states', 'Reduced friction', 'Sustained momentum']
            },
            {
                name: 'Mastery Path',
                description: 'Advanced consciousness-driven development practices',
                icon: '🧙‍♂️',
                difficulty: 'advanced',
                estimatedTime: '30+ min',
                prerequisites: ['Flow Optimization', 'Problem Solving'],
                benefits: ['Transcendent workflows', 'Intuitive commands', 'Effortless creation']
            },
            {
                name: 'Reflection & Growth',
                description: 'Review your journey and plan future evolution',
                icon: '🔮',
                difficulty: 'beginner',
                estimatedTime: '10-15 min',
                benefits: ['Self-awareness', 'Growth insights', 'Future planning']
            }
        ];
    }
    /**
     * Start a guided session based on selected route
     */
    async startGuidedSession(route) {
        console.log(`\n${route.icon} Starting: ${route.name}`);
        console.log(`⏱️ Estimated time: ${route.estimatedTime}`);
        console.log(`📈 Difficulty: ${route.difficulty}`);
        if (route.prerequisites) {
            console.log(`📋 Prerequisites: ${route.prerequisites.join(', ')}`);
        }
        console.log(`🎁 You'll gain: ${route.benefits.join(', ')}`);
        const confirmResponse = await this.zen.ask(ZenPromptFactory.intention('Are you ready to begin this conscious journey?', ['Yes, let\'s start', 'Tell me more', 'Choose different path']));
        if (confirmResponse.value.toLowerCase().includes('more')) {
            await this.showRouteDetails(route);
            return;
        }
        if (confirmResponse.value.toLowerCase().includes('different')) {
            await this.showGuidedMenu();
            return;
        }
        // Initialize session
        this.currentSession = {
            type: this.mapRouteToSessionType(route.name),
            currentStep: 1,
            totalSteps: this.getSessionSteps(route.name),
            context: { route: route.name },
            userPreferences: {}
        };
        await this.executeGuidedSession(route);
    }
    /**
     * Show detailed information about a route
     */
    async showRouteDetails(route) {
        console.log(`\n📖 ${route.name} - Detailed Overview`);
        console.log('─'.repeat(40));
        console.log(`${route.description}\n`);
        console.log('🎯 What you\'ll learn:');
        route.benefits.forEach(benefit => console.log(`   • ${benefit}`));
        if (route.prerequisites) {
            console.log('\n📚 Prerequisites:');
            route.prerequisites.forEach(prereq => console.log(`   • ${prereq}`));
        }
        const continueResponse = await this.zen.ask(ZenPromptFactory.action('Would you like to start this journey now?', 'yes'));
        if (continueResponse.value.toLowerCase().includes('yes')) {
            this.currentSession = {
                type: this.mapRouteToSessionType(route.name),
                currentStep: 1,
                totalSteps: this.getSessionSteps(route.name),
                context: { route: route.name },
                userPreferences: {}
            };
            await this.executeGuidedSession(route);
        }
        else {
            await this.showGuidedMenu();
        }
    }
    /**
     * Execute the main guided session logic
     */
    async executeGuidedSession(route) {
        const startTime = Date.now();
        switch (route.name) {
            case 'First Steps':
                await this.runFirstStepsSession();
                break;
            case 'Configuration Journey':
                await this.runConfigurationSession();
                break;
            case 'Problem Solving':
                await this.runProblemSolvingSession();
                break;
            case 'Flow Optimization':
                await this.runFlowOptimizationSession();
                break;
            case 'Mastery Path':
                await this.runMasterySession();
                break;
            case 'Reflection & Growth':
                await this.runReflectionSession();
                break;
        }
        // Track completion
        const completionTime = Date.now() - startTime;
        await this.experience.trackCommandUsage(`guided_${route.name.toLowerCase().replace(' ', '_')}`, completionTime, true);
        await this.completeSession(route, completionTime);
    }
    /**
     * First Steps guided session
     */
    async runFirstStepsSession() {
        console.log('\n🌱 Welcome to Your First Conscious CLI Steps');
        // Step 1: Understanding consciousness in CLI
        await this.showStep(1, 'Understanding Consciousness in CLI');
        console.log('Traditional CLIs demand commands. Zen CLI invites intention.');
        console.log('Instead of memorizing syntax, you express what you want to achieve.');
        const understandingResponse = await this.zen.ask(ZenPromptFactory.contemplation('What would make command-line interaction feel more natural to you?'));
        this.currentSession.userPreferences.naturalInteraction = understandingResponse.value;
        // Step 2: Your first zen command
        await this.showStep(2, 'Your First Zen Command');
        console.log('Let\'s try a simple command together.');
        console.log('Type: zen think "What should I work on today?"');
        await this.zen.ask(ZenPromptFactory.action('Go ahead and try it. What happened?', 'It asked me a thoughtful question'));
        // Step 3: Understanding prompting levels
        await this.showStep(3, 'Prompting Levels: Immediate, Considered, Contemplative');
        console.log('🔥 Immediate: Quick decisions (< 1 second)');
        console.log('🤔 Considered: Thoughtful choices (1-5 seconds)');
        console.log('🧘 Contemplative: Deep reflection (5+ seconds)');
        const levelResponse = await this.zen.ask(ZenPromptFactory.flow('Which style resonates most with how you like to work?', ['Immediate - fast and efficient', 'Considered - balanced approach', 'Contemplative - thoughtful and deep']));
        this.currentSession.userPreferences.promptingStyle = levelResponse.value;
        // Step 4: Sacred pause concept
        await this.showStep(4, 'The Sacred Pause');
        console.log('Sometimes the CLI will pause before significant actions.');
        console.log('This isn\'t delay - it\'s consciousness creating space for intention.');
        await this.zen.ask(ZenPromptFactory.contemplation('How might taking conscious pauses improve your development work?'));
        console.log('✨ First Steps complete! You\'ve learned the foundation of conscious CLI interaction.');
    }
    /**
     * Configuration Journey guided session
     */
    async runConfigurationSession() {
        console.log('\n⚙️ Configuration Journey: Personalizing Your Environment');
        await this.showStep(1, 'Understanding Configuration Consciousness');
        console.log('Configuration isn\'t just about settings - it\'s about aligning tools with intention.');
        // Use the ConfigConsciousness for the actual configuration
        await this.config.interactiveConfiguration();
        await this.showStep(2, 'Reviewing Your Choices');
        const configSummary = this.config.getCurrentConfig();
        console.log('🔮 Your configuration reflects these intentions:');
        console.log(`   🎯 Project focus: ${configSummary.project?.intention || 'undefined'}`);
        console.log(`   🔧 Development style: ${configSummary.development?.watchMode ? 'Dynamic' : 'Stable'}`);
        console.log(`   🧘 Consciousness level: ${configSummary.consciousness?.enableDeepThinking ? 'Mindful' : 'Direct'}`);
        await this.zen.ask(ZenPromptFactory.contemplation('How do these settings support your creative flow?'));
    }
    /**
     * Problem Solving guided session
     */
    async runProblemSolvingSession() {
        console.log('\n🔧 Problem Solving: Mindful Troubleshooting');
        await this.showStep(1, 'The Zen Approach to Errors');
        console.log('Errors are teachers, not enemies. They guide us toward understanding.');
        await this.zen.ask(ZenPromptFactory.intention('What type of challenges do you encounter most often?', ['Build errors', 'Configuration issues', 'Workflow blockers', 'Understanding new code']));
        await this.showStep(2, 'Conscious Debugging Process');
        console.log('1. 🧘 Pause and breathe');
        console.log('2. 🔍 Observe without judgment');
        console.log('3. 💭 Ask: "What is this trying to teach me?"');
        console.log('4. 🎯 Take one mindful action');
        console.log('5. 🌱 Reflect on what you learned');
        await this.showStep(3, 'Practice Session');
        const practiceResponse = await this.zen.ask(ZenPromptFactory.contemplation('Think of a recent problem you solved. How might the conscious approach have changed your experience?'));
        this.currentSession.context.problemSolvingInsight = practiceResponse.value;
    }
    /**
     * Flow Optimization guided session
     */
    async runFlowOptimizationSession() {
        console.log('\n🌊 Flow Optimization: Enhancing Your Development Flow');
        await this.showStep(1, 'Understanding Your Flow State');
        const flowResponse = await this.zen.ask(ZenPromptFactory.flow('When do you feel most productive and engaged?', ['Morning focused sessions', 'Late night deep work', 'Collaborative moments', 'Problem-solving breakthroughs']));
        await this.showStep(2, 'Identifying Flow Blockers');
        const blockerResponse = await this.zen.ask(ZenPromptFactory.intention('What typically breaks your flow state?', ['Interruptions', 'Complex syntax', 'Unclear error messages', 'Context switching']));
        await this.showStep(3, 'Optimizing Your Environment');
        // Run experience analysis
        await this.experience.conductExperienceReview();
        await this.showStep(4, 'Creating Flow Triggers');
        console.log('🎵 Consider these flow enhancers:');
        console.log('   • Consistent workspace setup');
        console.log('   • Meaningful project names');
        console.log('   • Reduced cognitive load');
        console.log('   • Clear intention setting');
        this.currentSession.context.flowOptimizations = {
            preferredTime: flowResponse.value,
            mainBlocker: blockerResponse.value
        };
    }
    /**
     * Mastery Path guided session
     */
    async runMasterySession() {
        console.log('\n🧙‍♂️ Mastery Path: Advanced Consciousness Practices');
        await this.showStep(1, 'Transcendent Development Patterns');
        console.log('Mastery is when tool and intention become one.');
        console.log('The CLI anticipates your needs and supports your highest work.');
        await this.showStep(2, 'Creating Custom Consciousness Patterns');
        const patternResponse = await this.zen.ask(ZenPromptFactory.contemplation('What unique workflow patterns serve your creative process?'));
        await this.showStep(3, 'Teaching the CLI Your Wisdom');
        console.log('Advanced users can extend the consciousness system:');
        console.log('   • Custom prompting patterns');
        console.log('   • Personalized reflection questions');
        console.log('   • Domain-specific guidance');
        console.log('   • Team consciousness sharing');
        this.currentSession.context.masteryInsights = patternResponse.value;
    }
    /**
     * Reflection & Growth guided session
     */
    async runReflectionSession() {
        console.log('\n🔮 Reflection & Growth: Your Conscious Journey');
        await this.showStep(1, 'Journey Review');
        const experienceSummary = this.experience.getExperienceSummary();
        console.log('📊 Your growth metrics:');
        console.log(`   🎯 Commands mastered: ${experienceSummary.uniqueCommands}`);
        console.log(`   ⏱️ Average session: ${experienceSummary.averageSessionTime} minutes`);
        console.log(`   🌊 Flow indicators: ${experienceSummary.flowIndicators}`);
        console.log(`   🎨 Preferred style: ${experienceSummary.preferredStyle}`);
        await this.showStep(2, 'Celebrating Growth');
        await this.zen.ask(ZenPromptFactory.contemplation('What growth are you most proud of in your development journey?'));
        await this.showStep(3, 'Setting Future Intentions');
        const intentionResponse = await this.zen.ask(ZenPromptFactory.intention('What would you like to cultivate next in your development practice?', ['Deeper technical skills', 'Better work-life balance', 'More creative projects', 'Team collaboration']));
        this.currentSession.context.futureIntentions = intentionResponse.value;
    }
    /**
     * Show progress indicator for current step
     */
    async showStep(stepNumber, title) {
        if (this.currentSession) {
            this.currentSession.currentStep = stepNumber;
            const progress = `(${stepNumber}/${this.currentSession.totalSteps})`;
            console.log(`\n📍 Step ${stepNumber} ${progress}: ${title}`);
            console.log('─'.repeat(50));
        }
    }
    /**
     * Complete the guided session
     */
    async completeSession(route, completionTime) {
        console.log(`\n🎉 ${route.name} Complete!`);
        console.log(`⏱️ Session time: ${Math.round(completionTime / 1000 / 60)} minutes`);
        const completionResponse = await this.zen.ask(ZenPromptFactory.contemplation('How was this guided experience? What insight will you carry forward?'));
        // Save session insights
        if (this.currentSession) {
            this.currentSession.context.completionInsight = completionResponse.value;
            this.currentSession.context.completionTime = completionTime;
        }
        const nextResponse = await this.zen.ask(ZenPromptFactory.flow('What would you like to explore next?', ['Another guided session', 'Practice on my own', 'Review my progress', 'Exit mindfully']));
        if (nextResponse.value.toLowerCase().includes('another')) {
            await this.showGuidedMenu();
        }
        else if (nextResponse.value.toLowerCase().includes('progress')) {
            await this.showUserProgress();
        }
        else if (nextResponse.value.toLowerCase().includes('practice')) {
            console.log('🚀 Enjoy your practice! Use `zen guide` anytime to return.');
        }
        else {
            await this.gracefulExit();
        }
        this.currentSession = null;
    }
    /**
     * Show user progress and achievements
     */
    async showUserProgress() {
        console.log('\n📈 Your Conscious Development Progress');
        console.log('═'.repeat(50));
        const summary = this.experience.getExperienceSummary();
        const insights = await this.experience.generateExperienceInsights();
        console.log('🏆 Achievements:');
        console.log(`   📚 Commands learned: ${summary.uniqueCommands}`);
        console.log(`   🎯 Sessions completed: ${summary.totalCommands}`);
        console.log(`   ⚡ Preferred flow: ${summary.preferredStyle}`);
        console.log(`   🌊 Flow states: ${summary.flowIndicators}`);
        if (insights.length > 0) {
            console.log('\n💡 Current insights:');
            insights.slice(0, 3).forEach(insight => {
                console.log(`   ${insight.category}: ${insight.description}`);
            });
        }
        await this.zen.ask(ZenPromptFactory.action('Would you like to continue exploring?', 'Back to main menu'));
        await this.showGuidedMenu();
    }
    /**
     * Open settings menu
     */
    async openSettings() {
        await this.config.interactiveConfiguration();
        await this.showGuidedMenu();
    }
    /**
     * Graceful exit with wisdom
     */
    async gracefulExit() {
        console.log('\n🙏 Thank you for this conscious session.');
        console.log('May your development practice be filled with intention and flow.');
        await this.experience.closeSession();
        await this.config.close();
        process.exit(0);
    }
    // Helper methods
    mapRouteToSessionType(routeName) {
        const mapping = {
            'First Steps': 'onboarding',
            'Configuration Journey': 'configuration',
            'Problem Solving': 'troubleshooting',
            'Flow Optimization': 'optimization',
            'Mastery Path': 'optimization',
            'Reflection & Growth': 'reflection'
        };
        return mapping[routeName] || 'onboarding';
    }
    getSessionSteps(routeName) {
        const steps = {
            'First Steps': 4,
            'Configuration Journey': 2,
            'Problem Solving': 3,
            'Flow Optimization': 4,
            'Mastery Path': 3,
            'Reflection & Growth': 3
        };
        return steps[routeName] || 3;
    }
}
/**
 * Create guided prompting commands for the CLI
 */
export function createGuidedCommands(program, workspacePath) {
    const guidedSystem = new GuidedPromptingSystem(workspacePath);
    // Main guide command
    program
        .command('guide')
        .description('🧘 Enter conscious guidance mode')
        .action(async () => {
        await guidedSystem.initialize();
        await guidedSystem.showGuidedMenu();
    });
    // Quick access to specific routes
    program
        .command('onboard')
        .description('🌱 Quick start for new users')
        .action(async () => {
        await guidedSystem.initialize();
        // Auto-start First Steps
        console.log('🌱 Starting your conscious CLI journey...');
        await guidedSystem.showGuidedMenu();
    });
    // Experience optimization
    program
        .command('optimize')
        .description('🚀 Optimize your development experience')
        .action(async () => {
        await guidedSystem.initialize();
        const experience = new ExperienceEvolution(workspacePath);
        await experience.initialize();
        await experience.conductExperienceReview();
    });
    // Progress review
    program
        .command('progress')
        .description('📈 Review your growth and insights')
        .action(async () => {
        await guidedSystem.initialize();
        await guidedSystem.showUserProgress();
    });
}
//# sourceMappingURL=guided.js.map