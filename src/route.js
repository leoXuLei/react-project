/*
 * @Author: xulei
 * @Date: 2021-03-31 22:53:12
 * @Last Modified by: xulei
 * @Last Modified time: 2021-03-31 22:55:00
 */
import Resume from "@/pages/resume";
import Project from "@/pages/project";
import TableAndCharts from "@/pages/tableAndCharts";

const routes = [
  {
    path: "/",
    title: "resume",
    component: Resume,
    exact: true,
  },
  {
    path: "/project",
    title: "project",
    component: Project,
  },
  {
    path: "/tableAndCharts",
    title: "tableAndCharts",
    component: TableAndCharts,
  },
];

export default routes;
