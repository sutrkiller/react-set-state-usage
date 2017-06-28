"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var tsutils_1 = require("tsutils");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.metadata = {
        description: "Requires the radix parameter to be specified when calling `parseInt`.",
        optionExamples: [true],
        options: null,
        optionsDescription: "Not configurable.",
        ruleName: "functional-set-state",
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = "Use functional setState instead of passing an object.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node) && tsutils_1.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === "setState" &&
            (node.arguments.length > 2 ||
                node.arguments.some(function (arg) { return arg.kind === ts.SyntaxKind.ObjectLiteralExpression; }))) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
        return ts.forEachChild(node, cb);
    });
}
//# sourceMappingURL=functionalSetStateRule.js.map