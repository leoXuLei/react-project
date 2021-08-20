/*
 * @Author: xulei
 * @Date: 2021-03-31 22:53:12
 * @Last Modified by: xulei
 * @Last Modified time: 2021-07-18 12:50:10
 */
import Resume from "@/pages/resume";
import Project from "@/pages/project";
// import TableAndCharts from "@/pages/tableAndCharts";
import Markdown from "@/pages/markdown";
// import Test from '@/pages/test/treeData'
import Test from "@/pages/test/index";

const routes = [
  {
    path: "/",
    title: "resume",
    component: Resume,
    exact: true,
  },
  {
    path: "/markdown",
    title: "markdown",
    component: Markdown,
  },
  {
    path: "/project",
    title: "project",
    component: Project,
  },
  {
    path: "/test",
    title: "test",
    component: Test,
  },
  /*
  {
    path: "/tableAndCharts",
    title: "tableAndCharts",
    component: TableAndCharts,
  }, */
];

export default routes;
