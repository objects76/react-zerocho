//import React from "react";
const React = require("react");
const { hot } = require("react-hot-loader/root");

function getNumbers() {
  return [1, 2, 3, 4];
}

const NumberBaseballHooks = () => {
  const [answer] = React.useState(getNumbers());

  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const [tries, setTries] = React.useState([]);
  const input = React.useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (answer.join("") === value) {
      setResult("홈런");
      setTries((old) => [...old, value + ":홈런"]);
    } else {
      setResult("실패");
      setTries((old) => [...old, value + ":실패"]);
    }
    setValue("");
    input.current.focus();
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h2>{result}</h2>
      <form onSubmit={onSubmit}>
        <input maxLength={4} value={value} onChange={onChange} ref={input} />
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
};

const Try = (props) => {
  return (
    <li>
      <div>{props.idx}</div>
      <div>{props.info}</div>
    </li>
  );
};

//module.exports = NumberBaseballHooks; // isDev ? hot(NumberBaseballHooks) : NumberBaseballHooks; ???
module.exports = hot(NumberBaseballHooks);
