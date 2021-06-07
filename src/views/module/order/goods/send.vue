<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('order.goods.logistics.info') }}</div>
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
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('order.goods.logistics.company_name')" prop="company_name">
            <el-select v-model="dataForm.company_name" :placeholder="$t('common.please_select')+$t('advertising.position.title')">
              <el-option v-for="(v,k) in expressList" :label="v.title" :key="k" :value="v.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('order.goods.logistics.logistics_no')" prop="logistics_no">
            <el-input :placeholder="$t('common.please_input')+$t('order.goods.logistics.logistics_no')" v-model="dataForm.logistics_no"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:order:goods:logistics:handle')" type="primary" @click="dataFormSubmit()" :disabled="disabled">
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
  export default {
    extends: common,
    data() {
      return {
        model: 'order/goods/logistics',
        expressList: [],
        dataForm:
        {
          id: 0,
          order_id: 0,
          member_id: 0,
          company_name: '',
          logistics_no: '',
        },
        dataRule:
        {
          company_name: [
            { required: true, message: this.$t('order.goods.logistics.rules.company_name.require'), trigger: 'blur' },
          ],
          logistics_no: [
            { required: true, message: this.$t('order.goods.logistics.rules.logistics_no.require'), trigger: 'blur' },
          ]
        },
        disabled: false,
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/order/goods/logistics/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.order_id     = data.data.order_id
                this.dataForm.member_id    = data.data.member_id
                this.dataForm.company_name = data.data.company_name
                this.dataForm.logistics_no = data.data.logistics_no
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.disabled = true

            this.$http({
              url: this.$http.adornUrl(`/order/goods/logistics/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'order_id': this.dataForm.order_id,
                'member_id': this.dataForm.member_id,
                'company_name': this.dataForm.company_name,
                'logistics_no': this.dataForm.logistics_no,
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
      },
      loadExpressList() {
        this.$http({
          url: this.$http.adornUrl('/common/express/company/list'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.expressList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.init();

      this.dataForm.order_id = this.$route.query.order_id;
      this.dataForm.member_id = this.$route.query.member_id;

      this.loadExpressList();
    }
  };
</script>
