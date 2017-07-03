import * as Lint from "tslint";
import {isCallExpression, isPropertyAccessExpression} from "tsutils";
import * as ts from "typescript";

const OPTION_UPDATER_ONLY = "updater-only";

interface IOptions {
    readonly updaterOnly: boolean;
}

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        description: "Requires the setState function to be called with function as the first argument.",
        optionExamples: [true],
        options: {
            items: [
                {
                    enum: [OPTION_UPDATER_ONLY],
                    type: "string",
                },
            ],
            maxLength: 1,
            minLength: 0,
            type: "array",
        },
        optionsDescription: "Not configurable.",
        ruleName: "react-set-state-usage",
        type: "functionality",
        typescriptOnly: false,
    };

    public static FAILURE_STRING = "Use functional setState instead of passing an object.";
    public static FAILURE_STRING_UPDATER_ONLY = "Do not use callback parameter \"updater-only\" switch";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const options = parseOptions(this.ruleArguments);
        return this.applyWithFunction(sourceFile, walk, options);
    }
}

function parseOptions(ruleArguments: any[]): IOptions {
    const updaterOnly = ruleArguments[0] as string;

    return {
        updaterOnly: updaterOnly === OPTION_UPDATER_ONLY,
    };
}

function walk(ctx: Lint.WalkContext<IOptions>) {
    const {sourceFile, options: {updaterOnly}} = ctx;

    function cb(node: ts.Node): void {
        if (isThisSetState(node)) {
            const setStateCall = node as ts.CallExpression;
            const args = setStateCall.arguments;
            if (args.length && args[0].kind === ts.SyntaxKind.ObjectLiteralExpression) {
                ctx.addFailureAtNode(args[0], Rule.FAILURE_STRING);
            }
            if (updaterOnly && args.length > 1) {
                ctx.addFailureAtNode(args[1], Rule.FAILURE_STRING_UPDATER_ONLY);
            }
        }
        return ts.forEachChild(node, cb);
    }

    return ts.forEachChild(sourceFile, cb);
}

function isThisSetState(node: ts.Node) {
    return isCallExpression(node) &&
        isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "setState" &&
        node.expression.expression.getText() === "this";
}
