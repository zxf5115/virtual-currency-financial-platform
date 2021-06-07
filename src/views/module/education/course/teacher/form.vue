<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.teacher.from') }}</div>
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

          <el-form-item :label="$t('course.title')" >
            <span v-if="course_title">
              {{ course_title }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('courseware.title')">
            <span v-if="courseware_title ">
              {{ courseware_title }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('course.level')" prop="level_id">
            <el-select v-model="dataForm.level_id" :placeholder="$t('common.please_select') + $t('courseware.level.level')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in levelList" :label="v.level" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('teacher.management.nickname')" prop="teacher_id">
            <el-select v-model="dataForm.teacher_id" :placeholder="$t('common.please_select') + $t('teacher.management.nickname')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in teacherList" :label="v.nickname" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('course.teacher.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('course.teacher.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
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
  export default {
    extends: common,
    data() {
      return {
        model: 'education/course/teacher',
        course_title: '',
        courseware_title: '',
        levelList: [],
        teacherList: [],
        dataForm:
        {
          id: 0,
          course_id: 0,
          courseware_id: 0,
          level_id: '',
          teacher_id: '',
          sort: 0,
        },
        dataRule:
        {
          level_id: [
            { required: true, message: this.$t('course.teacher.rules.level_id.require'), trigger: 'blur' },
          ],
          teacher_id: [
            { required: true, message: this.$t('course.teacher.rules.teacher_id.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/education/course/teacher/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.course_id     = data.data.course_id
                this.dataForm.courseware_id = data.data.courseware_id
                this.dataForm.level_id      = data.data.level_id
                this.dataForm.teacher_id    = data.data.teacher_id
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
              url: this.$http.adornUrl(`/education/course/teacher/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'course_id': this.dataForm.course_id,
                'courseware_id': this.dataForm.courseware_id,
                'level_id': this.dataForm.level_id,
                'teacher_id': this.dataForm.teacher_id,
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
      loadCourseTitle () {
        this.$http({
          url: this.$http.adornUrl(`/education/course/view/${this.dataForm.course_id}`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.course_title = data.data.title
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadCoursewareTitle () {
        this.$http({
          url: this.$http.adornUrl(`/education/courseware/view/${this.dataForm.courseware_id}`),
          method: 'get',
          params: this.$http.adornParams({
            'status': 1
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.courseware_title = data.data.title

            this.loadTeacherList(data.data.title);
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadLevelList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/level/select'),
          method: 'get',
          params: this.$http.adornParams({
            'status': 1,
            'courseware_id': this.dataForm.courseware_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.levelList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadTeacherList (courseware_title) {

        let url = '/teacher/management/select'

        if(courseware_title == '体验课')
        {
          url = '/teacher/recruitment/select'
        }

        this.$http({
          url: this.$http.adornUrl(url),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.teacherList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.dataForm.course_id = this.$route.query.course_id;
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.init();
    },
    mounted () {
      this.loadCourseTitle();
      this.loadCoursewareTitle();
      this.loadLevelList();
    },
  };
</script>
