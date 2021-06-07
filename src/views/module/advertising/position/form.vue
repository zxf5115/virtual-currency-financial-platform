<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('advertising.position.from') }}</div>
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
          <el-form-item :label="$t('advertising.position.title')" prop="title">
            <el-input :placeholder="$t('advertising.position.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('advertising.position.width')" prop="width">
            <el-input :placeholder="$t('advertising.position.width')" v-model="dataForm.width"></el-input>
          </el-form-item>

          <el-form-item :label="$t('advertising.position.height')" prop="height">
            <el-input :placeholder="$t('advertising.position.height')" v-model="dataForm.height"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.title')" prop="course_id">
            <el-select v-model="dataForm.course_id"  :placeholder="$t('common.please_select')+$t('course.title')" @change="loadUnitList">
              <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('advertising.position.is_open')" prop="is_open">
            <el-switch active-value="1" inactive-value="2" v-model="dataForm.is_open"></el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:advertising:position:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'advertising/position',
        courseList: [],
        dataForm:
        {
          id: 0,
          title: '',
          width: '',
          height: '',
          course_id: '',
          is_open: '1',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('advertising.position.rules.title.require'), trigger: 'blur' },
          ],
          width: [
            { required: true, message: this.$t('advertising.position.rules.width.require'), trigger: 'blur' },
          ],
          height: [
            { required: true, message: this.$t('advertising.position.rules.height.require'), trigger: 'blur' }
          ]
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
              url: this.$http.adornUrl(`/advertising/position/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title     = data.data.title
                this.dataForm.width     = data.data.width
                this.dataForm.height    = data.data.height
                this.dataForm.course_id = data.data.course_id
                this.dataForm.is_open   = data.data.is_open.value + ''
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
              url: this.$http.adornUrl(`/advertising/position/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'width': this.dataForm.width,
                'height': this.dataForm.height,
                'course_id': this.dataForm.course_id,
                'is_open': this.dataForm.is_open,
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
      loadCourseList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.courseList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();

      this.loadCourseList();
    }
  };
</script>
