export const order = {

  course: {
    list: '课程订单列表',
    view: '查看课程订单',

    basic_info: '订单信息',
    address_info: '收货信息',
    course_present_info: '购课礼包',

    order_no: '订单号',
    nickname: '购买用户',
    username: '购买账号',
    pay_money: '实付金额(元)',
    pay_type: '支付类型',
    send: '发货',
    pay_status: '支付状态',
    order_status: '礼包状态',
    create_time: '支付时间',
    money_total: '课程收入(元):',
    description: '礼包发货后，获取运单状态',

    logistics: {
      info: '物流信息',

      present_name: '礼包名称',
      semester: '礼包周期',
      company_name: '快递公司',
      logistics_no: '运单号',
      logistics_status: '运单状态',
      create_time: '发货时间',

      rules: {
        present_name: {
          require: '礼包名称不能为空',
        },
        semester: {
          require: '礼包周期不能为空',
        },
        company_name: {
          require: '快递公司不能为空',
        },
        logistics_no: {
          require: '运单号不能为空',
        },
      },
    }
  },


  goods: {
    list: '商品订单列表',
    view: '查看商品订单',

    basic_info: '订单信息',
    address_info: '收货信息',
    logistics_info: '快递信息',

    order_no: '订单号',
    nickname: '购买用户',
    username: '购买账号',
    lollipop_total: '实付棒棒糖(个)',
    pay_money: '实付金额(元)',
    pay_type: '支付类型',
    exchange_type: '兑换方式',
    send: '发货',
    pay_status: '支付状态',
    order_status: '订单状态',
    create_time: '支付时间',
    money_total: '商品收入(元):',
    description: '礼包发货后，获取运单状态',

    logistics: {
      info: '物流信息',

      present_name: '礼包名称',
      semester: '礼包周期',
      company_name: '快递公司',
      logistics_no: '运单号',
      logistics_status: '运单状态',
      create_time: '发货时间',

      rules: {
        present_name: {
          require: '礼包名称不能为空',
        },
        semester: {
          require: '礼包周期不能为空',
        },
        company_name: {
          require: '快递公司不能为空',
        },
        logistics_no: {
          require: '运单号不能为空',
        },
      },
    }
  },
}
