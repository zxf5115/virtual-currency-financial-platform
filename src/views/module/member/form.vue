<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.from') }}</div>
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

          <el-form-item :label="$t('member.avatar')" prop="avatar">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.avatar" :src="dataForm.avatar" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('member.username')" prop="username">
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('member.username')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.audit_status')" prop="audit_status">
            <el-switch v-model="dataForm.audit_status" :active-value="1" :active-text="$t('common.pass')" :inactive-value="2" :inactive-text="$t('common.no_pass')">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:member:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'member',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          avatar: '',
          username: '',
          nickname: '',
          audit_status: 1,
        },
        dataRule:
        {
          username: [
            { required: true, message: this.$t('user.rules.username.require'), trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: this.$t('user.rules.nickname.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.avatar       = data.data.avatar
                this.dataForm.username     = data.data.username
                this.dataForm.nickname     = data.data.nickname
                this.dataForm.audit_status = data.data.audit_status.value
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
              url: this.$http.adornUrl(`/member/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'avatar': this.dataForm.avatar,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'audit_status': this.dataForm.audit_status,
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

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
  };
</script>
