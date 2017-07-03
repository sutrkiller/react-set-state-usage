export const OPTION_UPDATER_ONLY = "updater-only";

export interface IOptions {
    readonly updaterOnly: boolean;
}

export function parseOptions(ruleArguments: any[]): IOptions {
    const updaterOnly = ruleArguments[0] as string;

    return {
        updaterOnly: updaterOnly === OPTION_UPDATER_ONLY,
    };
}
