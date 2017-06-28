var Class = (function () {
    function Class() {
        this.setState({ obj: 123 });
        this.setState({ obj: 123 }, function () { return "callback"; });
        this.setState(function (_) { return ({ obj: 123 }); });
        this.setState(function (prevState) { return ({ obj: prevState.obj }); });
        this.setState(function (prevState, props) { return ({ obj: prevState.obj, prop: props.obj }); });
        this.setState(function (_, props) { return ({ prop: props.obj }); });
        this.setState(function (_) { return ({ obj: 123 }); }, function () { return "callback"; });
        this.setState(function (prevState) { return ({ obj: prevState.obj }); }, function () { return "callback"; });
        this.setState(function (prevState, props) { return ({ obj: prevState.obj, prop: props.obj }); }, function () { return "callback"; });
        this.setState(function (_, props) { return ({ prop: props.obj }); }, function () { return "callback"; });
    }
    Class.prototype.setState = function (arg, callback) {
        arg = callback && callback();
        return arg;
    };
    return Class;
}());
//# sourceMappingURL=Test.js.map