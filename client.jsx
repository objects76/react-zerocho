import React from "react";
import ReactDom from "react-dom";
//const { hot } = require("react-hot-loader/root");

//const WordRelay = require("./WordRelay");
//const Hot = hot(WordRelay);

// const NumberBaseball = require("./NumberBaseball");
// const NumberBaseballHooks = require("./NumberBaseballHooks");
// const RenderTest = require("./RenderTest");
import ResponseCheck from "./ResponseCheck";

// jsx syntax: needs babel.
ReactDom.render(<ResponseCheck />, document.querySelector("#root"));
