export const flash = {
  list: '快讯列表',
  from: '快讯操作',
  view: '查看快讯',

  title: '快讯标题',
  content: '快讯内容',
  bullish_total: '利多总数',
  bearish_total: '利空总数',
  is_recommend: '是否推荐',
  audit_status: '审核状态',
  admin: '上传人',

  rules: {
    title: {
      require: '快讯标题不能为空',
    },
    content: {
      require: '快讯内容不能为空',
    }
  },

  // 快讯分类
  category: {
    list: '快讯分类列表',
    from: '快讯分类操作',
    title: '快讯分类标题',

    rules: {
      title: {
        require: '快讯分类标题不能为空',
      }
    },
  },
}
