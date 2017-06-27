import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'Use functional setState instead of passing an object.';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new UseFunctionalSetState(sourceFile, this.getOptions()));
    }
}

class UseFunctionalSetState extends Lint.RuleWalker {
    public visitCallExpression(node: ts.CallExpression) {
        // console.log(node.expression.name.text);
        if (node && node.expression && node.expression.name && node.expression.name.text.match(/setState/)) {
            console.log(node.arguments);
            if (node.arguments.length > 1 || node.arguments.some((arg) => arg.kind === ts.SyntaxKind.ObjectLiteralExpression)) {
                this.addFailureAtNode(node,Rule.FAILURE_STRING);
            }
        }
    }
}
