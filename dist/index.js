#!/usr/bin/env node
/**
 * 🧘 ZEN CLI - Where Intention Meets Code
 *
 * Philosophy: Start minimal, evolve intentionally
 * - Every feature earns its place
 * - Documentation emerges from use
 * - Performance is a feature, not an afterthought
 */
/* eslint-env node */
import { Command } from 'commander';
import chalk from 'chalk';
import { ZenCore } from './utils/helpers.js';
import { ZenConsciousness, ZenPromptFactory } from './consciousness/ZenConsciousness.js';
import { ConfigConsciousness } from './consciousness/ConfigConsciousness.js';
import { ErrorConsciousness } from './consciousness/ErrorConsciousness.js';
import { createGuidedCommands } from './commands/guided.js';
const program = new Command();
const zen = new ZenCore();
const consciousness = new ZenConsciousness();
// Global error handling with consciousness
process.on('uncaughtException', async (error) => {
    const errorConsciousness = new ErrorConsciousness();
    await errorConsciousness.handleError(error, {
        command: 'zen',
        userAction: 'Running CLI command'
    });
    await errorConsciousness.close();
    process.exit(1);
});
program
    .name('zen')
    .version('0.1.0')
    .description(chalk.dim('🧘 CLI that transcends the ordinary'))
    .hook('preAction', () => zen.recordIntent())
    .action(() => {
    zen.showZen();
});
// Core: The foundation command
program
    .command('think')
    .description('💭 Reflect on current state')
    .action(() => zen.think());
// Evolve: Progressive enhancement
program
    .command('evolve')
    .description('🌱 Grow based on usage patterns')
    .action(() => zen.evolve());
// Flow: Enter the zone
program
    .command('flow')
    .description('🌊 Enter development flow state')
    .action(() => zen.flow());
// Wisdom: Access accumulated knowledge  
program
    .command('wisdom')
    .description('🔮 Share accumulated wisdom')
    .action(() => {
    console.log(chalk.blue('🔮 Ancient CLI wisdom:'));
    console.log(chalk.dim('  • Code with intention, not just function'));
    console.log(chalk.dim('  • Let patterns emerge naturally'));
    console.log(chalk.dim('  • Simplicity is the ultimate sophistication'));
});
// Consciousness Commands: New consciousness-aware interactions
program
    .command('configure')
    .description('⚙️ Mindful configuration management')
    .action(async () => {
    try {
        const configPath = './zen-config.yaml';
        const config = new ConfigConsciousness(configPath);
        await config.initialize();
        await config.interactiveConfiguration();
        await config.close();
    }
    catch (error) {
        const errorConsciousness = new ErrorConsciousness();
        await errorConsciousness.handleError(error, {
            command: 'zen configure',
            userAction: 'Configuring workspace'
        });
        await errorConsciousness.close();
    }
});
program
    .command('prompt')
    .description('🧘 Experience conscious prompting')
    .action(async () => {
    try {
        console.log(chalk.blue('\n🧘 Entering Conscious Prompting Demo\n'));
        // Intention prompt
        const intentionResponse = await consciousness.ask(ZenPromptFactory.intention('What would you like to accomplish today?', ['Write code', 'Learn something new', 'Solve a problem', 'Explore ideas']));
        console.log(chalk.green(`✨ Your intention: ${intentionResponse.value}`));
        // Flow prompt
        const flowResponse = await consciousness.ask(ZenPromptFactory.flow('How would you prefer to work on this?', ['Step by step', 'Quick iteration', 'Deep focus', 'Collaborative exploration']));
        console.log(chalk.blue(`🌊 Your flow: ${flowResponse.value}`));
        // Contemplation prompt
        const contemplationResponse = await consciousness.ask(ZenPromptFactory.contemplation('What would success look like for this session?'));
        if (contemplationResponse.value) {
            console.log(chalk.magenta(`🔮 Your vision: ${contemplationResponse.value}`));
        }
        // Show session insights
        const insights = consciousness.getSessionInsights();
        console.log(chalk.dim('\n📊 Session Insights:'));
        console.log(chalk.dim(`   Interactions: ${insights.interactions}`));
        console.log(chalk.dim(`   Flow: ${insights.currentFlow}`));
        console.log(chalk.dim(`   Patterns: ${insights.patternsDiscovered}`));
        await consciousness.closeGracefully();
    }
    catch (error) {
        const errorConsciousness = new ErrorConsciousness();
        await errorConsciousness.handleError(error, {
            command: 'zen prompt',
            userAction: 'Experiencing conscious prompting'
        });
        await errorConsciousness.close();
    }
});
program
    .command('learn-from-error')
    .description('💥 Transform an error into wisdom')
    .argument('[error-message]', 'Error message to learn from')
    .action(async (errorMessage) => {
    try {
        const errorConsciousness = new ErrorConsciousness();
        if (errorMessage) {
            const simulatedError = new Error(errorMessage);
            await errorConsciousness.handleError(simulatedError, {
                command: 'simulated',
                userAction: 'Learning from error'
            });
        }
        else {
            // Interactive error exploration
            const response = await consciousness.ask(ZenPromptFactory.intention('Describe an error or challenge you\'ve encountered recently'));
            if (response.value) {
                const error = new Error(response.value);
                await errorConsciousness.handleError(error, {
                    command: 'interactive',
                    userAction: 'Reflecting on challenges'
                });
            }
        }
        await errorConsciousness.close();
    }
    catch (error) {
        console.error(chalk.red('💥 Error while learning from error:'), error);
    }
});
// Register guided commands for consciousness-based interactions
createGuidedCommands(program, process.cwd());
// Export for testing
export { zen };
program.parse();
//# sourceMappingURL=index.js.map