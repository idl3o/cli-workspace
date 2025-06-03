export declare function formatOutput(data: any): string;
export declare function validateInput(input: string, expectedType: string): boolean;
export declare function logError(message: string): void;
export declare function logInfo(message: string): void;
/**
 * ZenCore - The transcendent CLI engine
 * Following Helia's progressive enhancement philosophy
 */
export declare class ZenCore {
    private readonly intentions;
    private readonly spinner;
    recordIntent(): void;
    showZen(): void;
    think(): void;
    evolve(): void;
    flow(): void;
    getIntentionCount(): number;
}
//# sourceMappingURL=helpers.d.ts.map