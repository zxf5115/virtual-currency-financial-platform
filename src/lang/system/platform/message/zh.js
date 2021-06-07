export const message = {
  list: '消息列表',
  from: '消息操作',
  title: '消息标题',
  content: '消息内容',
  receiver: '接收者',
  author: '发送者',
  type: '消息类型',
  send_time: '发送时间',

  user: '用户',
  role: '角色',
  accept_type: '接收类型',
  accept_user: '接收用户',
  accept_role: '接收角色',
  rules: {
    title: {
      require: '标题不能为空',
      length: '长度在 1 到 100 个字符',
    },
    type: {
      require: '消息类型不能为空',
    },
    content: {
      require: '内容不能为空',
      length: '长度在 1 到 1000 个字符',
    },
    accept: {
      require: '接受者不能为空',
    },
  },
}
