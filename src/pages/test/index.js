import { Cascader } from "antd";
import React, { useEffect, useState } from "react";

const optionLists = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    isLeaf: false,
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    isLeaf: false,
  },
];

const LazyOptions = () => {
  const [options, setOptions] = useState(optionLists);

  const onChange = (value, selectedOptions) => {
    console.log(`onChange >>>>>>>>value`, JSON.parse(JSON.stringify(value)));
    console.log(
      `onChange >>>>>>>>selectedOptions`,
      JSON.parse(JSON.stringify(selectedOptions))
    );
  };

  const loadData = (selectedOptions) => {
    console.log(
      `loadData =======selectedOptions`,
      JSON.parse(JSON.stringify(selectedOptions))
    );
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  console.log(`options`, JSON.parse(JSON.stringify(options)));

  return (
    <Cascader
      options={options}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect
    />
  );
};

export default LazyOptions;
