<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item, index) of actionList" :key="index" :timestamp="item.create_time" placement="top">
        <el-card>
          <p>
            <el-icon class="el-icon-link" />
            {{ $t('user.center.login.ip') }}：{{ item.ip_address }}
          </p>
          <p>
            <el-icon class="el-icon-location-outline" />
            {{ $t('user.center.login.location') }}：{{ item.address }}
          </p>
          <p>
            <el-icon class="el-icon-bangzhu" />
              {{ $t('user.center.login.browser') }}：{{ item.browser }}
            </p>
          <p>
            <el-icon class="el-icon-monitor" />
            {{ $t('user.center.login.system') }}：{{ item.system }}
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'user',
        actionList: []
      };
    },
    methods: {
      loadActionList () {
        this.$http({
          url: this.$http.adornUrl('/user/action'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.actionList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    mounted () {
      this.loadActionList();
    },
  };
</script>
<style lang="scss" scoped>
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  .el-card {
    border: 1px solid #f1f1f1;
    border-radius: 2px;
  }
  .block p {
    margin: 10px 0;
  }
</style>
