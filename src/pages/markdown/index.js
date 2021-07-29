/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:27
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:55:27
 * @FilePath: \resumetwo\src\pages\resume\index.js
 */
import React, { PureComponent, memo } from "react";
import "./index.scss";

class Markdown extends PureComponent {
  state = {
    index: 0,
  };

  componentDidMount() {}

  render() {
    const temp = 4;
    // temp = 3;
    return <p>Markdown {temp}</p>;
  }
}

export default Markdown;
