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
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传图片分辨率为：355*170
            </div>
          </el-form-item>

          <el-form-item :label="$t('advertising.url')" prop="url">
            <el-input :placeholder="$t('common.please_input')+$t('advertising.url')" v-model="dataForm.url"></el-input>
          </el-form-item>

          <el-form-item :label="$t('advertising.type')" prop="type">
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_select')+$t('advertising.type')" @change="setLinkType">
              <el-option v-for="(v,k) in linkType" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('advertising.link')" prop="link" :hidden="link">
            <el-input :placeholder="$t('common.please_input')+$t('advertising.link')" v-model="dataForm.link"></el-input>
          </el-form-item>

          <el-form-item :label="$t('advertising.link')" prop="course_id" :hidden="course">
            <el-select v-model="dataForm.course_id" :placeholder="$t('common.please_select')+$t('advertising.link')">
              <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('advertising.link')" prop="goods_id" :hidden="goods">
            <el-select v-model="dataForm.goods_id" :placeholder="$t('common.please_select')+$t('advertising.link')">
              <el-option v-for="(v,k) in goodsList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
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
        linkType: [
          {"id":1, "title":"课程"},
          {"id":2, "title":"商品"},
          {"id":3, "title":"活动"},
          {"id":4, "title":"邀请"},
        ],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          position_id: '',
          title: '',
          picture: '',
          url: '',
          type: 1,
          link: '',
          course_id: '',
          goods_id: '',
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
        },
        course: false,
        goods: true,
        link: true,
        courseList: [],
        goodsList: [],
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
              url: this.$http.adornUrl(`/advertising/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.position_id = data.data.position_id
                this.dataForm.title       = data.data.title
                this.dataForm.picture     = data.data.picture
                this.dataForm.url         = data.data.url
                this.dataForm.type        = data.data.type.value
                this.dataForm.link        = data.data.link
                this.dataForm.course_id   = data.data.course_id
                this.dataForm.goods_id    = data.data.goods_id
                this.dataForm.sort        = data.data.sort

                if(1 == this.dataForm.type)
                {
                  this.course = false
                  this.goods = true
                  this.link = true
                }
                else if(2 == this.dataForm.type)
                {
                  this.course = true
                  this.goods = false
                  this.link = true
                }
                else
                {
                  this.course = true
                  this.goods = true
                  this.link = false
                }
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
              url: this.$http.adornUrl(`/advertising/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'position_id': this.dataForm.position_id,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'url': this.dataForm.url,
                'type': this.dataForm.type,
                'link': this.dataForm.link,
                'course_id': this.dataForm.course_id,
                'goods_id': this.dataForm.goods_id,
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
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.picture = res.data;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isLt2M) {
          this.$message.error(this.$t('common.file.rules.size'))
        }

        return isLt2M;
      },
      setLinkType(val) {
        if(1 == val)
        {
          this.course = false
          this.goods = true
          this.link = true
        }
        else if(2 == val)
        {
          this.course = true
          this.goods = false
          this.link = true
        }
        else
        {
          this.course = true
          this.goods = true
          this.link = false
        }
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
      loadGoodsList () {
        this.$http({
          url: this.$http.adornUrl('/goods/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.goodsList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.init();

      this.dataForm.position_id = this.$route.query.position_id;

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

      this.loadPositionList();
      this.loadCourseList();
      this.loadGoodsList();
    }
  };
</script>
