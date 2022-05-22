/*
 * @Author: xulei
 * @Date: 2021-03-31 22:53:12
 * @Last Modified by: xulei
 * @Last Modified time: 2022-05-22 22:35:02
 */
import Resume from "@/pages/resume";
import Project from "@/pages/project";
// import TableAndCharts from "@/pages/tableAndCharts";
import Markdown from "@/pages/markdown";

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
  /*
  {
    path: "/tableAndCharts",
    title: "tableAndCharts",
    component: TableAndCharts,
  }, */
];

export default routes;
