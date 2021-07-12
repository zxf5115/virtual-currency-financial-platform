export const information = {
  list: '资讯列表',
  from: '资讯操作',
  view: '查看资讯',
  comment_info: '评论',
  similar_info: '关联资讯',

  title: '资讯标题',
  picture: '资讯封面',
  content: '资讯内容',
  source: '资讯来源',
  author: '资讯作者',
  read_total: '阅读总数',
  is_top: '是否置顶',
  is_recommend: '是否推荐',
  is_comment: '是否评论',

  enable: '已推荐',
  disable: '未推荐',

  rules: {
    category_id: {
      require: '资讯分类不能为空',
    },
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
  // 资讯敏感词
  sensitive: {
    list: '敏感词列表',
    from: '敏感词操作',

    title: '敏感词标题',

    rules: {
      title: {
        require: '敏感词标题不能为空',
      }
    },
  },
  // 评论
  comment: {
    content: '评论内容',
    nickname: '发表人',
    create_time: '发表时间',
  }
}
