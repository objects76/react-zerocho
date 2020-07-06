import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from "./Ball";
import L from "./Logger";

const LottoExtractHooks = () => {
  const l = new L();
  const cache_1 = useMemo(() => getWinNumbers(), []);
  const [winNumbers, set_winNumbers] = useState(cache_1); // 당첨 숫자들
  const [winBalls, set_winBalls] = useState([]);
  const [bonus, set_bonus] = useState(null); // 보너스 공
  const [redo, set_redo] = useState(false);

  const timeouts = useRef([]);

  const startAnimation = () => {
    l.log("startAnimation");
    for (let i = 0; i < winNumbers.length - 1; ++i) {
      timeouts.current[i] = setTimeout(() => {
        set_winBalls((oldValue) => {
          return [...oldValue, winNumbers[i]];
        });
      }, i * 500 + 500);
    }

    let i = winNumbers.length - 1;
    timeouts.current[i] = setTimeout(() => {
      set_bonus(winNumbers[i]);
      l.log("set redo(true) before");
      set_redo(true);
      l.log("set redo(true) after");
    }, i * 500 + 500);
  };

  useEffect(() => {
    l.log("redo changed:", redo);
  }, [redo]);

  // const componentDidMount = () => {
  //   this.startAnimation();
  // };
  // const componentWillUnmount = () => {
  //   timeouts.current.forEach((v) => clearTimeout(v));
  // };
  // const componentDidUpdate = () => {
  //   if (winBalls.length === 0) this.startAnimation();
  // };
  useEffect(() => {
    l.log("useEffect: timeouts.current");
    if (winBalls.length === 0) startAnimation(); // componentDidMount
    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [timeouts.current]);
  // [] is null: === componentDidMount.
  // [...] : componentDidMount & componentDidUpdate
  // return: componentWillUnmount.

  const onClickRedo = useCallback(() => {
    l.log("onClickRedo:", winNumbers);
    set_winNumbers(getWinNumbers());
    set_winBalls([]);
    set_bonus(null);
    calls("set redo(false) before");
    set_redo(false);
    calls("set redo(false) after");
    timeouts.current = [];

    //this.startAnimation();
  }, [winNumbers]);

  const result = (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v + new Date()} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
  l.dtor();
  return result;
};

export default LottoExtractHooks;

function getWinNumbers() {
  const l = new L();
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  l.dtor();
  return [...winNumbers, bonusNumber];
}
