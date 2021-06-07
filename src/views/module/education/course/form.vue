<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.from') }}</div>
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

          <el-form-item :label="$t('course.title')" prop="title">
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input')+$t('course.title')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.title')" prop="courseware_id">
            <el-select v-model="dataForm.courseware_id" :placeholder="$t('common.please_select')+$t('courseware.title')">
              <el-option v-for="(v,k) in coursewareList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('course.semester')" prop="semester">
            <el-input-number v-model="dataForm.semester" :min="1"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('course.present.title')" prop="present">
            <el-input v-model="dataForm.present" type="textarea" :placeholder="$t('common.please_input')+$t('course.present.title')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.description')" prop="description">
            <el-input type="textarea" rows="1" v-model="dataForm.description" :placeholder="$t('common.please_input')+$t('course.description')"></el-input>
          </el-form-item>

          <el-form-item class="mavon" :label="$t('course.picture')" prop="picture">
            <el-upload :action="this.$http.adornUrl('/file/picture')" list-type="picture-card" :headers="upload_headers" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :on-success="handlePictureSuccess" :before-upload="beforePictureUpload" :file-list="pictureList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item :label="$t('course.apply_time')" prop="apply_time">
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.apply_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')"></el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('course.course_start_time')" prop="course_start_time">
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.course_start_time" type="date" :placeholder="$t('common.please_select')+$t('course.course_start_time')">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('course.real_price')" prop="real_price">
            <el-input-number v-model="dataForm.real_price" :min="0" :precision="2">
            </el-input-number>
          </el-form-item>

          <el-form-item :label="$t('course.line_price')" prop="line_price">
            <el-input-number v-model="dataForm.line_price" :min="0" :precision="2">
            </el-input-number>
          </el-form-item>

          <el-form-item :label="$t('course.product_id')" prop="product_id">
            <el-select v-model="dataForm.product_id" :placeholder="$t('common.please_select')+$t('course.product_id')">
              <el-option v-for="(v,k) in productList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('course.class_size')" prop="class_size">
            <el-input-number v-model="dataForm.class_size" :min="1">
            </el-input-number>
          </el-form-item>

          <el-form-item :label="$t('course.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('course.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('course.unlock.title')" prop="unlock_id">
            <el-select v-model="dataForm.unlock_id" :placeholder="$t('common.please_select')+$t('course.unlock.title')">
              <el-option v-for="(v,k) in unlockList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('course.content')">
            <div id="content"></div>
          </el-form-item>

          <el-form-item class="mavon" prop="plan" :label="$t('course.plan')">
            <div id="plan"></div>
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
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  export default {
    extends: common,
    components: {
      Vditor
    },
    data() {
      return {
        model: 'education/course',
        upload_headers:{},
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        coursewareList: [],
        unlockList: [],
        productList: [
          {'id': 'com.xiaochouyu.fishapp.18', 'title': '18元课程'},
          {'id': 'com.xiaochouyu.fishapp.30', 'title': '30元课程'},
          {'id': 'com.xiaochouyu.fishapp.45', 'title': '45元课程'},
          {'id': 'com.xiaochouyu.fishapp.998RMB', 'title': '998元课程'},
        ],
        contentEditor: '',
        planEditor: '',
        dataForm:
        {
          id: 0,
          courseware_id : '',
          unlock_id : '',
          title: '',
          semester : 1,
          present : '',
          description: '',
          picture: [],
          apply_time: '',
          course_start_time: '',
          real_price: 0,
          line_price: 0,
          product_id: '',
          class_size: 1,
          sort: 0,
        },
        dataRule:
        {
          courseware_id: [
            { required: true, message: this.$t('course.rules.courseware_id.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('course.rules.title.require'), trigger: 'blur' },
          ],
          semester: [
            { required: true, message: this.$t('course.rules.semester.require'), trigger: 'blur' },
          ],
          apply_time: [
            { required: true, message: this.$t('course.rules.apply_time.require'), trigger: 'blur' },
          ],
          course_start_time: [
            { required: true, message: this.$t('course.rules.course_start_time.require'), trigger: 'blur' },
          ],
          line_price: [
            { required: true, message: this.$t('course.rules.line_price.require'), trigger: 'blur' },
          ],
          real_price: [
            { required: true, message: this.$t('course.rules.real_price.require'), trigger: 'blur' },
          ],
          class_size: [
            { required: true, message: this.$t('course.rules.class_size.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/education/course/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.courseware_id     = data.data.courseware_id
                this.dataForm.unlock_id         = data.data.unlock_id
                this.dataForm.title             = data.data.title
                this.dataForm.semester          = data.data.semester.value
                this.dataForm.present           = data.data.present
                this.dataForm.description       = data.data.description
                this.dataForm.picture           = data.data.pictureData
                this.dataForm.apply_time        = data.data.apply_time
                this.dataForm.course_start_time = data.data.course_start_time
                this.dataForm.real_price        = data.data.real_price
                this.dataForm.line_price        = data.data.line_price
                this.dataForm.product_id        = data.data.product_id
                this.dataForm.class_size        = data.data.class_size
                this.dataForm.sort              = data.data.sort

                this.pictureList = data.data.pictureList

                if(data.data.detail)
                {
                  this.contentEditor.setValue(data.data.detail.content)
                  this.planEditor.setValue(data.data.detail.plan)
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
              url: this.$http.adornUrl(`/education/course/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'courseware_id': this.dataForm.courseware_id,
                'unlock_id': this.dataForm.unlock_id,
                'title': this.dataForm.title,
                'semester': this.dataForm.semester,
                'present': this.dataForm.present,
                'description': this.dataForm.description,
                'picture': this.dataForm.picture,
                'apply_time': this.dataForm.apply_time,
                'course_start_time': this.dataForm.course_start_time,
                'real_price': this.dataForm.real_price,
                'line_price': this.dataForm.line_price,
                'product_id': this.dataForm.product_id,
                'class_size': this.dataForm.class_size,
                'sort': this.dataForm.sort,
                'content': this.contentEditor.getValue(),
                'plan': this.planEditor.getValue(),
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
      initContentVditor () {
        this.contentEditor = new Vditor("content",{
          multiple: false,
          height: 400,
          "mode": "sv",
          "preview": {
            "mode": "both"
          },
          toolbarConfig:{
            pin:true
          },
          cache:{
            enable:false
          },
          upload: {
            accept: 'image/*, .mp3, .wav, .mov, .mp4',
            token: 'test',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: this.$http.adornUrl('/file/batchRichText')
          },
        })
      },
      initPlanVditor () {
        this.planEditor = new Vditor("plan",{
          multiple: false,
          height: 400,
          "mode": "sv",
          "preview": {
            "mode": "both"
          },
          toolbarConfig:{
            pin:true
          },
          cache:{
            enable:false
          },
          upload: {
            accept: 'image/*, .mp3, .wav, .mov, .mp4',
            token: 'test',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: this.$http.adornUrl('/file/batchRichText')
          },
        })
      },
      loadCoursewareList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.coursewareList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadUnlockList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/unlock/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.unlockList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureSuccess(res, file) {
        this.dataForm.picture.push(res.data);
      },
      handleRemove(file, fileList) {

        let url = []

        fileList.forEach(res => {
          url.push(res.url);
        });

        this.dataForm.picture = url
      }
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
    mounted () {
      this.loadCoursewareList();
      this.loadUnlockList();
      this.initContentVditor();
      this.initPlanVditor();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
