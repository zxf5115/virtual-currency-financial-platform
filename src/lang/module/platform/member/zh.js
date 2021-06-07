export const member = {
  list: '学员列表',
  from: '学员操作',
  info: '学员信息',
  view: '学员详情',
  delete: '删除学员',
  export: '导出学员',
  archive_info: '学员档案',
  view_order: '查看订单',
  course_production: '课程作品',
  upload_finish: '已上传',
  upload_wait: '未上传',

  member_no: '学员ID',
  avatar: '宝宝头像',
  username: '登录账户',
  mobile: '手机',
  email: '邮箱',
  nickname: '宝宝昵称',

  red_envelope: '红包金额',
  lollipop: '棒棒糖',
  production: '累计作品',

  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  freeze: '冻结',
  thaw: '解冻',

  role: {
    list: '身份列表',
    from: '身份操作',
    title: '身份名称',
    content: '身份描述',
    distribution: '分配身份',

    menu: '菜单权限',
    interface: '接口权限',

    rules: {
      title: {
        require: '身份名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
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

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '学员档案',

    sex: '宝宝性别',
    age: '宝宝年龄',
    weixin: '微信号',
    birthday: '宝宝生日',
    city: '所在城市',
    area: '地区',
    address: '详细地址',



    // study_type: '订单编号',
    // study_type: '购买课程',
    // start_time: '课程周期',
    // end_time: '开课时间',
    // course_study_time: '购课金额',
    // course_study_time: '购买时间',

    rules: {
      member_id: {
        require: '学员昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  },

  homework: {
    'answer_time': '完成时间',
    'answer_content': '学员答案',
    'answer_result': '老师批复',
    'answer_remark': '老师建议',
  },


  address: {
    list: '收货地址列表',
    from: '收货地址操作',
    view: '收货地址详情',

    name: '收货人姓名',
    mobile: '联系电话',
    province: '省',
    city: '市',
    county: '县',
    address: '收货地址',
  },

  account: {
    payment_name: '支付宝姓名',
    payment_account: '支付宝账号',
  }
}
