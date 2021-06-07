<template>
  <div id="apps">
    <router-view></router-view>
  </div>
</template>

<script>
  export default
  {
    name: "app",
    components:{},
    prop:{},
    provide () {
      return {
        // 刷新
        refresh () {
          this.$store.commit('common/updateContentIsNeedRefresh', true)
          this.$nextTick(() => {
            this.$store.commit('common/updateContentIsNeedRefresh', false)
          })
        }
      }
    },
  };
</script>

<style>
  html,body,#app,#apps
  {
    height: 100%;
    margin:0;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  ol,ul {list-style:none}
  a{text-decoration: none;color:#333;}
  .qingwu{height: 100%;}
  .el-input.is-disabled .el-input__inner{
    color: #000;
  }
</style>
