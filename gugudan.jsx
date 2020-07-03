const React = require("react");
const ReactDom = require("react-dom");

class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      answer: "",
      result: "",
    };
  }

  // refs...
  input = undefined;
  onRefInput = (c) => (this.input = c);
  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.answer) === this.state.first * this.state.second) {
      this.setState((oldState) => {
        return {
          result: "정답: " + oldState.answer,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          answer: "",
        };
      });
    } else {
      this.setState({
        result: "땡",
        answer: "",
      });
    }
    this.input.focus();
  };

  onChange = (e) => {
    this.setState({ answer: e.target.value });
  };
  render() {
    console.log("render....");
    // <!--onclick, onchange, onsubmit, onload, oninput, onfocus, onblur -->
    return (
      <>
        {this.state.first} 곱하기 {this.state.second} = ?
        <form onSubmit={this.onSubmit}>
          <input type="number" value={this.state.answer} onChange={this.onChange} ref={this.onRefInput} />

          <button type="submit" className="inreact" htmlFor>
            입력!
          </button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

// jsx syntax: needs babel.
ReactDom.render(<GuGuDan />, document.querySelector("#root"));
