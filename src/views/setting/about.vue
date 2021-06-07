<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('config.agreement.about') }}
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('config.agreement.name')" prop="name">
            <el-input v-model="dataForm.name" :placeholder="$t('common.please_input')+$t('config.agreement.name')"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('config.agreement.content')">
            <div id="content"></div>
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
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  export default {
    extends: common,
    components: {
      Vditor
    },
    data() {
      return {
        model: 'setting/about',
        upload_headers:{},
        contentEditor: '',
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
          url: this.$http.adornUrl(`/setting/about`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.name = data.data.name
            this.contentEditor.setValue(data.data.content)
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/setting/about`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'content': this.contentEditor.getValue(),
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
      initContentVditor () {
        this.contentEditor = new Vditor("content",{
          multiple: false,
          height: 400,
          "mode": "sv",
          "preview": {
            "mode": "both"
          },
          toolbarConfig:{
            pin:true
          },
          cache:{
            enable:false
          }
        })
      },
    },
    created(request)
    {
      this.init();
    },
    mounted () {
      this.initContentVditor();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
