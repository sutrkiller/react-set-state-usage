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
var OPTION_UPDATER_ONLY = "updater-only";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = parseOptions(this.ruleArguments);
        return this.applyWithFunction(sourceFile, walk, options);
    };
    Rule.metadata = {
        description: "Requires the radix parameter to be specified when calling `parseInt`.",
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
        ruleName: "functional-set-state",
        type: "functionality",
        typescriptOnly: false,
    };
    Rule.FAILURE_STRING = "Use functional setState instead of passing an object.";
    Rule.FAILURE_STRING_UPDATER_ONLY = "Do not use callback parameter \"updater-only\" switch";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    var updaterOnly = ruleArguments[0];
    if (updaterOnly !== OPTION_UPDATER_ONLY) {
        return { updaterOnly: false };
    }
    return {
        updaterOnly: updaterOnly === OPTION_UPDATER_ONLY,
    };
}
function walk(ctx) {
    var updaterOnly = ctx.options.updaterOnly;
    return ts.forEachChild(ctx.sourceFile, function cb(node) {
        if (tsutils_1.isCallExpression(node) && tsutils_1.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === "setState") {
            if (node.arguments.some(function (arg) { return arg.kind === ts.SyntaxKind.ObjectLiteralExpression; })) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
            if (updaterOnly && node.arguments.length > 1) {
                ctx.addFailureAtNode(node.arguments[1], Rule.FAILURE_STRING_UPDATER_ONLY);
            }
        }
        return ts.forEachChild(node, cb);
    });
}
//# sourceMappingURL=functionalSetStateRule.js.map