<template>
  <div class="qingwu">
    <!-- 容器本身 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="leftBarWidth">
        <el-scrollbar>
          <!-- LOGO -->
          <div class="head_logo">
            <span>小丑鱼</span>
            <font v-show="isShow">教育平台</font>
          </div>
          <!-- 左侧导航 -->
          <el-menu
            background-color="#000"
            text-color="#fff"
            active-text-color="#409eff"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :unique-opened="true"
            :default-active="defaultActive"
            :router="true">

            <el-menu-item index="0" route="/index">
              <i class="el-custom-icon-console"></i>
              <span slot="title">
                {{ $t('common.console') }}
              </span>
            </el-menu-item>

            <el-submenu :index="v.id+''" v-for="(v,k) in permisssion_menus" :key="k">
              <template slot="title">
                <i :class="v.icon ? 'el-custom-icon-' + v.icon : ''"></i>
                <span slot="title">{{v.title}}</span>
              </template>
              <el-menu-item-group v-if="v.navigation && v.navigation.length>0">
                <el-menu-item v-if="vo.is_hidden == 1" :route="set_url(vo.url)" v-for="(vo,key) in v.navigation" :key="key" :index="vo.id+''">
                  {{vo.title}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-header height="102px">
          <div class="index_top_bg">
            <div class="index_header">
              <i class="el-custom-icon-zoom right_head_i"  :title="$t('common.pack')" @click="left_bar();"></i>
              <i class="el-custom-icon-refresh right_head_i" :title="$t('common.refresh')" @click="refresh()">
              </i>
            </div>

            <div class="head_user">
              <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                  {{user_info.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="head_menu" slot="dropdown">
                  <el-dropdown-item command="center">
                    {{ $t('common.user_center') }}
                  </el-dropdown-item>
                  <el-dropdown-item command="logout" divided>
                    {{ $t('common.logout') }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <div class="avatar">
              <el-avatar :size="30" :src="user_info.avatar">
                <img src="@/assets/images/default/circle.png"/>
              </el-avatar>
            </div>

            <div class="right_head_other">
              <el-link :underline="false">
                <el-tooltip class="clear_cache" effect="dark" :content="$t('common.clear_cache')" placement="bottom-start">
                  <i class="el-custom-icon-clear" @click="clearCache">
                  </i>
                </el-tooltip>
              </el-link>
              <router-link :to="{name: 'user_message_list'}">
                <el-badge :is-dot="this.isUnRead" class="item" id="dot">
                  <i class="el-custom-icon-notice" :title="$t('common.message')">
                  </i>
                </el-badge>
              </router-link>

            </div>
          </div>
          <breadcrumb-nav></breadcrumb-nav>
        </el-header>
        <el-main class="main_in" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
          <el-scrollbar>
            <div class="main_in2" v-if="!loading">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view v-if="!$store.state.common.contentIsNeedRefresh"></router-view>
              </transition>
            </div>
          </el-scrollbar>

        </el-main>
      </el-main>
      <el-backtop target=".main_in .el-scrollbar .el-scrollbar__wrap"></el-backtop>
    </el-container>
  </div>
</template>

<script>
  import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
  export default {
    inject: ['refresh'],
    components: {
      BreadcrumbNav,
    },
    props: {},
    data() {
      return {
        loading: true,
        isCollapse:false, // 侧边栏缩进打开
        leftBarWidth:"200px", // 左侧宽度
        isShow:true, // 显示全部
        isUnRead:false, // 是否存在未读消息
        defaultActive: '0',
        permisssion_menus:[],
        user_info:{},
      };
    },
    watch: {},
    computed: {},
    methods: {
      handleOpen:function(){},
      handleClose:function(){},
      handleCommand:function(e){
        // 点击退出
        if(e == 'logout'){
          this.logout();
        }

        if(e == 'center') {
          this.$router.push({name: 'user_center'});
        }
      },
      left_bar:function() {
        this.isCollapse = !this.isCollapse;

        if(this.isCollapse)
        {
          this.leftBarWidth = "65px";
          this.isShow = false;
        }
        else
        {
          this.leftBarWidth = "200px";
          this.isShow = true;
        }
      },
      getUserInfo:function() {
        let _this = this;
        _this.user_info = JSON.parse(localStorage.getItem('user_info'));
        _this.loading = false
      },
      getPermissionMenus:function(){
        let _this = this;
        _this.permisssion_menus = JSON.parse(localStorage.getItem('menuList'));
      },
      logout:function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/logout`),
          method: 'get',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            localStorage.removeItem('token');
            localStorage.setItem('menuList', '[]');
            localStorage.setItem('permissions', '[]');
            _this.$router.options.isAddDynamicMenuRoutes = false
            _this.$router.push({ name: "login" });
          }
        })
      },
      clearCache:function(){
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/clear`),
          method: 'post',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            _this.$message.success(this.$t('common.finish_clear'));
          }
        })
      },
      getUnreadMessage:function(){
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/user/message/unread`),
          method: 'post',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            _this.isUnRead = data.data ? true : false;
          }
        })
      },
      getCurrentActive:function(){
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/menu/active`),
          method: 'post',
          params: _this.$http.adornParams({
            url: this.$route.path
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            _this.defaultActive = data.data + '' || '0';
          }
        })
      },
      set_url: function(url) {
        if(url.indexOf('/') == 0)
        {
          return url;
        }
        else
        {
          return '/' + url;
        }
      }

    },
    created() {
      this.getUserInfo();
      this.getUnreadMessage();
      this.getCurrentActive();
      this.getPermissionMenus();
    }
  };
</script>

<style lang="scss" scoped>
  .el-main {
    padding: 0;
  }
  .main_in{
    height: calc(100% - 101px);
    background: #f3f3f4;
    width: 100%;
    box-sizing: border-box;
    .el-scrollbar__wrap{
      overflow-x: hidden!important;
    }
    .main_in2{
      padding: 25px;
    }
  }
  .el-menu {
    border-right: none;
    height: 100%;
    .el-submenu__title i{
      color:#e1e1e1;
    }
    .title_i{
      color:#cfcfcf;
      padding-right: 15px;
    }
  }
  .el-menu-item i {
    color: #e1e1e1;
  }
  .is-active i {
    color: #409eff;
  }
  .el-scrollbar{
    height: 100%;
  }
  .el-aside {
    height: 100%;
    overflow: hidden!important;

  }
  .el-container {
    height: 100%;
  }
  .el-header{
    padding: 0;
  }

  .head_logo{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    background:#000;
    color:#fff;
    span{color:#409EFF;}
  }
  .index_top_bg{
    border-bottom: 1px solid #e7eaec!important;
    height: 50px;
    .index_header{
      float: left;
      .right_head_i{line-height: 50px;font-size: 18px;color:#333;margin-left: 30px;}
    }
    .avatar {width: 30px; height: 30px;border-radius: 50%;float: right;margin-top: 10px;}
    .right_head_other{
      float: right;margin-right: 40px;position: relative;
      i{font-size: 20px}
    }
    .head_user{line-height: 50px;float: right;position: relative;margin-left: 10px;margin-right: 30px;}
  }
  .clear_cache{
    line-height: 50px;
    float: left;
    margin-top: 2px;
    margin-right: 20px;
  }
</style>
