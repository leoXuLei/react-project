/*
 * @Author: xulei
 * @Date: 2021-03-31 22:53:20
 * @Last Modified by: xulei
 * @Last Modified time: 2022-05-11 11:52:15
 */
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import routes from "@/route";
import waterbyside from "@/assets/images/waterbyside.jpg";
import styles from "@/app.scss";

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
            <Layout className={styles.Layout}>
              <Header className={styles.header}>
                {routes.map((v) => (
                  <Link to={v.path} key={v.title} className={styles.link}>
                    {v.title}
                  </Link>
                ))}
                <img src={waterbyside} className={styles.waterbyside} />
              </Header>
              <Content className={styles.content}>
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
