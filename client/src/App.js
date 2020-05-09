import React, { Component } from "react";
import "./App.css";
// import { response } from "express";

class InputHolder extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", toneResults: "" };
  }

  textChange = (event) => {
    this.setState({ value: event.target.value });
  };

  textReset = () => {
    this.setState({ value: "", toneResults: "" });
  };

  analyzeText = () => {
    if (this.state.value === "") return;

    fetch("/analyze", {
      method: "post",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        this.setState({ toneResults: res.toneResult });
      })
      .catch((err) => console.log("error: ", err));
  };

  render() {
    return (
      <div className="textField">
        <div id="text-container">
          <div>
            <h2>{this.state.toneResults}</h2>
          </div>
          <div>
            <p>Enter text below</p>
          </div>
        </div>
        <textarea
          value={this.state.value}
          onChange={this.textChange}
        ></textarea>
        <br />
        <div>
          <button type="submit" onClick={this.textReset}>
            Reset
          </button>
          <button type="submit" onClick={this.analyzeText}>
            Analyze
          </button>
        </div>
      </div>
    );
  }
}

export default InputHolder;
