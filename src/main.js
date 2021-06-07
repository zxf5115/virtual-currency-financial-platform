import Vue from 'vue'
import App from './App'
import router from './router'

    //引入 Froala Editor js file.
　　require('froala-editor/js/froala_editor.pkgd.min')
　　//引入中文语言包
　　require('froala-editor/js/languages/zh_cn')
　　//引入 Froala Editor css files.
　　require('froala-editor/css/froala_editor.pkgd.min.css')
　　require('font-awesome/css/font-awesome.css')
　　require('froala-editor/css/froala_style.min.css')

　　// Import and use Vue Froala lib.
　　import jQuery from 'jquery'
　　import VueFroala from 'vue-froala-wysiwyg'
　　window.$ = jQuery
　　Vue.use(VueFroala)



import i18n from './lang'
import VueCookie from 'vue-cookie'
import store from './store'
import { isAuth } from './utils/auth'
import httpRequest from './utils/httpRequest'
import ElTreeGrid from 'element-tree-grid'
import Icon from 'vue2-svg-icon/Icon'
import 'babel-polyfill' // 兼容IE

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui'
Vue.use(Element)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };


Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法


Vue.use(VueCookie, {
  i18n: (key, value) => i18n.t(key, value)
})


Vue.component('icon',Icon);

Vue.component(ElTreeGrid.name,ElTreeGrid)

Vue.config.productionTip = false


import audio from 'vue-mobile-audio'
Vue.use(audio)

// 跳转后返回顶部
router.afterEach(() => {
    window.scrollTo(0,0);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})

