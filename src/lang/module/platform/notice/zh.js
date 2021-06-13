export const notice = {
  list: '通知列表',
  from: '通知操作',
  view: '查看通知',

  content: '通知内容',

  rules: {
    content: {
      require: '通知内容不能为空',
    },
    category: {
      require: '通知分类不能为空',
    },
  },

  // 通知分类
  category: {
    list: '通知分类列表',
    from: '通知分类操作',
    title: '通知分类标题',

    rules: {
      title: {
        require: '通知分类标题不能为空',
      }
    },
  },
}
