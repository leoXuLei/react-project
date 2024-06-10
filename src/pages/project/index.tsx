/*
 * @Author: xulei
 * @Date: 2020-03-30 21:31:25
 * @LastEditors: xulei
 * @LastEditTime: 2020-04-19 17:56:02
 * @FilePath: \resumetwo\src\pages\project\index.js
 */
import React from "react";
import maxNumberOfFamilies from "../leetcode/1386. 安排电影院座位/解法一暴力解法";
import { permute } from "./teachingSchedulingSystem/utils";
import TeachingSchedulingService from "./teachingSchedulingSystem/index";
import { starterEditionTestDataOne } from "./2024 清明三天假期排班需求";
import { stuCourseInfos, testRes1 } from "./test";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "red",
    };
  }

  componentDidMount() {
    // const n = 3;
    // const reservedSeats = [
    //   [1, 2],
    //   [1, 3],
    //   [1, 8],
    //   [2, 6],
    //   [3, 1],
    //   [3, 10],
    // ];
    // maxNumberOfFamilies(n, reservedSeats);

    const res = permute([1, 2, 3]);
    console.log("res", res);
    // console.log("stuCourseInfos", stuCourseInfos);
    // console.log("testRes1", testRes1);

    const testTeachingSchedulingService = new TeachingSchedulingService(
      starterEditionTestDataOne
    );
  }

  render() {
    return <div> Project页面</div>;
  }
}

export default Project;
