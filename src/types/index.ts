export interface Command {
    name: string;
    description: string;
    execute(args: string[]): Promise<void>;
}

export interface CLIOptions {
    verbose?: boolean;
    help?: boolean;
}

export type CommandMap = {
    [key: string]: Command;
};