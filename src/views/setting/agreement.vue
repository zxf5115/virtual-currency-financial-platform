<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('config.agreement.user') }}
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('config.agreement.name')" prop="name">
            <el-input v-model="dataForm.name" :placeholder="$t('common.please_input')+$t('config.agreement.name')"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('config.agreement.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('setting:agreement')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Editor from "@/components/form/editor"
  export default {
    extends: common,
    components: {
      Editor
    },
    data() {
      return {
        model: 'setting/agreement',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          name: '',
          content : '',
        },
        dataRule:
        {
          name: [
            { required: true, message: this.$t('config.agreement.rules.name.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      init ()
      {
        this.$http({
          url: this.$http.adornUrl(`/setting/agreement`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.name = data.data.name
            this.dataForm.content     = data.data.content
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/setting/agreement`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'content': this.$refs.editor.content,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
    },
    created(request)
    {
      this.init();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
