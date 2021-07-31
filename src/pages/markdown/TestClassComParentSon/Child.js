import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { getRandomInt } from "@/utils/math";

// class Child extends React.PureComponent {
//   state = {
//     childTitle: "子-0",
//   };

//   render() {
//     const { childTitle } = this.state;
//     const { setParentState } = this.props;
//     console.log("Child render");
//     return (
//       <Card title="子组件">
//         <div>childTitle：{childTitle}</div>
//         {/* <div>parentTitle{this.props.parentTitle}</div> */}
//         <Button
//           type="primary"
//           onClick={() =>
//             this.setState({
//               childTitle: `子-${getRandomInt(0, 10)}`,
//             })
//           }
//         >
//           修改子组件state
//         </Button>
//         <br />
//         <Button
//           type="primary"
//           style={{ marginTop: "16px" }}
//           onClick={() =>
//             setParentState({
//               // parentTitle: `子给父-${getRandomInt(0, 10)}`,
//               // fixedBasicProperty: `父-固定基础属性${getRandomInt(0, 10)}`
//             })
//           }
//         >
//           修改父组件state
//         </Button>
//       </Card>
//     );
//   }
// }

const Child = (props) => {
  const [childTitle, setChildTitle] = useState("子-0");

  useEffect(() => {
    console.log("useEffect console");
    return () => {
      console.log("useEffect  cleanup console");
    };
  }, []);

  console.log("Child render");

  return (
    <Card title="子组件: 函数式组件-无状态">
      <div>childTitle：{childTitle}</div>
      {/* <div>parentTitle{this.props.parentTitle}</div> */}
      <Button
        type="primary"
        onClick={() => setChildTitle(`子-${getRandomInt(0, 10)}`)}
      >
        修改子组件state
      </Button>
    </Card>
  );
};

export default React.memo(Child);
