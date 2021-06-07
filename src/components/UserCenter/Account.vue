<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

    <el-form-item :label="$t('user.username')" prop="username">
      <el-input v-model="dataForm.username" :placeholder="$t('user.please_mobile')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('common.default_password')">
      <el-tag type="danger">123456</el-tag>
    </el-form-item>

    <el-form-item prop="role_id" :label="$t('user.role.title')" class="width_auto">
      <el-checkbox-group v-model="dataForm.role_id" :max=1>
        <el-checkbox v-for="(v,k) in rolelist" :key="k" :label="v.id">
          {{v.title}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item :label="$t('user.nickname')" prop="nickname">
      <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input')+$t('user.nickname')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('user.avatar')" prop="avatar">
      <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="dataForm.avatar" :src="dataForm.avatar" class="avatar-upload">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item :label="$t('user.mobile')" prop="mobile">
      <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input')+$t('user.mobile')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('user.email')" prop="email">
      <el-input v-model="dataForm.email" :placeholder="$t('common.please_input')+$t('user.email')"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button v-if="isAuth('user:handle')" type="primary" @click="dataFormSubmit()">
        {{ $t('common.confirm') }}
      </el-button>
      <el-button @click="resetForm()">
        {{ $t('common.reset') }}
      </el-button>
    </el-form-item>
  </el-form>
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
          role_id : [],
          username: '',
          nickname: '',
          avatar: '',
          mobile: '',
          email: '',
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
          role_id: [
            { required: true, message: this.$t('user.rules.role.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
        let user_info = JSON.parse(localStorage.getItem('user_info'));

        let id = user_info.id

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
                this.dataForm.avatar   = data.data.avatar
                this.dataForm.mobile   = data.data.mobile
                this.dataForm.email    = data.data.email

                if(data.data.role)
                {
                  let role = data.data.role

                  role.forEach(res=>{
                    this.dataForm.role_id.push(res.id);
                  });
                }
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
              url: this.$http.adornUrl(`/user/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'role_id': this.dataForm.role_id,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'avatar': this.dataForm.avatar,
                'mobile': this.dataForm.mobile,
                'email': this.dataForm.email,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.push({name: 'home'});
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      loadRoleList () {
        this.$http({
          url: this.$http.adornUrl('/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.rolelist = data.data
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
