<template>
  <!-- 面包屑 -->
  <transition name="el-fade-in">
    <div class="right_head_mbx">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(v,k) in name" :key="k">{{v}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </transition>
</template>

<script>
  export default {
    data(){
      return{
        url: '',
        name:['控制台'],
      }
    },
    watch: {
      $route(to) {
        let _this = this;
        this.$http({
          url: _this.$http.adornUrl(`/menu/track`),
          method: 'post',
          params: { url: to.path }
        }).then(({data}) => {
          _this.name = []

          if (data && data.status === 200) {
            data.data.forEach(item => {
              _this.name.push(item);
            });
          }
        })
      }
    },
    methods: {
      getBreadNav() {
        let _this = this;
        this.$http({
          url: _this.$http.adornUrl(`/menu/track`),
          method: 'post',
          params: { url: this.$route.path }
        }).then(({data}) => {
          _this.name = []

          if (data && data.status === 200) {
            data.data.forEach(item => {
              _this.name.push(item);
            });
          }
        })
      }
    },
    mounted() {
      this.getBreadNav()
    }
  };
</script>

<style scoped>
.right_head_mbx{background: #fff;height: 50px;display: block;border-bottom: 1px solid #efefef !important;line-height: 50px;}
.right_head_mbx::after{display: block;clear:both;content:''}
.right_head_mbx .el-breadcrumb{margin-left: 30px;font-size: 12px;}
.right_head_mbx .el-breadcrumb .el-breadcrumb__item{line-height: 50px;}

</style>
