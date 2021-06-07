<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.level.unit.from') }}</div>
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
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('courseware.level.unit.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.level.unit.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.description')" prop="description">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.level.unit.description')" type="textarea" v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.unit.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('courseware.level.unit.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
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
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'education/courseware/level/unit',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          courseware_id: 0,
          level_id: 0,
          title: '',
          description: '',
          picture: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('courseware.level.unit.rules.title.require'), trigger: 'blur' }
          ],
          picture: [
            { required: true, message: this.$t('courseware.level.unit.rules.picture.require'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/level/unit/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.courseware_id = data.data.courseware_id
                this.dataForm.level_id      = data.data.level_id
                this.dataForm.title         = data.data.title
                this.dataForm.description   = data.data.description
                this.dataForm.picture       = data.data.picture
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
              url: this.$http.adornUrl(`/education/courseware/level/unit/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'courseware_id': this.dataForm.courseware_id,
                'level_id': this.dataForm.level_id,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'picture': this.dataForm.picture,
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
    created(request)
    {
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.dataForm.level_id      = this.$route.query.level_id;
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
