export const user = {
  list: '管理员列表',
  from: '管理员操作',

  create: '添加管理员',
  update: '修改管理员',
  view: '管理员详情',
  delete: '删除管理员',
  export: '导出管理员',
  reset: '重置密码',
  change: '修改密码',

  nickname: '用户姓名',
  avatar: '用户头像',
  account: '登录账户',
  username: '登录账户',
  realname: '真实名称',
  email: '联系邮箱',
  mobile: '联系号码',
  status: '用户状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  please_mobile: '请使用手机号作为用户账号',

  rules: {
    username: {
      require: '登录账户不能为空',
      length: '长度在 1 到 32 个字符',
    },
    nickname: {
      require: '用户昵称不能为空',
      length: '长度在 1 到 32 个字符',
    },
    email: {
      format: '邮箱格式错误',
    },
    mobile: {
      format: '手机号码格式错误',
    },
    role: {
      require: '角色不能为空',
    },
  },

  password: {
    from: '密码修改',

    old_password: '当前密码',
    password: '新密码',
    password_confirmation: '确认密码',
    please_old_password: '请输入当前登录密码',
    rules: {
      old_password: {
        require: '当前登录密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password: {
        require: '新密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password_confirmation: {
        require: '确认密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
    }
  },

  role: {
    list: '角色列表',
    from: '角色操作',
    title: '角色名称',
    content: '角色描述',
    distribution: '分配角色',

    menu: '菜单权限',
    interface: '接口权限',

    rules: {
      title: {
        require: '角色名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
    },
  },

  center: {
    title: '用户信息',
    description: '用户描述',

    account: {
      title: '个人信息',
    },
    password: {
      title: '个人密码'
    },
    login: {
      title: '登录记录',

      browser: '浏览器',
      system: '登录系统',
      location: '登录地点',
      ip: 'IP',
    }
  }
}
