export const goods = {
  list: '商品列表',
  from: '商品操作',
  view: '查看商品',
  create: '新建商品',

  title: '商品名字',
  cover: '商品封面',
  picture: '商品图片',
  description: '商品描述',
  content: '商品详情',
  lollipop_total: '棒棒糖兑换(个)',
  cash_money: '现金价格(元)',
  exchange_total: '已兑换(个)',
  status: '商品状态',

  enable: '上架',
  disable: '下架',

  rules: {
    title: {
      require: '商品名字不能为空',
    },
    cover: {
      require: '商品封面不能为空',
    },
    description: {
      require: '商品描述不能为空',
    },
    content: {
      require: '商品详情不能为空',
    },
    lollipop_total: {
      require: '棒棒糖兑换数不能为空',
    },
    cash_money: {
      require: '现金价格不能为空',
    },
  },
}
