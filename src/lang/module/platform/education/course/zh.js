export const course = {
  list: '课程列表',
  from: '课程操作',
  view: '查看课程',
  create: '新建课程',

  present_info: '课程礼包',
  unlock_info: '课程解锁',
  teacher_info: '课程老师',
  share_info: '分享图片',

  title: '课程名字',
  picture: '课程图片',
  semester: '课程周期',
  description: '优惠说明',
  apply_time: '报名时间',
  course_start_time: '开课时间',
  line_price: '课程原价(元)',
  real_price: '课程价格(元)',
  product_id: '苹果产品编号',
  recruitment: '招生老师',
  management_number: '管理数量',
  apply_number: '报名人数',
  class_size: '管理人数',
  sort: '课程排序',
  content: '课程详情',
  plan: '课程安排',
  level: '课程级别',

  rules: {
    courseware_id:{
      require: '课件名称不能为空',
    },
    title: {
      require: '课程标题不能为空',
    },
    semester: {
      require: '课程周期不能为空',
    },
    apply_time: {
      require: '报名时间不能为空',
    },
    course_start_time: {
      require: '开课时间不能为空',
    },
    line_price: {
      require: '课程原价不能为空',
    },
    real_price: {
      require: '课程价格不能为空',
    },
    class_size: {
      require: '管理人数不能为空',
    },
  },

  present: {
    list: '礼包列表',
    from: '礼包操作',
    view: '礼包详情',

    title: '礼包信息',
    description: '礼包介绍',

    rules: {
      title: {
        require: '礼包名称不能为空',
      }
    }
  },

  unlock: {
    list: '解锁列表',
    from: '解锁操作',
    view: '解锁详情',

    title: '课程解锁',
    section: '解锁章节',
    duration: '解锁时长',

    rules: {
      section: {
        require: '章节不能为空',
      },
      duration: {
        require: '时长不能为空',
      }
    }
  },

  share: {
    list: '分享列表',
    from: '分享操作',
    view: '分享详情',

    picture: '分享图片',
  },

  teacher: {
    list: '老师列表',
    from: '老师操作',
    view: '老师详情',

    sort: '老师排序',

    rules: {
      level_id: {
        require: '课件级别不能为空',
      },
      teacher_id: {
        require: '招聘老师不能为空',
      }
    }
  }
}
