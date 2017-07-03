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
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.metadata = {
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
Rule.FAILURE_STRING = "Use functional setState instead of passing an object.";
Rule.FAILURE_STRING_UPDATER_ONLY = "Do not use callback parameter \"updater-only\" switch";
exports.Rule = Rule;
function parseOptions(ruleArguments) {
    var updaterOnly = ruleArguments[0];
    return {
        updaterOnly: updaterOnly === OPTION_UPDATER_ONLY,
    };
}
function walk(ctx) {
    var sourceFile = ctx.sourceFile, updaterOnly = ctx.options.updaterOnly;
    function cb(node) {
        if (isThisSetState(node)) {
            var setStateCall = node;
            var args = setStateCall.arguments;
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
function isThisSetState(node) {
    return tsutils_1.isCallExpression(node) &&
        tsutils_1.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "setState" &&
        node.expression.expression.getText() === "this";
}
//# sourceMappingURL=reactSetStateUsageRule.js.map