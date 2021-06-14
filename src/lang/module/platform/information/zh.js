export const information = {
  list: '资讯列表',
  from: '资讯操作',
  view: '查看资讯',

  title: '资讯标题',
  title: '资讯标题',
  content: '资讯内容',
  source: '资讯来源',
  author: '资讯作者',
  read_total: '阅读总数',

  rules: {
    title: {
      require: '资讯标题不能为空',
    },
    content: {
      require: '资讯内容不能为空',
    }
  },

  // 资讯分类
  category: {
    list: '资讯分类列表',
    from: '资讯分类操作',

    title: '资讯分类标题',

    rules: {
      title: {
        require: '资讯分类标题不能为空',
      }
    },
  },
  // 资讯分类
  label: {
    list: '资讯标签列表',
    from: '资讯标签操作',

    title: '资讯标签标题',

    rules: {
      title: {
        require: '资讯标签标题不能为空',
      }
    },
  },
}
