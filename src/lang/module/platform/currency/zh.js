export const currency = {


  // 货币种类
  category: {
    list: '货币种类列表',
    from: '货币种类操作',
    view: '查看货币种类',

    code: '货币种类代码',
    title: '货币种类标题',
    is_hot: '是否热门',
    is_main: '是否主流',
    is_defi: '是否DeFi',

    rules: {
      code: {
        require: '货币种类代码不能为空',
      },
      title: {
        require: '货币种类标题不能为空',
      }
    },
  },

  // 货币交易
  symbol: {
    list: '货币种类列表',
    from: '货币种类操作',
    view: '查看货币种类',

    symbol: '交易对',
    base_currency: '基础币种',
    quote_currency: '报价币种',
    state: '交易对状态',

    rules: {
      symbol: {
        require: '交易对不能为空',
      },
      base_currency: {
        require: '基础币种不能为空',
      },
      quote_currency: {
        require: '报价币种不能为空',
      }
    },
  },
}
