/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:27
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:55:27
 * @FilePath: \resumetwo\src\pages\resume\index.js
 */
import React, { PureComponent, memo } from "react";
import TestClassComParentSon from "./TestClassComParentSon";
import "./index.scss";

class Markdown extends PureComponent {
  state = {
    index: 0,
  };

  componentDidMount() {}

  render() {
    console.log('冲冲冲2')
    return (
      <div>
        Markdown 页面 2345
        <TestClassComParentSon />
      </div>
    );
  }
}

export default Markdown;
