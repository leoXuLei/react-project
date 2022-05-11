/* eslint-disable react/no-multi-comp */
/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:27
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:55:27
 * @FilePath: \resumetwo\src\pages\resume\index.js
 */

import React, { useReducer, useEffect, useState } from "react";
import Son from "./son";
import "./index.scss";

const Resume = () => {
  const [num, setNum] = useState(0);
  const [obj, setObj] = useState();
  return (
    <>
      <Son num={num} />
      <button onClick={() => setNum((prev) => prev + 1)}>
        修改父组件的基本类型状态
      </button>
      <button onClick={() => setObj([])}>修改父组件的基本类型状态</button>
    </>
  );
};

export default Resume;
