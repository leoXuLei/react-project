/*
 * @Author: xulei
 * @Date: 2021-03-31 22:53:20
 * @Last Modified by: xulei
 * @Last Modified time: 2021-07-27 13:30:23
 */
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import routes from "@/route";
import waterbyside from "@/assets/images/waterbyside.jpg";
import "@/app.scss";

const { Header, Content } = Layout;

class App extends React.Component {
  componentDidMount() {
    const arr = [new Promise(() => {}), new Promise(() => {})];
    arr.forEach((v) => console.log(v));
    const a = () => {
      return "测试箭头函数";
    };
    switch (a) {
      case "a":
        break;
      case "b":
        break;
    }
    console.log(a());
  }

  render() {
    return (
      <>
        {
          <Router>
            <Layout className="layout">
              <Header className="header">
                {routes.map((v) => (
                  <Link to={v.path} key={v.title} className="link">
                    {v.title}
                  </Link>
                ))}
                <img src={waterbyside} className="waterbyside" />
              </Header>
              <Content className="content">
                {routes.map((v) => {
                  if (v.exact) {
                    return (
                      <Route
                        exact
                        key={v.path}
                        path={v.path}
                        component={v.component}
                      />
                    );
                  }
                  return (
                    <Route key={v.path} path={v.path} component={v.component} />
                  );
                })}
              </Content>
            </Layout>
          </Router>
        }
      </>
    );
  }
}

export default App;
