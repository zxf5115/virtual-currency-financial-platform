<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ $t('user.center.title') }}</span>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <el-avatar :size="100" :src="userinfo.avatar">
          <img src="@/assets/images/default/circle.png"/>
        </el-avatar>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ userinfo.nickname }}</div>
        <div class="user-role text-center text-muted">
          <!-- <span>{{ userinfo.mobile }}</span> -->
        </div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><el-icon class="el-icon-tickets" /><span>{{ $t('user.center.description') }}</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <p>
              <el-icon class="el-icon-mobile-phone" />
              {{ $t('user.mobile') }}：{{ userinfo.mobile }}
            </p>
            <p>
              <el-icon class="el-icon-message" />
              {{ $t('user.email') }}：{{ userinfo.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'user',
        userinfo: '',
      };
    },
    created() {
      this.userinfo = JSON.parse(localStorage.getItem('user_info'));
    }
  };
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
   p {
    margin: 10px 0;
   }
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
     text-align:center;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }
   .logo-wrapper {
     display: inline-block;
     margin: 10px 0;
     img {
       width: 1.4rem;
       display: inline-block;
       margin: 0 .6rem;
       cursor: pointer;
       &.unbind {
         -webkit-filter: grayscale(100%);
         -moz-filter: grayscale(100%);
         -o-filter: grayscale(100%);
         filter: grayscale(100%);
       }
       &.radius {
         border-radius: 50%;
       }
     }
   }
   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>
