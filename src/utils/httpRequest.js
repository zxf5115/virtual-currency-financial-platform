import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import router from '@/router'
import merge from 'lodash/merge'
import {Message} from 'element-ui';

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // 获取localStorage 内token
  const token = localStorage.getItem('token');

  if(!isEmpty(token))
  {
    config.headers['Authorization'] = 'Bearer '+token; // 如果token 存在则携带token访问
  }

  return config;

}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  // 对响应数据做点什么
  // eslint-disable-next-line no-console
  // console.log(response);
  if(response.status != 200)
  {
    Message.error("请求异常,错误信息："+response.statusText+"！");
  }

  // 如果出现小于0 代表token 失效
  if(response.data.status < 0)
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');

    Message.error(response.data.message);

    let platform = /^\/platform\/+./i
    let store = /^\/store\/+./i

    let fullepath = router.history.current.fullPath;

    if(platform.test(fullepath))
    {
      // 后台就跳转后台
      router.push({ name: 'login' });
    }
    else if(store.test(fullepath))
    {
      // 商家跳转
      router.push('/store/login');
    }
    else
    {
      // 首页
      router.push({ name: 'login' });
    }
  }

  // 如果出现1001 代表接口无权限 失效
  if(response.data.status == 1001)
  {
    Message.error(response.data.message);
  }

  // 1006 代表请求太频繁
  if(response.data.status == 1006)
  {
    return Message.error(response.data.message);
  }

  var auth = response.headers.authorization;

  // 刷新了token 则重新存放
  if(!isEmpty(response.headers.authorization))
  {
    var token = response.headers.authorization.split(" ")[1];
    localStorage.setItem('token',token);
  }

  return response;
}, function (err)
{
  // 如果地址无法请求
  if(isEmpty(err.response))
  {
    Message.error("网络异常，请检查！");
  }

  // 存在状态码
  if (err.response.status)
  {
    switch(err.response.status)
    {
      case 404:
        router.push({ name: '404' });
        break;
      case 405:
        router.push({ name: '405' });
        break;
      case 500:
        Message.error('error_code:500');
        break;
      default:
        Message.error(err.response.statusText+",error_code："+err.response.status);
        break;
    }
  }
  else
  {
    Message.error("未知错误,错误信息："+err.response.statusText+"！");
  }

  // 对响应错误做点什么
  return Promise.reject(err);
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return '/api' + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}


/*判断是否为空*/
export function isEmpty(str)
{
  if(str === '' || str === null || str === undefined)
  {
    return true;
  }

  return false;
}


export default http
