/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:25
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:56:02
 * @FilePath: \resumetwo\src\pages\project\index.js
 */
import React from "react";
import "./index.scss";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "red",
    };
  }

  componentDidMount() {
    console.log(`钩子函数中--------------`);
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    });
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    });

    setTimeout(() => {
      console.log(`原生事件中--------------`);
      this.setState({
        index: this.state.index + 1,
      });
      console.log("state", this.state.index);
      this.setState({
        index: this.state.index + 1,
      });
      console.log("state", this.state.index);
    }, 0);
  }

  render() {
    var { bgColor } = this.state;
    return <div style={{ backgroundColor: bgColor }}> Project组件</div>;
  }
}

export default Project;
