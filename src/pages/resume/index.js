/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:27
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:55:27
 * @FilePath: \resumetwo\src\pages\resume\index.js
 */
import React, { PureComponent } from "react";
import "./index.scss";

class Resume extends PureComponent {
  state = {
    index: 0,
  };

  componentDidMount() {
    // console.log(`钩子函数中 setState直接传递参数--------------`);
    // this.setState({ index: this.state.index + 1 }, () => {
    //   console.log(this.state.index);
    // });
    // this.setState({ index: this.state.index + 1 }, () => {
    //   console.log(this.state.index);
    // });

    console.log(`钩子函数中 setState通过函数传递参数--------------`);
    this.setState(
      (preState) => ({ index: preState.index + 1 }),
      () => {
        console.log(this.state.index);
      }
    );
    this.setState(
      (preState) => ({ index: preState.index + 1 }),
      () => {
        console.log(this.state.index);
      }
    );

    // setTimeout(() => {
    //   console.log(`原生事件中--------------`);
    //   this.setState({
    //     index: this.state.index + 1,
    //   });
    //   console.log("state", this.state.index);
    //   this.setState({
    //     index: this.state.index + 1,
    //   });
    //   console.log("state", this.state.index);
    // }, 0);
  }
  render() {
    return <p>Resume组件</p>;
  }
}

export default Resume;
