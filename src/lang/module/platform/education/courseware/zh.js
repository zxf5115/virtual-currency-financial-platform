export const courseware = {
  list: '课程列表',
  from: '课程操作',
  view: '课程详情',
  point_info: '课程知识点',

  code: '课程编号',
  title: '课程名称',
  course_category: '课程分类',
  teacher_name: '课程讲师',
  picture: '封面图片',
  content: '课程介绍',
  money: '课程价格',
  is_shelf: '是否上架',
  is_trial: '是否试看',
  is_recommend: '是否推荐',
  point_total: '课时(集)',
  sort: '课程排序',
  enable: '启用',
  disable: '停用',

  rules: {
    category_id: {
      require: '课程分类不能为空',
    },
    teacher_id: {
      require: '课程讲师不能为空',
    },
    code: {
      require: '课程编号不能为空',
    },
    title: {
      require: '课程名称不能为空',
    },
    picture: {
      require: '课程封面不能为空',
    },
    money: {
      require: '课程价格不能为空',
    },
  },

  point: {
    list: '知识点列表',
    from: '知识点操作',
    view: '知识点详情',

    title: '知识点名称',
    picture: '知识点封面',
    url: '视频地址',
    sort: '知识点排序',

    rules: {
      title: {
        require: '知识点标题不能为空',
      },
      picture: {
        require: '知识点封面不能为空',
      },
      url: {
        require: '视频地址不能为空',
      },
    },
  },

  // 课程分类
  category: {
    list: '课程分类列表',
    from: '课程分类操作',

    title: '课程分类标题',

    rules: {
      title: {
        require: '课程分类标题不能为空',
      }
    },
  },

  // 课程讲师
  teacher: {
    list: '讲师列表',
    from: '讲师操作',

    title: '讲师姓名',
    mobile: '讲师电话',
    picture: '讲师头像',
    position: '讲师头衔',
    content: '讲师介绍',

    rules: {
      title: {
        require: '讲师姓名不能为空',
      },
      mobile: {
        require: '讲师电话不能为空',
      },
      picture: {
        require: '讲师头像不能为空',
      },
      position: {
        require: '讲师头衔不能为空',
      }
    },
  },
}
