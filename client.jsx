const React = require("react");
const ReactDom = require("react-dom");
//const { hot } = require("react-hot-loader/root");

//const WordRelay = require("./WordRelay");
//const Hot = hot(WordRelay);

const NumberBaseballHooks = require("./NumberBaseballHooks");
const RenderTest = require("./RenderTest");
// jsx syntax: needs babel.
ReactDom.render(<RenderTest />, document.querySelector("#root"));
