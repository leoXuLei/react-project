import React, { Fragment } from "react";
import { Button } from "antd";
import { DATA_LIST, MERGES_LIST } from "./contants";
// import XLSX from "xlsx";
// import XLSXStyle from "xlsx-style";
import BigNumber from "bignumber.js";

const TestExcelExport = () => {
  //   const exportFile = async () => {
  //     var filename = "testExportFile.xlsx"; //文件名称//数据，一定注意需要时二维数组
  //     var ws_name = "Sheet1"; //Excel第一个sheet的名称
  //     var wb = XLSX.utils.book_new();
  //     var ws = XLSX.utils.aoa_to_sheet(DATA);
  //     console.log(`ws`, ws);
  //     // 目前设置样式无效
  //     ws["H1"].s = {
  //       alignment: { vertical: "center" },
  //       font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } },
  //       fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } },
  //     }; //<====设置xlsx单元格样式
  //     ws["!merges"] = MERGES_LIST;
  //     XLSX.utils.book_append_sheet(wb, ws, ws_name); //将数据添加到工作薄
  //     XLSX.writeFile(wb, filename); //导出Excel
  //   };

  // 如果发请求获取数据，需要把请求到的数据转成和 value_list 一样的数据格式，在作为参数，传入 downloadExl 方法中
  // value_list 中一个数组表示excel中一行数据
  const downloadExl = (value_list, filename, type) => {
    //编码单元格

    var tmp_data = {};
    value_list.forEach(function (value, r) {
      value.forEach(function (v, c) {
        var cell_obj = { c: c, r: r };
        var cell_text = XLSX.utils.encode_cell(cell_obj);
        tmp_data[cell_text] = {
          v: v,
        };
      });
    });

    console.log("tmp_data", tmp_data);
    var white_border = {
      style: "medium",
      color: {
        rgb: "FFFFFFFF",
      },
    };
    // 第一行样式
    var first_line_style = {
      font: {
        sz: 24,
      },
      alignment: {
        horizontal: "center",
      },
    };
    //第三行样式（表头）
    var third_line_style = {
      fill: {
        fgColor: {
          rgb: "ff0188FB",
        },
      },
      font: {
        sz: 14,
        color: {
          rgb: "ffffffff",
        },
      },
      border: {
        right: white_border,
      },
    };

    const hvCenterStyle = {
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };
    //设置H1单元格样式
    tmp_data["H1"].s = {
      ...hvCenterStyle,
    };

    //设置【1-8】行【A-G】列的样式
    var col_list = [];
    // var length = value_list[0].length;
    for (var i = 0; i < 7; i++) {
      var col_text = XLSX.utils.encode_col(i);
      col_list.push(col_text);
    }
    console.log(`设置第三行的样式`, col_list);
    col_list.forEach(function (value, index) {
      var attr3 = value + "2";
      tmp_data[attr3].s = {
        ...hvCenterStyle,
      };
    });
    tmp_data["H2"].s = {
      ...hvCenterStyle,
    };
    tmp_data["H4"].s = {
      ...hvCenterStyle,
    };

    //获取所有单元格编码,比如["A1", "B1", "C1", "D1", "E1", "F1"]
    var output_pos = Object.keys(tmp_data);
    var workbook = {
      SheetNames: ["sheet1"], //保存工作表的名称
      Sheets: {
        sheet1: Object.assign(
          {},
          tmp_data, //单元格内容
          {
            "!ref": output_pos[0] + ":" + output_pos[output_pos.length - 1], //工作表范围
          }
        ),
      },
    };
    //合并单元格
    workbook.Sheets["sheet1"]["!merges"] = MERGES_LIST;

    //设置列宽
    workbook.Sheets["sheet1"]["!cols"] = [
      { wch: 8 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    //导出文件
    var type = type || "xlsx";
    var filename = filename || "文件名";
    filename += "." + type;
    var wopts = {
      bookType: type,
      type: "binary",
    };
    var wbout = XLSX.write(workbook, wopts);
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });
    function saveAs(obj, filename) {
      var link = document.createElement("a");
      link.download = filename;
      link.href = URL.createObjectURL(obj);
      link.click();
      URL.revokeObjectURL(obj);
    }
    saveAs(blob, filename);
  };

  return (
    <Fragment>
      {/* <Button type="primary" onClick={exportFile}> */}
      <Button type="primary" onClick={() => downloadExl(DATA_LIST)}>
        导出Excel
      </Button>
    </Fragment>
  );
};

export default TestExcelExport;
