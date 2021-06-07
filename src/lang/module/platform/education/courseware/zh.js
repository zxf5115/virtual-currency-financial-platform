export const courseware = {
  list: '课件列表',
  from: '课件操作',
  view: '课件详情',
  level_info: '课件级别',

  title: '课件名称',
  description: '课件介绍',
  is_permanent: '是否永久',
  time_limit: '课件限时',
  sort: '课件排序',
  enable: '启用',
  disable: '停用',

  permanent: '永久',
  cycle: '限时',

  rules: {
    title: {
      require: '课件名称不能为空',
      length: '课件名称最大长度为20',
    }
  },

  level: {
    list: '课件级别列表',
    from: '课件级别操作',
    view: '课件级别详情',
    unit_info: '课件单元',

    level: '课件级别',
    minimum_age: '最小年龄',
    largest_age: '最大年龄',
    description: '课件级别介绍',
    enable: '启用',
    disable: '停用',

    rules: {
      minimum_age: {
        require: '最小年龄不能为空',
      },
      largest_age: {
        require: '最大年龄不能为空',
      },
    },

    unit: {
      list: '单元列表',
      from: '单元操作',
      view: '单元详情',
      point_info: '课件知识点',

      title: '单元标题',
      description: '单元介绍',
      picture: '单元封面',
      total: '视频数量',
      sort: '单元排序',

      rules: {
        title: {
          require: '单元标题不能为空',
        },
        picture: {
          require: '单元封面不能为空',
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
      }
    }
  }
}
