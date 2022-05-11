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

  componentDidMount() {
    const a = [
      [
        {
          value: "611a19ea921a32000fad204a",
          label: "永年的测试空间",
          isLeaf: false,
        },
        {
          value: "611a1af7921a32000fad2069",
          label: "测试迭代永年0816",
          nodeLabel: "永年的测试空间-测试迭代永年0816",
        },
      ],
      [
        {
          value: "60b4530706c925000d792ff4",
          label: "沐白的检查项测试",
          isLeaf: false,
        },
        {
          value: "6119e0ddd3e2ab001132fee3",
          label: "沐白嵌入式测试",
          nodeLabel: "沐白的检查项测试-沐白嵌入式测试",
        },
      ],
    ];
    const getNodePropertyByKey = (arr, key = "nodeLabel") => {
      return arr?.length ? arr[arr?.length - 1][key] : null;
    };
    const res = a.reduce((titleTotal, optionItem) => {
      const titleItem = getNodePropertyByKey(optionItem, "label");
      // return titleItem ? titleTotal : titleTotal.concat(titleItem);
      return !titleItem ? titleTotal : titleTotal.concat(titleItem);
    }, []);
    console.log(`res`, res);
  }

  render() {
    return (
      <div className="markDown">
        <TestClassComParentSon />
      </div>
    );
  }
}

export default Markdown;
