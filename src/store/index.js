import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import system from './modules/system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    system
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
