const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordRelay");

// jsx syntax: needs babel.
ReactDom.render(<WordRelay />, document.querySelector("#root"));
