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
exports.__esModule = true;
var ts = require("typescript");
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UseFunctionalSetState(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'Use functional setState instead of passing an object.';
exports.Rule = Rule;
var UseFunctionalSetState = (function (_super) {
    __extends(UseFunctionalSetState, _super);
    function UseFunctionalSetState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UseFunctionalSetState.prototype.visitCallExpression = function (node) {
        // console.log(node.expression.name.text);
        if (node && node.expression && node.expression.name && node.expression.name.text.match(/setState/)) {
            console.log(node.arguments);
            if (node.arguments.length > 1 || node.arguments.some(function (arg) { return arg.kind === ts.SyntaxKind.ObjectLiteralExpression; })) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }
    };
    return UseFunctionalSetState;
}(Lint.RuleWalker));
