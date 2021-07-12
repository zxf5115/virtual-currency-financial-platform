export const community = {
  list: '社区列表',
  from: '社区操作',
  view: '查看社区',

  title: '社区标题',
  picture: '社区封面',
  content: '社区内容',
  author: '社区作者',
  is_hot: '是否热门',
  is_recommend: '是否推荐',

  enable: '热门',
  disable: '普通',

  rules: {
    category_id: {
      require: '社区分类不能为空',
    },
    title: {
      require: '社区标题不能为空',
    },
    content: {
      require: '社区内容不能为空',
    }
  },

  // 社区分类
  category: {
    list: '社区分类列表',
    from: '社区分类操作',

    symbol: '所属交易对',
    title: '社区分类标题',

    rules: {
      title: {
        require: '社区分类标题不能为空',
      }
    },
  },
}
