<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('config.category.from') }}</div>
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

          <el-form-item :label="$t('config.category.name')" prop="name">
            <el-input :placeholder="$t('config.category.name')" v-model="dataForm.name"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.category.title')" prop="title">
            <el-input :placeholder="$t('config.category.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.category.parent_title')" prop="parent_id">
            <el-cascader v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('config.category.parent_title')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
          </el-form-item>

          <el-form-item :label="$t('config.category.content')" prop="content">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('config.category.content')" maxlength="200" show-word-limit v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.category.depth')" prop="depth">
            <el-input :placeholder="$t('common.please_input')+$t('config.category.depth')" type="number"  v-model="dataForm.depth"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input :placeholder="$t('common.please_input')+$t('common.sort')" type="number"  v-model="dataForm.sort"></el-input>
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
        model: 'config/category',
        level: [],
        levelProps: {
          label: 'name',
          value: 'id',
          checkStrictly: true
        },
        dataForm:
        {
          id: 0,
          parent_id: 0,
          name: '',
          title: '',
          content: '',
          depth: 0,
          sort: 0,
        },
        dataRule:
        {
          name: [
            { required: true, message: this.$t('config.category.rules.name.require'), trigger: 'blur' },
            { min: 1, max: 50, message: this.$t('config.category.rules.name.length'), trigger: 'blur' }
          ],
          title: [
            { required: true, message: this.$t('config.category.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 50, message: this.$t('config.category.rules.title.length'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/config/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.parent_id = data.data.parent_id
                this.dataForm.name = data.data.name
                this.dataForm.title = data.data.title
                this.dataForm.content = data.data.content
                this.dataForm.depth = data.data.depth
                this.dataForm.sort = data.data.sort
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
              url: this.$http.adornUrl(`/config/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parent_id': this.dataForm.parent_id,
                'name': this.dataForm.name,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'depth': this.dataForm.depth,
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
      loadLevelList () {
        this.$http({
          url: this.$http.adornUrl('/config/category/level'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.level = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();
    },
    mounted () {
      this.loadLevelList();
    },
  };
</script>
