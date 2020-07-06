import React, { PureComponent } from "react";
import Ball from "./Ball";

class LottoExtract extends PureComponent {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];
  startAnimation = () => {
    const { winNumbers, winBalls, bonus, redo } = this.state;
    for (let i = 0; i < winNumbers.length; ++i) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((p) => {
          return { winBalls: [...p.winBalls, winNumbers[i]] };
        });
      }, i * 1000 + 1000);
    }

    let i = 6;
    this.timeouts[i] = setTimeout(() => {
      this.setState({ bonus: winNumbers[i], redo: true });
    }, i * 1000 + 1000);
  };
  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
  }
  componentDidUpdate() {
    if (this.state.winBalls.length === 0) this.startAnimation();
  }
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
    //this.startAnimation();
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default LottoExtract;

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
