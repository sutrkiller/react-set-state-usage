import * as ts from "typescript";

export const isThisKeyword = (expression: ts.Expression) => expression.kind === ts.SyntaxKind.ThisKeyword;
