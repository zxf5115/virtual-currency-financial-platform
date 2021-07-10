<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.teacher.from') }}</div>
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
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('courseware.teacher.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.teacher.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.teacher.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              建议尺寸120*90像素, 大小不要超过1M
            </div>
          </el-form-item>

          <el-form-item prop="mobile" :label="$t('courseware.teacher.mobile')">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.teacher.mobile')" v-model="dataForm.mobile"></el-input>
          </el-form-item>

          <el-form-item prop="position" :label="$t('courseware.teacher.position')">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.teacher.position')" v-model="dataForm.position"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('courseware.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('common.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
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
  import Editor from "@/components/form/editor"
  export default {
    extends: common,
    components: {
      Editor
    },
    data()
    {
      return {
        model: 'education/courseware/teacher',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          title: '',
          content: '',
          picture: '',
          mobile: '',
          position: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('courseware.teacher.rules.title.require'), trigger: 'blur' }
          ],
          picture: [
            { required: true, message: this.$t('courseware.teacher.rules.picture.require'), trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: this.$t('courseware.teacher.rules.mobile.require'), trigger: 'blur' }
          ],
          position: [
            { required: true, message: this.$t('courseware.teacher.rules.position.require'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/teacher/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title    = data.data.title
                this.dataForm.content  = data.data.content
                this.dataForm.picture  = data.data.picture
                this.dataForm.position = data.data.position
                this.dataForm.mobile   = data.data.mobile
                this.dataForm.code     = data.data.code
                this.dataForm.sort     = data.data.sort
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
              url: this.$http.adornUrl(`/education/courseware/teacher/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'code': this.dataForm.code,
                'title': this.dataForm.title,
                'content': this.$refs.editor.content,
                'picture': this.dataForm.picture,
                'mobile': this.dataForm.mobile,
                'position': this.dataForm.position,
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
      resetForm: function()
      {
        this.$refs['dataForm'].resetFields();
      }
    },
    created(request)
    {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    }
  };
</script>
