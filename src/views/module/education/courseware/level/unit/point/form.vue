<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.level.unit.point.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_courseware_level_unit_point_list', query: {courseware_id: dataForm.courseware_id, level_id: dataForm.level_id, unit_id: dataForm.unit_id}})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('courseware.level.unit.point.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.level.unit.point.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.point.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.point.url')" prop="url">
            <ele-upload-video :headers="upload_headers"
              :fileSize="20"
              @error="handleVideoError"
              :responseFn="handleVideoSuccess"
              :action="this.$http.adornUrl('/file/course')"
              v-model="dataForm.url"
            />
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.point.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('courseware.level.unit.point.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
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
  import EleUploadVideo from "vue-ele-upload-video";
  export default
  {
    extends: common,
    components: {
      EleUploadVideo
    },
    data()
    {
      return {
        model: 'education/courseware/level/unit/point',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          courseware_id: 0,
          level_id: 0,
          unit_id: 0,
          title: '',
          picture: '',
          url: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('courseware.level.unit.point.rules.title.require'), trigger: 'blur' }
          ],
          picture: [
            { required: true, message: this.$t('courseware.level.unit.point.rules.picture.require'), trigger: 'blur' }
          ],
          url: [
            { required: true, message: this.$t('courseware.level.unit.point.rules.url.require'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/level/unit/point/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.courseware_id = data.data.courseware_id
                this.dataForm.level_id      = data.data.level_id
                this.dataForm.unit_id       = data.data.unit_id
                this.dataForm.title         = data.data.title
                this.dataForm.picture       = data.data.picture
                this.dataForm.url           = data.data.url
                this.dataForm.sort          = data.data.sort
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
              url: this.$http.adornUrl(`/education/courseware/level/unit/point/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'courseware_id': this.dataForm.courseware_id,
                'level_id': this.dataForm.level_id,
                'unit_id': this.dataForm.unit_id,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'url': this.dataForm.url,
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
      handleVideoError(error) {
        console.log("error", error);
      },
      handleVideoSuccess(response) {
        return response.data;
      }
    },
    created(request)
    {
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.dataForm.level_id      = this.$route.query.level_id;
      this.dataForm.unit_id       = this.$route.query.unit_id;
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
