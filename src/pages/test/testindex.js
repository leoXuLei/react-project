import React, { useEffect, useState } from "react";
import CascaderMul from "./CascaderMul";
/// 调用
export default () => {
  const [val, setVal] = useState([]);

  useEffect(() => {
    console.log("val:", val);
  }, [val]);

  return (
    <CascaderMul
      value={val}
      onChange={(vv) => setVal(vv)}
      style={{ width: 300 }}
    />
  );
};
