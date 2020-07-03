const React = require("react");

class RenderTest extends React.PureComponent {
  state = {
    count: 0,
  };

  onClick = () => {
    this.setState({});
  };

  //   shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     if (this.state.count !== nextState.count) return true;
  //     return false;
  //   }

  render() {
    console.log("render.", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭...</button>
      </div>
    );
  }
}

module.exports = RenderTest;
