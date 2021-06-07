export const advertising = {
  list: '广告列表',
  from: '广告操作',

  create: '添加广告',
  view: '查看广告',

  title: '广告标题',
  type: '链接类型',
  link: '广告链接',
  picture: '广告图片',
  url: '广告资源',
  type: '广告类型',
  rules: {
    position_id: {
      require: '广告位标题不能为空',
    },
    title: {
      require: '广告标题不能为空',
    },
    type: {
      require: '广告类型不能为空',
    },
    picture: {
      require: '广告图片不能为空',
    },
  },

  // 广告位
  position: {
    list: '广告位列表',
    from: '广告位操作',
    title: '广告位标题',
    width: '广告位宽度',
    height: '广告位高度',
    is_open: '是否开启',

    rules: {
      title: {
        require: '广告位标题不能为空',
      },
      width: {
        require: '广告位宽度不能为空',
      },
      height: {
        require: '广告位高度不能为空',
      },
    },
  },
}
