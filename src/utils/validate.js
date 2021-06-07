/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}




export function isvalidUsername(str) {
  const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(str)
}

/* 小写字母*/
export function iseLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function iseUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 大小写字母与数字*/
export function isCaptcha(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
export const isNotEmpty = (obj) => {
  let flag = true
  if (obj === '' || obj == null || obj === undefined || obj === 'undefined') {
    flag = false
  }
  return flag
}




/**
 * 判断是否是图片
 * @param {*} value
 */
export function isPicture (value) {console.log(value);
  return /(.png|.jpg|.jpeg)/.test(value)
}

/**
 * 判断是否是文件
 * @param {*} value
 */
export function isFile (value) {
  return /(.doc|.pdf)/.test(value)
}

/**
 * 判断是否是音频
 * @param {*} value
 */
export function isAudio (value) {
  return /(.mp3)/.test(value)
}

/**
 * 判断是否是视频
 * @param {*} value
 */
export function isVideo (value) {
  return /(.mp4)/.test(value)
}
