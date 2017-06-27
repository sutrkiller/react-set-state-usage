class Class  {
    constructor() {
        this.setState({obj: 123});
        this.setState({obj: 123}, () => "callback");

        this.setState((_) => ({obj: 123}));
        this.setState((prevState) => ({obj: prevState.obj}));
        this.setState((prevState, props) => ({obj: prevState.obj, prop: props.obj}));
        this.setState((_, props) => ({prop: props.obj}));

        this.setState((_) => ({obj: 123}), () => "callback");
        this.setState((prevState) => ({obj: prevState.obj}), () => "callback");
        this.setState((prevState, props) => ({obj: prevState.obj, prop: props.obj}), () => "callback");
        this.setState((_, props) => ({prop: props.obj}), () => "callback");
    }

    private setState(arg, callback?) {
        arg = callback && callback();
        return arg;
    }
}
