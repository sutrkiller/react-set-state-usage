import {isNullOrUndefined} from "util";
class Class  {
    private state = {
        flag: true,
        doNotAccessMeInSetState: () => null,
    };

    private props = {
        doNotAccessMeInSetState: true,
    };

    constructor() {
        // Use functional setState instead
        this.setState({obj: 123});
        this.setState({obj: 123});
        this.setState({obj: 123}, () => "callback");

        // Do not access this.props nor this.state in setState
        this.setState((_) => ({obj: 123, prop: this.props.doNotAccessMeInSetState}));
        this.setState((_) => ({obj: 123, flag: !this.state.flag}));
        this.setState((_) => ({obj: 123, prop: this.props.doNotAccessMeInSetState, state: this.state.doNotAccessMeInSetState}), () => "callback");

        this.setState(({obj: 123, prop: this.props.doNotAccessMeInSetState, state: this.state.doNotAccessMeInSetState}), () => "callback");

        // This will probably be a false negative
        const x = { flag: this.state.flag };
        this.setState(x);

        // These are okay
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
