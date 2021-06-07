<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <div>{{ $t('user.password.from') }}</div>
          </div>
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

          <el-form-item :label="$t('user.username')" prop="username">
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input')+$t('user.username')" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item :label="$t('user.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input')+$t('user.nickname')" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item :label="$t('user.password.old_password')" prop="old_password">
            <el-input v-model="dataForm.old_password" type="password" show-password :placeholder="$t('user.password.please_old_password')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('user.password.password')" prop="password">
            <el-input v-model="dataForm.password" type="password" show-password :placeholder="$t('common.please_input')+$t('user.password.password')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('user.password.password_confirmation')" prop="password_confirmation">
            <el-input v-model="dataForm.password_confirmation" type="password" show-password :placeholder="$t('common.please_input')+$t('user.password.password_confirmation')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">
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
        model: 'user',
        rolelist: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          username: '',
          old_password: '',
          password: '',
          password_confirmation: '',
          nickname: '',
        },
        dataRule:
        {
          old_password: [
            { required: true, message: this.$t('user.password.rules.old_password.require'), trigger: 'blur' },
            { min: 1, max: 32, message: this.$t('user.password.rules.old_password.length'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: this.$t('user.password.rules.password.require'), trigger: 'blur' },
            { min: 1, max: 32, message: this.$t('user.password.rules.password.length'), trigger: 'blur' }
          ],
          password_confirmation: [
            { required: true, message: this.$t('user.password.rules.password_confirmation.require'), trigger: 'blur' },
            { min: 1, max: 32, message: this.$t('user.password.rules.password_confirmation.length'), trigger: 'blur' }
          ],
        }
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
              url: this.$http.adornUrl(`/user/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.username = data.data.username
                this.dataForm.nickname = data.data.nickname
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
              url: this.$http.adornUrl(`/user/change_password`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'old_password': this.dataForm.old_password,
                'password': this.dataForm.password,
                'password_confirmation': this.dataForm.password_confirmation,
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
    },
    created() {
      this.init();
    },
  };
</script>
