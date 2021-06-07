export const squad = {
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
