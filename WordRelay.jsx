const React = require("react");

class WordRelay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "끝말",
      value: "",
      result: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.word.slice(-1) === this.state.value[0]) {
      //this.setState({ result: "딩동댕!", value: "", word: this.state.value });
      this.setState((old) => {
        return { result: "딩동댕!", value: "", word: old.value };
      });
    } else {
      this.setState({ result: "땡!", value: "" });
    }
    this.input.focus();
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  input = undefined;
  ref_input = (ctrl) => (this.input = ctrl);

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.ref_input} value={this.state.value} onChange={this.onChange} />
          <button class="button_class2" type="submit">
            입력
          </button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
