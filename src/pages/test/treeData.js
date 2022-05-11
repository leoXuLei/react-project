/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:27
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:55:27
 * @FilePath: \resumetwo\src\pages\resume\index.js
 */
import React, { PureComponent, memo } from "react";
import { Tree } from "antd";

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
console.log("初始化gData", JSON.parse(JSON.stringify(gData)));

class Test extends PureComponent {
  state = {
    gData,
    expandedKeys: ["0-0", "0-0-0", "0-0-0-0"],
  };


  // 目标元素的同级或者子级
  // 节点拖动过程中触发
  onDragEnter = (info) => {
    // console.log("onDragEnter", JSON.parse(JSON.stringify(info)));
    console.log("onDragEnter", info);
    // expandedKeys 需要受控时设置
    // this.setState({
      //   expandedKeys: info.expandedKeys,
      // });
  };

  // 放下拖动节点到目标节点
  onDrop = (info) => {
    console.error(" onDrop info", info, info.dropToGap);
    const dropKey = info.node.key; // 目标节点
    const dragKey = info.dragNode.key; // 拖动的节点
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // loop函数传参（数组，key，回调）
    const loop = (data, key, callback) => {
      // 遍历data数组，如果元素.key === key 执行   回调函数（元素，下标，数组）， 否则  递归执行loop函数（元素.children, key，回调）
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    console.log(`初始data`, data);

    // Find dragObject：【@@@@@@@@@@@@@@11111111@@@@@@@@@@@@@@@@】找到拖动的那个节点元素，先删除再存储为 dragObj
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      console.info(`第一个if`);
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      console.info(`第二个if`);

      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      console.info(`第三个if`);

      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  render() {
    return (
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
        treeData={this.state.gData}
      />
    );
  }
}

export default Test;
