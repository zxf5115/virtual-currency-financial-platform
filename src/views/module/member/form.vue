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

          <el-form-item :label="$t('common.sms_notification')" prop="sms_notification">
            <el-checkbox v-model="dataForm.sms_notification">
              {{ $t('common.send_sms_notification') }}
            </el-checkbox>
          </el-form-item>

          <el-form-item :label="$t('member.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.mobile')" prop="mobile">
            <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input') + $t('member.mobile')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.email')" prop="email">
            <el-input v-model="dataForm.email" :placeholder="$t('common.please_input') + $t('member.email')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.role.title')" class="width_auto">
            <el-checkbox-group v-model="dataForm.role_id" :max=1>
              <el-checkbox v-for="(v,k) in roleList" :key="k" :label="v.id">
                {{v.title}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item :label="$t('member.status')" prop="status">
            <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('common.enable')" inactive-value="2" :inactive-text="$t('common.disable')">
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
        roleList: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          role_id : [],
          avatar: '',
          username: '',
          nickname: '',
          email: '',
          mobile: '',
          status: '1',
          sms_notification: true,
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
                this.dataForm.avatar   = data.data.avatar
                this.dataForm.username = data.data.username
                this.dataForm.nickname = data.data.nickname
                this.dataForm.email    = data.data.email
                this.dataForm.mobile   = data.data.mobile
                this.dataForm.status   = data.data.status.value + ''
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
                'role_id': this.dataForm.role_id,
                'avatar': this.dataForm.avatar,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'mobile': this.dataForm.mobile,
                'email': this.dataForm.email,
                'status': this.dataForm.status,
                'sms_notification': this.dataForm.sms_notification,
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
      loadRoleList () {
        this.$http({
          url: this.$http.adornUrl('/member/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.roleList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.avatar = res.data;
      },
      beforeAvatarUpload(file) {
        const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPicture) {
          var message = this.$t('common.rules.picture.picture_type');
          this.$message.error(this.$t(data.message))
        }
        if (!isLt2M) {
          var message = this.$t('common.rules.picture.picture_size');
          this.$message.error(this.$t(data.message))
        }

        return isPicture && isLt2M;
      },
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
    mounted () {
      this.loadRoleList();
    },
  };
</script>
