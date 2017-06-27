class Class  {
    constructor() {
        this.setState({obj: 123});
        this.setState({obj: 123}, () => "text");
        this.setState((_) => ({obj: 123}));
    }

    private setState = (arg, callback?) => {
        return arg;
    }
}
