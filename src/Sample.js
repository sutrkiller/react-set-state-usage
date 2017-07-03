var Class = (function () {
    function Class() {
        var _this = this;
        this.state = {
            flag: true,
        };
        this.props = {
            doNotAccessMeInSetState: true,
        };
        // Use functional setState instead
        this.setState({ obj: 123 });
        this.setState({ obj: 123 });
        this.setState({ obj: 123 }, function () { return "callback"; });
        // Do not access this.props nor this.state in setState
        this.setState(function (_) { return ({ obj: 123, prop: _this.props.doNotAccessMeInSetState }); });
        this.setState(function (_) { return ({ obj: 123, flag: !_this.state.flag }); });
        // This will probably be a false negative
        var x = { flag: this.state.flag };
        this.setState(x);
        // These are okey
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
//# sourceMappingURL=Sample.js.map