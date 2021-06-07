/**
 * 模拟测试结果
 * @param {*} value
 */
export function simulationExamResult (value)
{
  if(84 < value)
  {
    return '优';
  }
  else if(74 < value)
  {
    return '良';
  }
  else if(59 < value)
  {
    return '中';
  }
  else if(1 < value)
  {
    return '差';
  }
  else
  {
    return '无';
  }
}

/**
 * 学习设备类型
 * @param {*} value
 */
export function studyDeviceType (value)
{
  if(1 == value)
  {
    return '电脑端';
  }
  else
  {
    return '移动端';
  }
}

/**
 * 作业回复
 * @param {*} value
 */
export function homeworkResult (value)
{
  if(1 == value)
  {
    return '回答正确';
  }
  else if(2 == value)
  {
    return '回答错误'
  }
  else
  {
    return '待批复';
  }
}

/**
 * 时长
 * @param {*} value
 */
export function datetime (value)
{
  if (0 == value || '' == value)
  {
    return '暂无';
  }

  value = value * 1000;

  let date = new Date(value);

  let y = date.getFullYear();
  let m = date.getMonth() + 1;

  m = m < 10 ? ('0' + m) : m;

  let d = date.getDate();

  d = d < 10 ? ('0' + d) : d;

  let h = date.getHours();

  h = h < 10 ? ('0' + h) : h;

  let minute = date.getMinutes();
  let second = date.getSeconds();

  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;

  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}



/**
 * 时长
 * @param {*} value
 */
export function timeLength (value)
{
  let day = 0
  let hour = 0
  let minutes = 0
  let seconds = 0

  if (0 == value || '' == value)
  {
    return '暂无';
  }

  day = Math.floor(value / (3600 * 24));

  day = day > 0 ? day + ' 天 ' : '';

  hour = Math.floor((value % (3600 * 24)) / 3600);

  hour = hour > 0 ? hour + ' 小时 ' : '';

  minutes = Math.floor(((value % (3600 * 24)) % 3600) / 60);

  minutes = minutes > 0 ? minutes + ' 分钟 ' : '';

  seconds = Math.floor(((value % (3600 * 24)) % 3600 % 60));

  seconds = seconds > 0 ? seconds + ' 秒 ' : '';

  return day + hour + minutes + seconds;
}
