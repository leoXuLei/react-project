export const DATA_LIST = [
  ["序号", "角色名称", "角色描述", "权限类型", "角色权限", "角色权限"],
  [0, "结算岗", "", "页面权限", "我的任务", "我的审批单"],
  [0, "结算岗", "", "页面权限", "我的任务", "交易事件提醒"],
  [0, "结算岗", "", "页面权限", "定价簿记", "试定价"],
  [0, "结算岗", "", "页面权限", "定价簿记", "场外簿记"],
  [0, "结算岗", "", "页面权限", "实时风控", "持仓明细"],
  [0, "结算岗", "", "页面权限", "实时风控", "标的风险盈亏"],
  [0, "结算岗", "", "页面权限", "实时风控", "到期合约风险"],
  [0, "结算岗", "", "页面权限", "实时风控", "投资组合风险"],
  [0, "结算岗", "", "页面权限", "实时风控", "标的物情景分析"],
  [0, "结算岗", "", "页面权限", "实时风控", "实时风险&盈亏"],
  [0, "结算岗", "", "页面权限", "持仓管理", "场外持仓"],
  [0, "结算岗", "", "页面权限", "持仓管理", "场内持仓"],
  [0, "结算岗", "", "页面权限", "持仓管理", "批量结算"],
  [0, "结算岗", "", "页面权限", "持仓管理", "批量观察"],
  [0, "结算岗", "", "页面权限", "持仓管理", "批量敲入敲出"],
  [0, "结算岗", "", "页面权限", "持仓管理", "结算通知书"],
  [0, "结算岗", "", "页面权限", "持仓管理", "交易确认书"],
  [0, "结算岗", "", "页面权限", "持仓管理", "交易详情"],
  [0, "结算岗", "", "页面权限", "客户和资金", "客户信息"],
  [0, "结算岗", "", "页面权限", "客户和资金", "销售管理"],
  [0, "结算岗", "", "页面权限", "客户和资金", "银行账户管理"],
  [0, "结算岗", "", "页面权限", "客户和资金", "财务出入金"],
  [0, "结算岗", "", "页面权限", "客户和资金", "保证金管理"],
  [0, "结算岗", "", "页面权限", "客户和资金", "资金统计"],
  [0, "结算岗", "", "页面权限", "日终报告", "持仓明细"],
  [0, "结算岗", "", "页面权限", "日终报告", "标的风险盈亏"],
  [0, "结算岗", "", "页面权限", "日终报告", "中证协数据报告"],
  [0, "结算岗", "", "页面权限", "日终报告", "历史盈亏"],
  [0, "结算岗", "", "页面权限", "日终报告", "客户估值报告"],
  [0, "结算岗", "", "页面权限", "日终报告", "自定义报告"],
  [0, "结算岗", "", "页面权限", "日终报告", "同一主体业务监测信息汇总表（一）"],
  [0, "结算岗", "", "页面权限", "日终报告", "同一主体业务监测信息汇总表（二）"],
  [0, "结算岗", "", "页面权限", "市场行情", "行情管理"],
  [0, "结算岗", "", "页面权限", "市场行情", "标的物管理"],
  [0, "结算岗", "", "页面权限", "市场行情", "涨跌幅管理"],
  [0, "结算岗", "", "页面权限", "定价配置", "波动率曲面"],
  [0, "结算岗", "", "页面权限", "定价配置", "无风险利率曲线"],
  [0, "结算岗", "", "页面权限", "定价配置", "分红/融券曲线"],
  [0, "结算岗", "", "页面权限", "定价配置", "自定义模型"],
  [0, "结算岗", "", "页面权限", "定价配置", "交易日历"],
  [0, "结算岗", "", "页面权限", "系统设置", "交易簿管理"],
  [0, "结算岗", "", "页面权限", "系统设置", "投资组合管理"],
  [0, "结算岗", "", "页面权限", "系统设置", "风控设置"],
  [0, "结算岗", "", "页面权限", "系统设置", "文档模板"],
  [0, "结算岗", "", "页面权限", "系统设置", "系统日志"],
  [0, "结算岗", "", "页面权限", "系统设置", "部门管理"],
  [0, "结算岗", "", "页面权限", "系统设置", "角色管理"],
  [0, "结算岗", "", "页面权限", "系统设置", "用户管理"],
  [0, "结算岗", "", "页面权限", "系统设置", "审批流程配置"],
  [0, "结算岗", "", "页面权限", "系统设置", "审批组管理"],
];

const handledMergeKeys = [
  [1, 2],
  [3, 4],
  [5, 10],
  [11, 18],
  [19, 24],
  [25, 32],
  [33, 35],
  [36, 40],
  [41, 50],
];

const dataLen = 50;

// c 代表列号，r 代表行号
export const MERGES_LIST = [
  {
    // 【1】行 【EF：45】列合并
    s: {
      // s开始
      c: 4, // H1
      r: 0,
    },
    e: {
      // e结束
      c: 5, // I1
      r: 0,
    },
  },
  // 合并【A-D 共4】列的【1-dataLen】行
  ...[...Array(4).keys()].map((v) => {
    return {
      s: {
        c: v,
        r: 1,
      },
      e: {
        c: v,
        r: dataLen,
      },
    };
  }),
  // 【E：4】列 多个多行合并
  ...handledMergeKeys.map((v) => {
    return {
      s: {
        c: 4,
        r: v[0],
      },
      e: {
        c: 4,
        r: v[1],
      },
    };
  }),
];
