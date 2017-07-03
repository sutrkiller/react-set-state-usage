import * as ts from "typescript";

export const isThisKeyword = (expresstion: ts.Expression) => expresstion.kind === ts.SyntaxKind.ThisKeyword;
