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

        if (node.name.toString().match(/setState/)) {
            if (node.arguments.length > 1 || node.arguments.some(arg => arg.kind === ts.SyntaxKind.ObjectLiteralExpression)) {
                this.addFailureAtNode(node,Rule.FAILURE_STRING);
            }
        }
    }
}
