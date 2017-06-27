import * as Lint from "tslint";
import {isCallExpression, isPropertyAccessExpression } from "tsutils";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        description: "Requires the radix parameter to be specified when calling `parseInt`.",
        optionExamples: [true],
        options: null,
        optionsDescription: "Not configurable.",
        ruleName: "functional-set-state",
        type: "functionality",
        typescriptOnly: false,
    };

    public static FAILURE_STRING = "Use functional setState instead of passing an object.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }

}

function walk(ctx: Lint.WalkContext<void>) {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
        if (isCallExpression(node) && isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === "setState"  &&
            (
                node.arguments.length > 2 ||
                node.arguments.some((arg) => arg.kind === ts.SyntaxKind.ObjectLiteralExpression)
            )) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
