<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('currency.category.from') }}</div>
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
          <el-form-item :label="$t('currency.category.code')" prop="code">
            <el-input :placeholder="$t('currency.category.code')" v-model="dataForm.code"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.category.title')" prop="title">
            <el-input :placeholder="$t('currency.category.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_hot')" prop="is_hot">
            <el-switch v-model="dataForm.is_hot" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_main')" prop="is_main">
            <el-switch v-model="dataForm.is_main" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_defi')" prop="is_defi">
            <el-switch v-model="dataForm.is_defi" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:currency:category:handle')" type="primary" @click="dataFormSubmit()">
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
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'currency/category',
        dataForm:
        {
          id: 0,
          code: '',
          title: '',
          is_hot: 2,
          is_main: 2,
          is_defi: 2,
          sort: 0,
        },
        dataRule:
        {
          code: [
            { required: true, message: this.$t('currency.category.rules.code.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('currency.category.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/currency/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.code    = data.data.code
                this.dataForm.title   = data.data.title
                this.dataForm.is_hot  = data.data.is_hot.value
                this.dataForm.is_main = data.data.is_main.value
                this.dataForm.is_defi = data.data.is_defi.value
                this.dataForm.sort    = data.data.sort
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/currency/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'code': this.dataForm.code,
                'title': this.dataForm.title,
                'is_hot': this.dataForm.is_hot,
                'is_main': this.dataForm.is_main,
                'is_defi': this.dataForm.is_defi,
                'sort': this.dataForm.sort,
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
    }
  };
</script>
