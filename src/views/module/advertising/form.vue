<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('advertising.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('advertising.position.title')" prop="position_id">
            <el-select v-model="dataForm.position_id" :placeholder="$t('common.please_select')+$t('advertising.position.title')">
              <el-option v-for="(v,k) in position" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('advertising.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('advertising.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('advertising.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传图片分辨率为：355*170
            </div>
          </el-form-item>

          <el-form-item :label="$t('advertising.link')" prop="link">
            <el-input :placeholder="$t('common.please_input')+$t('advertising.url')" v-model="dataForm.link"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:advertising:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'advertising',
        position: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          position_id: '',
          title: '',
          picture: '',
          link: '',
          sort: 0,
        },
        dataRule:
        {
          position_id: [
            { required: true, message: this.$t('advertising.rules.position_id.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('advertising.rules.title.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      init ()
      {
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/advertising/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.position_id = data.data.position_id
                this.dataForm.title       = data.data.title
                this.dataForm.picture     = data.data.picture
                this.dataForm.link        = data.data.link
                this.dataForm.sort        = data.data.sort
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
              url: this.$http.adornUrl(`/advertising/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'position_id': this.dataForm.position_id,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'link': this.dataForm.link,
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
      },
      loadPositionList () {
        this.$http({
          url: this.$http.adornUrl('/advertising/position/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.position = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.init();

      this.dataForm.position_id = this.$route.query.position_id;

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

      this.loadPositionList();
    }
  };
</script>
