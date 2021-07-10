<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('flash.from') }}</div>
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

          <el-form-item :label="$t('flash.category.title')" prop="category_id">
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('flash.category.title')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('flash.title')" prop="title">
            <el-input :placeholder="$t('flash.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('flash.content')">
            <editor ref="editor" :value="dataForm.content"></editor>
          </el-form-item>

          <el-form-item :label="$t('flash.bullish_total')" prop="bullish_total">
            <el-input-number :placeholder="$t('flash.bullish_total')" :min="0" v-model="dataForm.bullish_total"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('flash.bearish_total')" prop="bearish_total">
            <el-input-number :placeholder="$t('flash.bearish_total')" :min="0" v-model="dataForm.bearish_total"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('flash.audit_status')" prop="audit_status">
            <el-switch v-model="dataForm.audit_status" :active-value="1" :active-text="$t('common.pass')" :inactive-value="2" :inactive-text="$t('common.no_pass')">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:flash:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'flash',
        categoryList: [],
        dataForm:
        {
          id: 0,
          category_id: '',
          title: '',
          content: '',
          bullish_total: 0,
          bearish_total: 0,
          audit_status: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('flash.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/flash/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.category_id   = data.data.category_id
                this.dataForm.title         = data.data.title
                this.dataForm.content       = data.data.content
                this.dataForm.bullish_total = data.data.bullish_total
                this.dataForm.bearish_total = data.data.bearish_total
                this.dataForm.audit_status  = data.data.audit_status
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
              url: this.$http.adornUrl(`/flash/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'category_id': this.dataForm.category_id,
                'title': this.dataForm.title,
                'content': this.$refs.editor.content,
                'bullish_total': this.dataForm.bullish_total,
                'bearish_total': this.dataForm.bearish_total,
                'audit_status': this.dataForm.audit_status,
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
          url: this.$http.adornUrl('/flash/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();

      this.loadCategoryList();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
