<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('notice.from') }}</div>
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

          <el-form-item :label="$t('notice.category.title')" prop="category_id">
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('notice.category.title')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('notice.content')" prop="content">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('notice.content')" v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:notice:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'notice',
        categoryList: [],
        dataForm:
        {
          id: 0,
          category_id: '',
          content: ''
        },
        dataRule:
        {
          category_id: [
            { required: true, message: this.$t('notice.rules.category_id.require'), trigger: 'blur' },
          ],
          content: [
            { required: true, message: this.$t('notice.rules.content.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      init ()
      {
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/notice/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.category_id = data.data.category_id
                this.dataForm.content     = data.data.content
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
              url: this.$http.adornUrl(`/notice/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'category_id': this.dataForm.category_id,
                'content': this.dataForm.content,
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
          url: this.$http.adornUrl('/notice/category/select'),
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
    created() {
      this.init();
    },
    mounted () {
      this.loadCategoryList();
    },
  };
</script>
