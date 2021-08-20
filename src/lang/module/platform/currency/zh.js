export const currency = {


  // 货币种类
  category: {
    list: '货币种类列表',
    from: '货币种类操作',
    view: '查看货币种类',

    slug: '币种名称',
    symbol: '币种符号',
    fullname: '币种全称',
    logo_url: '图标链接',
    market_cap_usd: '币种市值',
    available_supply: '流通量',
    total_supply: '发行总量',
    max_supply: '最大发行量',
    issue_time: '上市时间',
    is_hot: '是否热门',
    is_main: '是否主流',
    is_defi: '是否DeFi',

    rules: {
      slug: {
        require: '币种名称代码不能为空',
      },
      symbol: {
        require: '币种符号标题不能为空',
      }
    },
  },

  // 货币交易
  symbol: {
    list: '货币种类列表',
    from: '货币种类操作',
    view: '查看货币种类',

    market: '交易所名称',
    symbol: '交易对',
    base_currency: '基础币种',
    quote_currency: '报价币种',
    content: '交易对介绍',
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
