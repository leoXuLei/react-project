import React from "react";

class Child extends React.Component {
  state = {
    childTitle: "子-甲",
  };

  render() {
    console.log("Child render");
    return <div>child {this.state.childTitle}</div>;
  }
}

export default Child;
