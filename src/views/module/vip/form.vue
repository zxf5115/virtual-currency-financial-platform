<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('vip.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="140px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('vip.title')" prop="title">
            <el-input :placeholder="$t('vip.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('vip.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item :label="$t('vip.money')" prop="money">
            <el-input-number :min="0" :precision="2" :step="1" :placeholder="$t('vip.money')" v-model="dataForm.money"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('vip.valid_time')" prop="valid_time">
            <el-input-number :min="1" :placeholder="$t('vip.valid_time')" v-model="dataForm.valid_time"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:vip:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
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
    data()
    {
      return {
        model: 'vip',
        dataForm:
        {
          id: 0,
          title: '',
          content: '',
          money: 0,
          valid_time: 1,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('vip.rules.title.require'), trigger: 'blur' },
          ],
          money: [
            { required: true, message: this.$t('vip.rules.money.require'), trigger: 'blur' },
          ],
          valid_time: [
            { required: true, message: this.$t('vip.rules.valid_time.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/vip/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title       = data.data.title
                this.dataForm.content     = data.data.content
                this.dataForm.money       = data.data.money
                this.dataForm.valid_time  = data.data.valid_time
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {console.log(1);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/vip/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'content': this.$refs.editor.content,
                'money': this.dataForm.money,
                'valid_time': this.dataForm.valid_time,
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
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      }
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
