<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('setting.center') }}
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(v, k) in configList" :label="v.name" :name="'active'+k" :key="k" :data="v.id" :lazy="true">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                {{ v.content }}
              </div>
              <div class="text item color">
                <form-component :category_id="category_id"></form-component>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script>
  import formComponent from "@/views/common/component/form-component";
  export default {
    components: {
      formComponent
    },
    data() {
      return {
        activeName: 'active0',
        configList: [],
        category_id: 1,
      };
    },
    methods: {
      loadConfigList() {
        this.$http({
          url: this.$http.adornUrl('/config/category/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.configList = data.data
            this.category_id = data.data[0].id || 0
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handleClick(tab, event) {
        this.category_id = tab.$attrs.data || 0
      },
    },
    created(request)
    {
      this.loadConfigList();
    }
  };
</script>
