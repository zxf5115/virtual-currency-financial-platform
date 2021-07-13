<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('currency.symbol.from') }}</div>
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
          <el-form-item :label="$t('currency.symbol.symbol')" prop="symbol">
            <el-input :placeholder="$t('currency.symbol.symbol')" v-model="dataForm.symbol"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.symbol.base_currency')" prop="base_currency">
            <el-input :placeholder="$t('currency.symbol.base_currency')" v-model="dataForm.base_currency"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.symbol.quote_currency')" prop="quote_currency">
            <el-input :placeholder="$t('currency.symbol.quote_currency')" v-model="dataForm.quote_currency"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('courseware.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:currency:symbol:handle')" type="primary" @click="dataFormSubmit()">
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
  export default
  {
    extends: common,
    components: {
      Editor
    },
    data()
    {
      return {
        model: 'currency',
        dataForm:
        {
          id: 0,
          symbol: '',
          base_currency: '',
          quote_currency: '',
          content: '',
          sort: 0,
        },
        dataRule:
        {
          symbol: [
            { required: true, message: this.$t('currency.symbol.rules.symbol.require'), trigger: 'blur' },
          ],
          base_currency: [
            { required: true, message: this.$t('currency.symbol.rules.base_currency.require'), trigger: 'blur' },
          ],
          quote_currency: [
            { required: true, message: this.$t('currency.symbol.rules.quote_currency.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/currency/symbol/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.symbol         = data.data.symbol
                this.dataForm.base_currency  = data.data.base_currency
                this.dataForm.quote_currency = data.data.quote_currency
                this.dataForm.content        = data.data.content
                this.dataForm.sort           = data.data.sort
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
              url: this.$http.adornUrl(`/currency/symbol/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'symbol': this.dataForm.symbol,
                'base_currency': this.dataForm.base_currency,
                'quote_currency': this.dataForm.quote_currency,
                'content': this.$refs.editor.content,
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
