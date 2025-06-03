import { Command } from 'commander';

const program = new Command();

export const initCommands = () => {
    program
        .command('greet <name>')
        .description('Greet a user by name')
        .action((name) => {
            console.log(`Hello, ${name}!`);
        });

    program
        .command('add <a> <b>')
        .description('Add two numbers')
        .action((a, b) => {
            const sum = parseFloat(a) + parseFloat(b);
            console.log(`The sum of ${a} and ${b} is ${sum}`);
        });

    program.parse(process.argv);
};