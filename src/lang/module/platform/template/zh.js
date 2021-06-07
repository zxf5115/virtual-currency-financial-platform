export const template = {
  list: '模板列表',
  from: '模板操作',
  create: '添加模板',
  view: '查看模板',

  title: '模板名称',
  picture: '模板图片',
  left_top: '左上坐标点',
  left_bottom: '左下坐标点',
  right_top: '右上坐标点',
  right_bottom: '右下坐标点',
  input: '请使用英文逗号进行分隔0,0',

  rules: {
    title: {
      require: '模板名称不能为空',
    },
    picture: {
      require: '模板图片不能为空',
    },
    left_top: {
      require: '左上坐标点不能为空',
    },
    left_bottom: {
      require: '左下坐标点不能为空',
    },
    right_top: {
      require: '右上坐标点不能为空',
    },
    right_bottom: {
      require: '右下坐标点不能为空',
    }
  }
}
