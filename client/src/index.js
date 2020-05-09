import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import InputHolder from "./App.js";
/** 
require("@babel/core").transform("code", {
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

*/

ReactDOM.render(
  <React.StrictMode>
    <InputHolder />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
