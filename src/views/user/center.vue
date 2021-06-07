<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <user-info />
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane :label="$t('user.center.account.title')" name="account">
              <account />
            </el-tab-pane>
            <el-tab-pane :label="$t('user.center.password.title')" name="password">
              <password />
            </el-tab-pane>
            <el-tab-pane :label="$t('user.center.login.title')" name="timeline">
              <timeline />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import UserInfo from '@/components/UserCenter/UserInfo'
  import Account from '@/components/UserCenter/Account'
  import Password from '@/components/UserCenter/Password'
  import Timeline from '@/components/UserCenter/Timeline'
  export default {
    extends: common,
    components: { UserInfo, Account, Password, Timeline },
    data() {
      return {
        model: 'user',
        activeTab: '',
      };
    },
    created() {
      this.activeTab = 'account'
    },
  };
</script>
