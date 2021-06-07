<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">{{code}}</h2>
        <p class="not-found-desc">{{desc}}</p>
        <el-button @click="$router.go(-1)">
          {{ $t('common.back_prev_page') }}
        </el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="$router.push({ name: 'home' })">
          {{ $t('common.enter_home') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      code: {
        default: '500'
      },
      desc: {
        default: '抱歉，服务器出错了',
      }
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--not-found {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    .site-content__wrapper {
      padding: 0;
      margin: 0;
      background-color: #fff;
    }
    .site-content {
      position: fixed;
      top: 20%;
      left: 50%;
      z-index: 2;
      padding: 30px;
      text-align: center;
      transform: translate(-50%, 0);
    }
    .not-found-title {
      margin: 20px 0 15px;
      font-size: 10em;
      font-weight: 400;
      color: rgb(55, 71, 79);
    }
    .not-found-desc {
      margin: 0 0 30px;
      font-size: 26px;
      text-transform: uppercase;
      color: rgb(118, 131, 143);
      > em {
        font-style: normal;
        color: #ee8145;
      }
    }
    .not-found-btn-gohome {
      margin-left: 30px;
    }
  }
</style>
