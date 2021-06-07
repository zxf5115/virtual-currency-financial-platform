<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('config.from') }}</div>
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

          <el-form-item :label="$t('config.name')" prop="name">
            <el-input :placeholder="$t('config.name')" v-model="dataForm.name"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.title')" prop="title">
            <el-input :placeholder="$t('config.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.category_title')" prop="category_id">
            <el-cascader v-model="dataForm.category_id" :placeholder="$t('common.please_select')+$t('config.category_title')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
          </el-form-item>

          <el-form-item :label="$t('config.type')" prop="type">
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_select')+$t('config.type')">
              <el-option label="单行输入框" value="text"></el-option>
              <el-option label="数字输入项" value="number"></el-option>
              <el-option label="百分百数字输入项" value="percent"></el-option>
              <el-option label="多行输入框" value="textarea"></el-option>
              <el-option label="开关输入项" value="switch"></el-option>
              <el-option label="日期输入项" value="date"></el-option>
              <el-option label="时间输入项" value="time"></el-option>
              <el-option label="日期时间输入项" value="datetime"></el-option>
              <el-option label="起止时间输入项" value="daterange"></el-option>
              <el-option label="上传输入框" value="upload"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('config.value')" prop="value">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('config.value')" maxlength="200" show-word-limit v-model="dataForm.value"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.params')" prop="params">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('config.params')" maxlength="200" show-word-limit v-model="dataForm.params"></el-input>
          </el-form-item>

          <el-form-item :label="$t('config.content')" prop="content">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('config.content')" maxlength="200" show-word-limit v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('config:handle')"  type="primary" @click="dataFormSubmit()">
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
          category_id: 0,
          name: '',
          title: '',
          type: '',
          value: '',
          params: '',
          content: '',
        },
        dataRule:
        {
          name: [
            { required: true, message: this.$t('config.rules.name.require'), trigger: 'blur' },
            { min: 1, max: 50, message: this.$t('config.rules.name.length'), trigger: 'blur' }
          ],
          title: [
            { required: true, message: this.$t('config.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 50, message: this.$t('config.rules.title.length'), trigger: 'blur' }
          ],
          type: [
            { required: true, message: this.$t('config.rules.type.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/config/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.category_id = data.data.category_id
                this.dataForm.name = data.data.name
                this.dataForm.title = data.data.title
                this.dataForm.type = data.data.type
                this.dataForm.value = data.data.value
                this.dataForm.params = data.data.params
                this.dataForm.content = data.data.content
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
              url: this.$http.adornUrl(`/config/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'category_id': this.dataForm.category_id,
                'name': this.dataForm.name,
                'title': this.dataForm.title,
                'type': this.dataForm.type,
                'value': this.dataForm.value,
                'params': this.dataForm.params,
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
