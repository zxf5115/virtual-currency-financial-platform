<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('teacher.management.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_teacher_management_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('teacher.management.avatar')" prop="avatar">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.avatar" :src="dataForm.avatar" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('member.username')" prop="username">
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('member.username')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('teacher.management.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('teacher.management.nickname')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('teacher.management.id_card_no')" prop="id_card_no">
            <el-input v-model="dataForm.id_card_no" :placeholder="$t('common.please_input') + $t('teacher.management.id_card_no')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.sex')" class="width_auto">
            <el-radio-group v-model="dataForm.sex">
              <el-radio :label="1">{{ $t('common.man') }}</el-radio>
              <el-radio :label="2">{{ $t('common.woman') }}</el-radio>
              <el-radio :label="3">{{ $t('common.secrecy') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('member.archive.weixin')" prop="weixin">
            <el-input v-model="dataForm.weixin" :placeholder="$t('common.please_input')+$t('member.archive.weixin')"></el-input>
          </el-form-item>

          <form-area ref="area" :province_id="dataForm.province_id" :city_id="dataForm.city_id" :region_id="dataForm.region_id" @setProvinceInfo="setProvinceInfo" @setCityInfo="setCityInfo" @setAreaInfo="setAreaInfo"></form-area>

          <el-form-item :label="$t('member.archive.address')" prop="address">
            <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('member.archive.address')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('teacher.management.qr_code')" prop="qr_code">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleQrCodeSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.qr_code" :src="dataForm.qr_code" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'member',
        roleList: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          avatar: '',
          username: '',
          nickname: '',
          id_card_no: '',
          sex: '',
          weixin: '',
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
          qr_code: '',
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
              url: this.$http.adornUrl(`/teacher/management/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.avatar      = data.data.avatar
                this.dataForm.username    = data.data.username
                this.dataForm.nickname    = data.data.nickname
                this.dataForm.qr_code     = data.data.qr_code
                this.dataForm.id_card_no  = data.data.archive.id_card_no || ''
                this.dataForm.sex         = data.data.archive.sex.value || ''
                this.dataForm.weixin      = data.data.archive.weixin || ''
                this.dataForm.province_id = data.data.archive.province_id.value || ''
                this.dataForm.city_id     = data.data.archive.city_id.value || ''
                this.dataForm.region_id   = data.data.archive.region_id.value || ''
                this.dataForm.address     = data.data.archive.address || ''
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
              url: this.$http.adornUrl(`/teacher/management/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'avatar': this.dataForm.avatar,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'id_card_no': this.dataForm.id_card_no,
                'sex': this.dataForm.sex,
                'weixin': this.dataForm.weixin,
                'province_id': this.$refs.area.province_id,
                'city_id': this.$refs.area.city_id,
                'region_id': this.$refs.area.region_id,
                'address': this.dataForm.address,
                'qr_code': this.dataForm.qr_code,
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
      setProvinceInfo (id) {
        this.dataForm.province_id = id
      },
      setCityInfo (id) {
        this.dataForm.city_id = id
      },
      setAreaInfo (id) {
        this.dataForm.region_id = id
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.avatar = res.data;
      },
      handleQrCodeSuccess(res, file) {
        this.dataForm.qr_code = res.data;
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
    }
  };
</script>
