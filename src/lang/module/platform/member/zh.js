export const member = {
  list: '会员列表',
  from: '会员操作',
  info: '会员信息',
  view: '会员详情',
  delete: '删除会员',
  export: '导出会员',
  archive_info: '会员档案',
  vip_info: '贵宾信息',
  asset_info: '资金信息',
  social_info: '社交信息',
  certification_info: '认证信息',
  certification_personal: '个人认证',
  certification_company: '企业认证',
  certification_project: '项目认证',
  certification_status: '认证状态',
  certification_content: '认证意见',

  member_no: '会员ID',
  avatar: '会员头像',
  username: '登录账户',
  mobile: '手机',
  email: '邮箱',
  nickname: '会员昵称',
  vip_title: '会员类型',
  vip_end_time: '到期时间',
  asset_money: '账户余额',

  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  push: 'APP推送',
  push_course: '课程推送',
  push_activity: '活动推送',

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
    info: '会员档案',

    sex: '会员性别',
    attention_total: '关注总数',
    fans_total: '粉丝总数',
    approval_total: '点赞总数',
    accepted_total: '获赞总数',
    city: '所在城市',
    area: '地区',
    address: '详细地址',


    rules: {
      member_id: {
        require: '会员昵称不能为空',
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
    'answer_content': '会员答案',
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

  certification: {
    personal: {
      id_card_front_picture: '身份证正面照片',
      id_card_behind_picture: '身份证反面照片',
    },
    company: {
      company_name: '企业名称',
      business_license_no: '营业执照号',
      business_license_picture: '营业执照图片',
    },
    project: {
      project_name: '项目名称',
      project_logo: '项目logo',
      realname: '联系人',
      mobile: '联系人手机号',
      project_category: '项目分类',
      project_website: '项目官网',
      project_document: '白皮书地址',
      project_social: '社交媒体',
      project_report: '审计报告',
      project_github: 'github地址',
    },
  }
}
