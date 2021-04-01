import React, { Fragment } from "react";
import { Button } from "antd";
import { DATA, MERGES_LIST } from "./contants";
import XLSX from "xlsx";
import XLSXStyle from "xlsx-style";

const TestExcelExport = () => {
  const exportFile = async () => {
    var filename = "testExportFile.xlsx"; //文件名称//数据，一定注意需要时二维数组
    var ws_name = "Sheet1"; //Excel第一个sheet的名称
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(DATA);
    console.log(`ws`, ws);
    // 目前设置样式无效
    ws["H1"].s = {
      alignment: { vertical: "center" },
      font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } },
      fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } },
    }; //<====设置xlsx单元格样式
    ws["!merges"] = MERGES_LIST;
    XLSX.utils.book_append_sheet(wb, ws, ws_name); //将数据添加到工作薄
    XLSX.writeFile(wb, filename); //导出Excel
  };
  //   !!!!!!!!!!!!!!!!!!!

  function saveAs(obj, fileName) {
    var tmpa = document.createElement("a");
    tmpa.download = fileName || "下载";
    tmpa.href = URL.createObjectURL(obj);
    tmpa.click();
    setTimeout(function () {
      URL.revokeObjectURL(obj);
    }, 100);
  }
  var jsono = [
    {
      id: 1,
      合并的列头1: "数据11",
      合并的列头2: "数据12",
      合并的列头3: "数据13",
      合并的列头4: "数据14",
    },
    {
      id: 2,
      合并的列头1: "数据21",
      合并的列头2: "数据22",
      合并的列头3: "数据23",
      合并的列头4: "数据24",
    },
  ];
  const wopts = {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
    cellStyles: true,
  };
  function downloadExl(json, type) {
    var tmpdata = json[0];
    json.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
      keyMap.push(k);
      json[0][k] = k;
    }
    var tmpdata = []; //用来保存转换好的json
    json
      .map((v, i) =>
        keyMap.map((k, j) =>
          Object.assign(
            {},
            {
              v: v[k],
              position:
                (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) +
                (i + 1),
            }
          )
        )
      )
      .reduce((prev, next) => prev.concat(next))
      .forEach(
        (v, i) =>
          (tmpdata[v.position] = {
            v: v.v,
          })
      );
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    tmpdata["B1"].s = {
      font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } },
      fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } },
    }; //<====设置xlsx单元格样式
    tmpdata["!merges"] = [
      {
        s: { c: 1, r: 0 },
        e: { c: 4, r: 0 },
      },
    ]; //<====合并单元格
    var tmpWB = {
      SheetNames: ["mySheet"], //保存的表标题
      Sheets: {
        mySheet: Object.assign(
          {},
          tmpdata, //内容
          {
            "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
          }
        ),
      },
    };
    var tmpDown = new Blob(
      [
        s2ab(
          XLSXStyle.write(
            tmpWB,
            {
              bookType: type == undefined ? "xlsx" : type,
              bookSST: false,
              type: "binary",
            } //这里的数据是用来定义导出的格式类型
          )
        ),
      ],
      {
        type: "",
      }
    );
    saveAs(
      tmpDown,
      "这里是下载的文件名" +
        "." +
        (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
    );
  }
  function getCharCol(n) {
    let temCol = "",
      s = "",
      m = 0;
    while (n > 0) {
      m = (n % 26) + 1;
      s = String.fromCharCode(m + 64) + s;
      n = (n - m) / 26;
    }
    return s;
  }
  function s2ab(s) {
    if (typeof ArrayBuffer !== "undefined") {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  }
  return (
    <Fragment>
      {/* <Button type="primary" onClick={exportFile}> */}
      <Button type="primary" onClick={() => downloadExl(jsono)}>
        导出Excel
      </Button>
    </Fragment>
  );
};

export default TestExcelExport;
