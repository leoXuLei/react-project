import React from "react";

const Son = React.memo((props) => {
  console.log("子组件Son从新渲染", props.num);
  return <div>子组件渲染父组件的num：{props.num}</div>;
});

export default Son;
