<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <el-tabs v-model="message">
        <el-tab-pane label="未读消息" name="first">
          <unread/>
        </el-tab-pane>

        <el-tab-pane label="已读消息" name="second" lazy>
          <readed/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import unread from '@/components/UserCenter/message/unread'
  import readed from '@/components/UserCenter/message/readed'
  export default {
    extends: common,
    components: { unread, readed },
    data () {
      return {
        message: 'first',
        showHeader: false,
      }
    }
  }
</script>
