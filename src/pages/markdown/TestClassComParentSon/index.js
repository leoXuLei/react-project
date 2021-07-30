import React from "react";
import Child from "./Child";

class Parent extends React.Component {
  state = {
    parentTitle: "父-赵",
  };

  render() {
    console.log("Parent render");
    return (
      <div>
        <div>{this.state.parentTitle}</div>
        <Child />
      </div>
    );
  }
}

export default Parent;
