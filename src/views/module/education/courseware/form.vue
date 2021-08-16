<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.from') }}</div>
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

          <el-form-item :label="$t('courseware.code')" prop="code">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.code')" v-model="dataForm.code"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              建议尺寸120*90像素, 大小不要超过1M
            </div>
          </el-form-item>

          <el-form-item :label="$t('courseware.course_category')" prop="category_id">
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('courseware.course_category')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('courseware.teacher_name')" prop="teacher_id">
            <el-select v-model="dataForm.teacher_id" :placeholder="$t('common.please_select')+$t('courseware.teacher_name')">
              <el-option v-for="(v,k) in teacherList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('courseware.content')">
            <!-- <editor ref="editor" :value="dataForm.content"></editor> -->
            <el-input type="textarea" :placeholder="$t('common.please_input') + $t('courseware.content')" v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item prop="money" :label="$t('courseware.money')">
            <el-input-number :precision="2" :step="1" :min="0" :placeholder="$t('common.please_input') + $t('courseware.money')" v-model="dataForm.money"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('courseware.is_shelf')" prop="is_shelf">
            <el-switch v-model="dataForm.is_shelf" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('courseware.is_trial')" prop="is_trial">
            <el-switch v-model="dataForm.is_trial" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('courseware.is_recommend')" prop="is_recommend">
            <el-switch v-model="dataForm.is_recommend" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
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
        model: 'education/courseware',
        upload_headers:{},
        categoryList: [],
        teacherList: [],
        dataForm:
        {
          id: 0,
          code: '',
          title: '',
          content: '',
          picture: '',
          category_id: '',
          teacher_id: '',
          money: '',
          is_shelf: 1,
          is_trial: 1,
          is_recommend: 1,
          sort: 0,
        },
        dataRule:
        {
          category_id: [
            { required: true, message: this.$t('courseware.rules.category_id.require'), trigger: 'blur' }
          ],
          teacher_id: [
            { required: true, message: this.$t('courseware.rules.teacher_id.require'), trigger: 'blur' }
          ],
          code: [
            { required: true, message: this.$t('courseware.rules.code.require'), trigger: 'blur' }
          ],
          title: [
            { required: true, message: this.$t('courseware.rules.title.require'), trigger: 'blur' }
          ],
          picture: [
            { required: true, message: this.$t('courseware.rules.picture.require'), trigger: 'blur' }
          ],
          money: [
            { required: true, message: this.$t('courseware.rules.money.require'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.code         = data.data.code
                this.dataForm.title        = data.data.title
                this.dataForm.content      = data.data.content
                this.dataForm.picture      = data.data.picture
                this.dataForm.category_id  = data.data.category_id
                this.dataForm.teacher_id   = data.data.teacher_id
                this.dataForm.money        = data.data.money
                this.dataForm.is_shelf     = data.data.is_shelf.value
                this.dataForm.is_trial     = data.data.is_trial.value
                this.dataForm.is_recommend = data.data.is_recommend.value
                this.dataForm.sort         = data.data.sort
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
              url: this.$http.adornUrl(`/education/courseware/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'code': this.dataForm.code,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'picture': this.dataForm.picture,
                'category_id': this.dataForm.category_id,
                'teacher_id': this.dataForm.teacher_id,
                'money': this.dataForm.money,
                'is_shelf': this.dataForm.is_shelf,
                'is_trial': this.dataForm.is_trial,
                'is_recommend': this.dataForm.is_recommend,
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
      },
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadTeacherList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/teacher/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.teacherList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created(request)
    {
      this.init();
      this.loadCategoryList();
      this.loadTeacherList();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    }
  };
</script>
