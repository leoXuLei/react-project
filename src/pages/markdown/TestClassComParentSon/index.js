import React from "react";
import { Card, Button } from "antd";
import { getRandomInt } from "@/utils/math";
import Child from "./Child";
import "./index.scss";

class Parent extends React.Component {
  state = {
    parentTitle: "父-1",
    fixedBasicProperty: "父-固定基础属性",
    parentFixedObjectProperty: { title: "父-固定引用属性" },
  };

  setParentState = (obj) => {
    this.setState(obj);
  };

  render() {
    const { parentTitle } = this.state;
    console.log("Parent render");
    return (
      <div>
        <Card title="父组件" style={{ marginBottom: "16px" }}>
          <p>parentTitle：{parentTitle}</p>
          <Button
            type="primary"
            onClick={() =>
              this.setState((prev) => {
                return {
                  parentTitle: `父-${getRandomInt(0, 10)}`,
                  fixedBasicProperty: `父-固定基础属性${getRandomInt(0, 10)}`, // fixedBasicProperty的值修改了，点击Button，子组件会重新渲染
                };
              })
            }
          >
            修改父组件state
          </Button>
        </Card>
        <Child parentTitle={this.state.parentTitle} />
      </div>
    );
  }
}

export default Parent;
