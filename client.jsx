import React from "react";
import ReactDom from "react-dom";
const { hot } = require("react-hot-loader/root");

//import { hot } from "react-hot-loader/root";
//import WordRelay from "./WordRelay";
//const Hot = hot(WordRelay);

//import  NumberBaseball from "./NumberBaseball";
//import  NumberBaseballHooks from "./NumberBaseballHooks";
//import  RenderTest from "./RenderTest";
import TestComponent from "./LottoExtractHooks";

const Hot = hot(TestComponent);

// jsx syntax: needs babel.
ReactDom.render(<Hot />, document.querySelector("#root"));
