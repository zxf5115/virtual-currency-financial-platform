export const organization = {
  list: '机构列表',
  from: '机构操作',
  view: '机构详情',
  export: '导出机构',
  info: '机构信息',
  audit: '机构审核',

  title: '机构名称',
  head: '负责人',
  home_address: '所在地',
  head_mobile: '负责人电话',
  squad_total: '班级数量',
  member_total: '学员数量',
  course_total: '购买课程数量',
  contact: '联系人',
  contact_mobile: '联系人电话',
  email: '邮箱',
  weixin: '微信',
  qq: 'QQ',
  address: '机构地址',
  logo: '机构Logo',
  certification_status: '认证状态',
  audit_status: '审核状态',
  create_time: '注册时间',

  course_info: '课程信息',
  open_squad_info: '所开班级',
  graduation_squad_info: '结业班级',

  content: '审核备注',

  rules: {
    title: {
      require: '机构名称不能为空',
    },
    head: {
      require: '负责人不能为空',
    },
    logo: {
      require: '机构Logo不能为空',
    }
  },

  squad: {
    list: '班级列表',
    from: '班级操作',
    view: '班级详情',
    create: '新建班级',

    organization_info: '机构信息',
    squad_info: '班级信息',




    name_list: '班级花名册',

    info: '班级信息',
    squad_no: '班级ID',
    title: '班级名称',
    teacher_name: '班主任',
    start_stop_time: '起止时间',
    start_time: '开班时间',
    end_time: '结业时间',
    description: '培训计划',
    course_list: '培训科目',
    number: '班级人数',
    status: '班级状态',
    create_time: '添加时间',

    rules: {
      teacher_id: {
        require: '班主任不能为空',
      },
      title: {
        require: '班级名称不能为空',
      },
      valid_time: {
        require: '起止时间不能为空',
      },
      description: {
        require: '培训计划不能为空',
      },
      number: {
        require: '班级人数不能为空',
      },
    }

  }
}
