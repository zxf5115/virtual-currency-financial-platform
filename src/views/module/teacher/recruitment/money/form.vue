<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('teacher.money.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_teacher_recruitment_view', query: {id: dataForm.money_id}})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('teacher.money.money')">
            {{ dataForm.money }}
          </el-form-item>

          <el-form-item :label="$t('teacher.money.type')">
            {{ dataForm.type }}
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:teacher:recruitment:money:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('teacher.settlement') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'teacher/recruitment/money/extract',
        dataForm:
        {
          id: 0,
          money_id: 0,
          money: '',
          type: ''
        },
        dataRule: {}
      };
    },
    methods: {
      init ()
      {
        this.dataForm.money_id = this.$route.query.money_id

        this.$http({
          url: this.$http.adornUrl(`/teacher/recruitment/money/view/${this.dataForm.money_id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.money = data.data.wait_money
            this.dataForm.type  = '线下结算'
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/teacher/recruitment/money/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.money_id
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
      }
    },
    created() {
      this.init();
    }
  };
</script>
