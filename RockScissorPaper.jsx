import React, { Component } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "142px",
};

// class: ctor -> render.first -> ref -> componentDidMount
// -> (setState/props): (shouldComponentUpdate:true -> render ->componentDidUpdate)*
// -> `parent remove me`: componentWillUnmount -> `removed from screen`
export default class RockScissorPaper extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: "0",
  };

  interval = null;
  changeHand = () => {
    this.interval = setInterval(() => {
      const { result, score, imgCoord } = this.state;
      switch (imgCoord) {
        case rspCoords.가위:
          this.setState({ imgCoord: rspCoords.바위 });
          break;
        case rspCoords.바위:
          this.setState({ imgCoord: rspCoords.보 });
          break;
        case rspCoords.보:
          this.setState({ imgCoord: rspCoords.가위 });
          break;
      }
    }, 100);
  };

  //
  // lifetime:
  //
  componentDidMount() {
    console.log("did mounted");

    //const { result, score, imgCoord } = this.state; // closure issue when used in async func?

    // after first render: request async op.
    // set interval.
    this.changeHand();
  }

  componentWillUnmount() {
    // right before remove: clear async req ops.
    // clear interval.
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  //componentDidUpdate() {}

  //
  //
  //
  onClickBtn = (choice) => () => {
    console.log("onclick:", choice);

    this.componentWillUnmount();

    switch (choice) {
      case "가위": // 무조건 이김.
        this.setState((prev) => {
          return {
            result: "이겼습니다.",
            score: prev.score + 1,
          };
        });
        break;
      case "바위": // 무조건 짐.
        this.setState((prev) => {
          return {
            result: "졌습니다.",
            score: prev.score - 1,
          };
        });
        break;
      case "보": // 무조건 비김.
        this.setState({
          result: "비겼습니다.",
        });
        break;
    }
    setTimeout(() => {
      this.changeHand();
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <h1>가위 바위 보</h1>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button id="scissor" className="btn" onClick={this.onClickBtn("가위")}>
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}
