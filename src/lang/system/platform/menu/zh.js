export const menu = {
  list: '菜单列表',
  from: '菜单操作',

  title: '菜单标题',
  content: '菜单描述',
  parent_title: '上级菜单',
  icon: '菜单图标',
  category: '菜单分类',
  type: '菜单类型',
  url: '菜单地址',
  is_hidden: '是否隐藏',

  rules: {
    title: {
      require: '菜单名称不能为空',
      length: '长度在 1 到 50 个字符',
    },
    url: {
      require: '菜单地址不能为空',
    },
  },
}
