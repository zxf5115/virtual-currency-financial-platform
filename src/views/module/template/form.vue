<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('template.from') }}</div>
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

          <el-form-item :label="$t('template.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('template.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('template.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('template.left_top')" prop="left_top">
            <el-input :placeholder="$t('template.input')" v-model="dataForm.left_top"></el-input>
          </el-form-item>

          <el-form-item :label="$t('template.left_bottom')" prop="left_bottom">
            <el-input :placeholder="$t('template.input')" v-model="dataForm.left_bottom"></el-input>
          </el-form-item>

          <el-form-item :label="$t('template.right_top')" prop="right_top">
            <el-input :placeholder="$t('template.input')" v-model="dataForm.right_top"></el-input>
          </el-form-item>

          <el-form-item :label="$t('template.right_bottom')" prop="right_bottom">
            <el-input :placeholder="$t('template.input')" v-model="dataForm.right_bottom"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:template:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'template',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          title: '',
          picture: '',
          left_top: '',
          left_bottom: '',
          right_top: '',
          right_bottom: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('template.rules.title.require'), trigger: 'blur' },
          ],
          picture: [
            { required: true, message: this.$t('template.rules.title.require'), trigger: 'blur' },
          ],
          left_top: [
            { required: true, message: this.$t('template.rules.left_top.require'), trigger: 'blur' },
          ],
          left_bottom: [
            { required: true, message: this.$t('template.rules.left_bottom.require'), trigger: 'blur' },
          ],
          right_top: [
            { required: true, message: this.$t('template.rules.right_top.require'), trigger: 'blur' },
          ],
          right_bottom: [
            { required: true, message: this.$t('template.rules.right_bottom.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/template/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title        = data.data.title
                this.dataForm.picture      = data.data.picture
                this.dataForm.left_top     = data.data.left_top
                this.dataForm.left_bottom  = data.data.left_bottom
                this.dataForm.right_top    = data.data.right_top
                this.dataForm.right_bottom = data.data.right_bottom
                this.dataForm.sort         = data.data.sort
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
              url: this.$http.adornUrl(`/template/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'left_top': this.dataForm.left_top,
                'left_bottom': this.dataForm.left_bottom,
                'right_top': this.dataForm.right_top,
                'right_bottom': this.dataForm.right_bottom,
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
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
