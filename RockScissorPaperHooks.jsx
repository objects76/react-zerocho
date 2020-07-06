import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "142px",
};

// class: ctor -> render.first -> ref -> componentDidMount
// -> (setState/props): (shouldComponentUpdate:true -> render ->componentDidUpdate)*
// -> `parent remove me`: componentWillUnmount -> `removed from screen`
const RockScissorPaperHooks = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const interval = useRef(null);

  const startChangeHand = () => {
    interval.current = setInterval(() => {
      switch (imgCoord) {
        case rspCoords.가위:
          setImgCoord(rspCoords.바위);
          break;
        case rspCoords.바위:
          setImgCoord(rspCoords.보);
          break;
        case rspCoords.보:
          setImgCoord(rspCoords.가위);
          break;
      }
    }, 100);
  };

  //
  // lifetime:
  //
  const componentDidMount = () => {
    console.log("componentDidMount");
    // after first render: request async op.
    // set interval.
    startChangeHand();
  };

  const componentWillUnmount = () => {
    console.log("componentWillUnmount");
    // right before remove: clear async req ops.
    // clear interval.
    clearInterval(interval.current);
  };

  //componentDidUpdate() {}

  useEffect(() => {
    // componentDidMount, componentDidUpdate
    componentDidMount();
    return () => {
      // componentWillUnmount
      componentWillUnmount();
    };
  }, [imgCoord]);
  //
  //
  //
  const onClickBtn = (choice) => () => {
    console.log("onclick:", choice);

    clearInterval(interval.current);

    switch (choice) {
      case "가위": // 무조건 이김.
        setResult("이겼습니다.");
        setScore((p) => {
          return p.score + 1;
        });
        break;
      case "바위": // 무조건 짐.
        setResult("졌습니다.");
        setScore((p) => {
          return p.score - 1;
        });
        break;
      case "보": // 무조건 비김.
        setResult("비겼습니다.");
        break;
    }
    setTimeout(() => {
      startChangeHand();
    }, 1000);
  };

  return (
    <>
      <h1>가위 바위 보</h1>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RockScissorPaperHooks;
