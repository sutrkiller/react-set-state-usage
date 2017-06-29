# react-set-state-usage [![CircleCI](https://circleci.com/gh/sutrkiller/react-set-state-usage.svg?style=svg)](https://circleci.com/gh/sutrkiller/react-set-state-usage) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**react-set-state-usage** is a rule, that enforces usage of callbacks in setState calls instead of objects.

* **updater-only:** it also has updater-only option to forbid usage of second callback parameter of setState

## Installation

react-set-state-usage is available as the `react-set-state-usage` package on [npm](https://www.npmjs.com/).

## Examples

```tsx
class NameDemo extends React.Component<{ someCallback: () => void }, { name: string }> {

  constructor(props) {
    super(props);

    this.state = { name: 'initialName' };

    this.onBadClick = this.onBadClick.bind(this);
    this.onGoodClick = this.onGoodClick.bind(this);
    this.onSomeOtherClick = this.onSomeOtherClick.bind(this);
  }

  function onBadClick() {
    this.setState({ name: 'badName' });  // will produce tslint error
  }
  
  function onGoodClick() {
    this.setState(() => ({ name: 'goodName' })); // will not produce tslint error
  }
  
  function onSomeOtherClick() {
    this.setState(() => ({ name: 'someName' }), this.props.someCallback); // with updater-only option enabled, will produce tslint error
  }

  render() {
    return (
      <div>
        <span>{this.state.name}</span>
        <button onClick={this.onBadClick}> bad button </button>
        <button onClick={this.onGoodClick}> good button </button>
        <button onClick={this.onSomeOtherClick}> some button </button>
      </div>
    );
  }
}
```
