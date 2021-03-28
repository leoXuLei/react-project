import React from "react";
// import { HashRouter as Router, Route, Link } from "react-router-dom";
// import { Layout } from "antd";
// import routes from "./route";
import waterbyside from "@/assets/images/waterbyside.jpg";
import styles from "@/css/index.scss";
import "./app.scss";

// const { Header, Content } = Layout;

class App extends React.Component {
  componentDidMount() {
    const arr = [new Promise(() => {}), new Promise(() => {})];
    arr.forEach((v) => console.log(v));
    let a = () => {
      return "测试箭头函数";
    };
    console.log(a());
  }
  render() {
    return (
      <>
        {/* <Router>
          <Layout>
            <Header className="header">
              {routes.map((v) => (
                <Link to={v.path} key={v.title} className="link">
                  {v.title}
                </Link>
              ))}
            </Header>
            <Content>
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
        </Router> */}
        <div>hello react</div>
        <img src={waterbyside} className={styles.waterbyside} />
      </>
    );
  }
}

export default App;
