const React = require("react");

class WordRelay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello, webpack",
    };
  }
  render() {
    return <h1>{this.state.text}</h1>;
  }
}

module.exports = WordRelay;
