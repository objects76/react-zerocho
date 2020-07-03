//import React from "react";
const React = require("react");
const { hot } = require("react-hot-loader/root");

function getNumbers() {
  return [1, 2, 3, 4];
}

class NumberBaseball extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: getNumbers(),
      value: "",
      result: "",
      tries: [],
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.answer.join("") === this.state.value) {
      this.setState({ result: "홈런", tries: [...this.state.tries, this.state.value + ":홈런"], value: "" });
    } else {
      this.setState({ result: "실패", tries: [...this.state.tries, this.state.value + ":실패"], value: "" });
    }
    this.input.focus();
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  input = undefined;
  ref_input = (c) => {
    this.input = c;
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h2>{result}</h2>
        <form onSubmit={this.onSubmit}>
          <input maxLength={4} value={value} onChange={this.onChange} ref={this.ref_input} />
          <button type="submit">확인</button>
        </form>
        <div>Tries: {tries.length}</div>
        <ul>
          {tries.map((item, idx) => {
            return <Try info={item} idx={idx} key={idx + 1} />;
          })}
        </ul>
      </>
    );
  }
}

class Try extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        <div>{this.props.idx}</div>
        <div>{this.props.info}</div>
      </li>
    );
  }
}

//module.exports = NumberBaseball; // isDev ? hot(NumberBaseball) : NumberBaseBall; ???
module.exports = hot(NumberBaseball);
