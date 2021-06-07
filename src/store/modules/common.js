export default {
  namespaced: true,
  state: {
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false
  },
  mutations: {
    updateContentIsNeedRefresh (state, status) {
      state.contentIsNeedRefresh = status
    }
  }
}
