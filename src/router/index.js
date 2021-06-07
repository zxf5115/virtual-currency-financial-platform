/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'

Vue.use(Router)



// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('error/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/405', component: _import('error/405'), name: '405', meta: { title: '405错误' } },
  { path: '/500', component: _import('error/500'), name: '500', meta: { title: '500错误' } },
  { path: '/login', component: _import('login'), name: 'login', meta: { title: '登录' } }
 ]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('layout/index'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!

    { path: '/index', component: _import('index'), name: 'home', meta: { title: '首页' } },
    { path: '/user/center', component: _import('user/center'), name: 'user_center', meta: { title: '用户中心' } }
  ],
  beforeEnter (to, from, next) {
    let token = localStorage.getItem("token");
    if (!token || !/\S/.test(token)) {
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");

  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else if(token) {
    http({
      url: http.adornUrl('/user/tree'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.status === 200) {
        fnAddDynamicMenuRoutes(data.data.menu)
        router.options.isAddDynamicMenuRoutes = true
        localStorage.setItem('menuList', JSON.stringify(data.data.menu || '[]'))
        localStorage.setItem('permissions', JSON.stringify(data.data.button || '[]'))
        next({ ...to, replace: true })
      } else {
        localStorage.setItem('menuList', '[]')
        localStorage.setItem('permissions', '[]')
        next('login')
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
  else {
    router.push({ name: 'login' })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = [])
{
  var temp = []

  for (var i = 0; i < menuList.length; i++)
  {
    if (menuList[i].url && /\S/.test(menuList[i].url))
    {
      menuList[i].url = menuList[i].url.replace(/^\//, '')

      var route = {
        path: menuList[i].url,
        component: null,
        name: null
      }

      if(menuList[i].url)
      {
        var reg = new RegExp('/','g')

        route['name'] = menuList[i].url.replace(reg, '_')
      }


      try {
        route['component'] = _import(menuList[i].url)
      }
      catch (e)
      {
        console.log(e);
      }

      routes.push(route)
    }

    if (menuList[i].navigation && menuList[i].navigation.length >= 1)
    {
      temp = temp.concat(menuList[i].navigation)
    }
  }

  if (temp.length >= 1)
  {
    fnAddDynamicMenuRoutes(temp, routes)
  }
  else
  {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    localStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
