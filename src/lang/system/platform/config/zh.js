export const config = {
  list: '配置列表',
  from: '配置操作',
  name: '配置名称',
  title: '配置标题',
  category_title: '分类标题',
  type: '配置类型',
  value: '配置值',
  params: '配置参数',
  content: '配置描述',

  active: '开启',
  inactive: '关闭',

  rules: {
    name: {
      require: '配置名称不能为空',
      length: '长度在 1 到 50 个字符',
    },
    title: {
      require: '配置标题不能为空',
      length: '长度在 1 到 50 个字符',
    },
    type: {
      require: '配置类型不能为空',
    },
  },

  category: {
    list: '分类列表',
    from: '分类操作',
    create: '添加配置',
    view: '查看配置',
    name: '分类名称',
    title: '分类标题',
    parent_title: '上级分类',
    content: '分类描述',
    depth: '分类层级',
    rules: {
      name: {
        require: '分类名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
      title: {
        require: '分类标题不能为空',
        length: '长度在 1 到 50 个字符',
      }
    },
  },

  agreement: {
    user: '用户协议',
    about: '关于我们',

    name: '协议名称',
    content: '协议内容',
    rules: {
      name: {
        require: '协议名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
      content: {
        require: '协议内容不能为空',
      }
    },
  },
}
