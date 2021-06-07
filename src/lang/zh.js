import  {common}  from './system/platform/common/zh'
import  {login}  from './system/platform/login/zh'
import  {user}  from './system/platform/user/zh'
import  {menu}  from './system/platform/menu/zh'
import  {message}  from './system/platform/message/zh'
import  {config}  from './system/platform/config/zh'
import  {setting}  from './system/platform/setting/zh'
import  {log}  from './system/platform/log/zh'




// ---------------------------------------
// 模块

import  {organization}  from './module/platform/organization/zh'
import  {squad}  from './module/platform/organization/squad/zh'

import  {member}  from './module/platform/member/zh'
import  {teacher}  from './module/platform/teacher/zh'

import  {production}  from './module/platform/production/zh'
import  {template}  from './module/platform/template/zh'

import  {advertising}  from './module/platform/advertising/zh'
import  {course}  from './module/platform/education/course/zh'
import  {courseware}  from './module/platform/education/courseware/zh'

import  {order}  from './module/platform/order/zh'

import  {goods}  from './module/platform/goods/zh'

import  {complain}  from './module/platform/complain/zh'

import  {financial}  from './module/platform/financial/zh'

import  {problem}  from './module/platform/common/problem/zh'

export default {

  // 公共
  common: {
    ...common
  },

  // 登录
  login: {
    ...login
  },

  // 用户
  user: {
    ...user
  },

  // 菜单
  menu: {
    ...menu
  },

  // 消息
  message: {
    ...message
  },

  // 配置
  config: {
    ...config
  },

  // 设置
  setting: {
    ...setting
  },

  // 日志
  log: {
    ...log
  },

  // ------------------------------------

  // 广告
  advertising: {
    ...advertising
  },

  // 机构
  organization: {
    ...organization
  },

  // 学员
  member: {
    ...member
  },

  // 作品
  production: {
    ...production
  },

  // 模板
  template: {
    ...template
  },

  // 老师
  teacher: {
    ...teacher
  },

  // 课程
  course: {
    ...course
  },

  // 课件
  courseware: {
    ...courseware
  },

  // 班级
  squad: {
    ...squad
  },

  // 订单
  order: {
    ...order
  },

  // 商品
  goods: {
    ...goods
  },

  // 投诉
  complain: {
    ...complain
  },

  // 财务
  financial: {
    ...financial
  },

  // 常见问题
  problem: {
    ...problem
  }
}
