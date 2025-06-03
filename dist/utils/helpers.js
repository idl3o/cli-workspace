/* eslint-env node */
import chalk from 'chalk';
import ora from 'ora';
export function formatOutput(data) {
    return JSON.stringify(data, null, 2);
}
export function validateInput(input, expectedType) {
    switch (expectedType) {
        case 'string':
            return typeof input === 'string' && input.trim() !== '';
        case 'number':
            return !isNaN(Number(input));
        // Add more types as needed
        default:
            return false;
    }
}
export function logError(message) {
    console.error(`Error: ${message}`);
}
export function logInfo(message) {
    console.log(`Info: ${message}`);
}
/**
 * ZenCore - The transcendent CLI engine
 * Following Helia's progressive enhancement philosophy
 */
export class ZenCore {
    intentions = [];
    spinner = ora();
    recordIntent() {
        this.intentions.push(new Date().toISOString());
    }
    showZen() {
        console.log(chalk.cyan('🧘 Welcome to Zen CLI'));
        console.log(chalk.dim('The CLI that grows with your intent'));
    }
    think() {
        this.spinner.start('💭 Reflecting on current state...');
        setTimeout(() => {
            this.spinner.succeed('💡 Insights revealed');
            console.log(chalk.yellow(`📊 Recorded ${this.intentions.length} intentions`));
        }, 1000);
    }
    evolve() {
        this.spinner.start('🌱 Evolution in progress...');
        setTimeout(() => {
            this.spinner.succeed('✨ Transcendence achieved');
            console.log(chalk.green('🎯 CLI has evolved based on usage patterns'));
        }, 1500);
    }
    flow() {
        this.spinner.start('🌊 Entering flow state...');
        setTimeout(() => {
            this.spinner.succeed('🎭 You are now in the zone');
            console.log(chalk.magenta('🚀 Development velocity maximized'));
        }, 800);
    }
    getIntentionCount() {
        return this.intentions.length;
    }
}
//# sourceMappingURL=helpers.js.map