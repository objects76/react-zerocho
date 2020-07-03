import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting", // 'ready', 'now'
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  onClick = () => {
    const { state, message, result } = this.state;

    const doReady = () => {
      this.setState({ state: "ready", message: "초록에 클릭하세요" });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 1000);
    };

    switch (state) {
      case "waiting":
        doReady();
        break;

      case "ready": // too fast
        clearTimeout(this.timeout);
        this.setState({ message: "!!!초록!!! 에 클릭하세요" });
        setTimeout(doReady, 1000);
        break;
      case "now":
        const elapsed = new Date() - this.startTime;
        this.setState({
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...result, elapsed],
        });
        break;
      default:
        break;
    }
  };
  renderAverage = (result) => {
    if (result.length) {
      return <div>평균시간: {result.reduce((a, b) => a + b) / result.length}ms</div>;
    }
    return null;
    return result.length ? <div>평균시간: {result.reduce((a, b) => a + b) / result.length}ms</div> : null;
  };

  render() {
    const { state, message, result } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClick}>
          {message}
        </div>
        {this.renderAverage(result)}
      </>
    );
  }
}

export default ResponseCheck;
