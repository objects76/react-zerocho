import React, { useState, useRef } from "react";
const { hot } = require("react-hot-loader/root");

const ResponseCheckHooks = () => {
  const [state, setState] = useState("waiting"); // 'ready', 'now'
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef(null);

  const onClick = () => {
    const doReady = () => {
      setState("ready");
      setMessage("초록에 클릭하세요");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 1000);
    };

    switch (state) {
      case "waiting":
        doReady();
        break;

      case "ready": // too fast
        clearTimeout(timeout.current);
        setMessage("!!!초록!!! 에 클릭하세요");
        setTimeout(doReady, 1000);
        break;
      case "now":
        const elapsed = new Date() - startTime.current;
        setState("waiting");
        setMessage("클릭해서 시작하세요");
        setResult((prev) => [...prev, elapsed]);
        break;
      default:
        break;
    }
  };
  const renderAverage = (result) => {
    if (result.length) {
      return (
        <>
          <div>평균시간: {result.reduce((a, b) => a + b) / result.length}ms</div>
          <button onClick={onReset}>Reset</button>
        </>
      );
    }
    return null;
  };
  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClick}>
        {message}
      </div>
      {renderAverage(result)}
    </>
  );
};
//module.exports = hot(ResponseCheckHooks);
export default hot(ResponseCheckHooks);
