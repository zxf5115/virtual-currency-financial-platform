<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('community.from') }}</div>
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
        <el-form label-width="140px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('community.category.title')" prop="category_id">
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('community.category.title')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('community.title')" prop="title">
            <el-input :placeholder="$t('community.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('community.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传图片分辨率为：355*170
            </div>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('community.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item :label="$t('community.author')" prop="author">
            <el-input :placeholder="$t('community.author')" v-model="dataForm.author"></el-input>
          </el-form-item>

          <el-form-item :label="$t('community.is_hot')" prop="is_hot">
            <el-switch v-model="dataForm.is_hot" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('community.is_recommend')" prop="is_recommend">
            <el-switch v-model="dataForm.is_recommend" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:community:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'community',
        categoryList: [],
        upload_headers:{},
        dataForm:
        {
          id: 0,
          category_id: '',
          title: '',
          picture: '',
          content: '',
          author: '',
          read_total: 0,
          is_hot: 2,
          is_recommend: 2,
        },
        dataRule:
        {
          category_id: [
            { required: true, message: this.$t('community.rules.category_id.require'), trigger: 'blur' },
          ],
          title: [
            { required: true, message: this.$t('community.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/community/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.category_id  = data.data.category_id
                this.dataForm.title        = data.data.title
                this.dataForm.picture      = data.data.picture
                this.dataForm.content      = data.data.content
                this.dataForm.author       = data.data.author
                this.dataForm.is_hot       = data.data.is_hot.value
                this.dataForm.is_recommend = data.data.is_recommend.value
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
              url: this.$http.adornUrl(`/community/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'category_id': this.dataForm.category_id,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'content': this.$refs.editor.content,
                'author': this.dataForm.author,
                'read_total': this.dataForm.read_total,
                'is_hot': this.dataForm.is_hot,
                'is_recommend': this.dataForm.is_recommend,
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
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/community/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created(request)
    {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

      this.loadCategoryList();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
