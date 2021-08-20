import React from "react";
import PropTypes from "prop-types";
import { get, isEmpty, reduce, includes, filter } from "lodash";
import { Cascader, Tag } from "antd";

const options = [
  {
    code: "zhejiang",
    name: "浙江",
    items: [
      {
        code: "hangzhou",
        name: "杭州",
      },
      {
        code: "wenzhou",
        name: "温州",
      },
    ],
  },
  {
    code: "jiangsu",
    name: "江苏",
    items: [
      {
        code: "nanjing",
        name: "南京",
      },
      {
        code: "changzhou",
        name: "常州",
      },
    ],
  },
];

const CascaderMul = ({ value = [], onChange, style }) => {
  // 根据数据拿到code的组合
  const connectCode = (arr = []) =>
    reduce(arr, (ss, vv) => (!ss ? vv.code : `${ss}-${vv.code}`), "");

  // console.log(`[][][][][][][][][][][]rendervalue`, value);
  return (
    <div>
      <Cascader
        style={style}
        allowClear
        fieldNames={{ label: "name", value: "code", children: "items" }}
        options={options}
        value={value}
        onChange={(v, selectedOptions) => {
          console.log(`1111111111---------onChange ---------`);
          console.log("v", v);
          console.log(
            "selectedOptions",
            JSON.parse(JSON.stringify(selectedOptions))
          );
          if (!selectedOptions.length) {
            return onChange([]);
          }
          const curCode = connectCode(selectedOptions); // 将code记录一下
          console.log(`curCode`, curCode);
          if (selectedOptions.length) {
            selectedOptions[selectedOptions.length - 1].curCode = curCode;
          }
          const allCode = reduce(
            value,
            (ss, vv) => [...ss, get(vv, [vv.length - 1, "curCode"])],
            []
          );
          console.log(`allCode`, allCode);
          // 已有的，不允许再选
          if (!includes(allCode || [], curCode)) {
            onChange([...value, selectedOptions]);
          } else {
            onChange(value.filter((v) => v[v.length - 1].curCode !== curCode));
          }
        }}
        displayRender={(label, selectedOptions) => {
          console.info(
            `22222222222222------displayRender-------------`,
            label,
            selectedOptions
          );

          const l = isEmpty(selectedOptions)
            ? value
            : [...value, selectedOptions];
          return (l || []).map((v, i) => (
            <Tag
              closable
              key={get(v, [v.length - 1, "curCode"])}
              onClose={() => onChange(filter(value, (vv, ii) => ii !== i))}
            >
              {get(v, [v.length - 1, "name"])}
            </Tag>
          ));
        }}
      />
    </div>
  );
};

CascaderMul.propTypes = {
  value: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

CascaderMul.defaultProps = {
  style: {},
  value: [],
};

export default CascaderMul;
