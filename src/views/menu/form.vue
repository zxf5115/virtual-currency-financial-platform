<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('menu.from') }}</div>
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

          <el-form-item :label="$t('menu.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('menu.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('menu.content')" prop="content">
            <el-input type="textarea" :placeholder="$t('common.please_input') + $t('menu.content')" v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item :label="$t('menu.parent_title')" prop="parent_id">
            <el-cascader v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('menu.parent_title')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
          </el-form-item>

          <el-form-item :label="$t('menu.category')" prop="category">
            <el-select v-model="dataForm.category" :placeholder="$t('common.please_input') + $t('menu.category')">
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('menu.type')" prop="type">
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_input') + $t('menu.type')">
              <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('menu.icon')" prop="icon">
            <el-input :placeholder="$t('common.please_input') + $t('menu.icon')" v-model="dataForm.icon"></el-input>
          </el-form-item>

          <el-form-item :label="$t('menu.url')" prop="url">
            <el-input :placeholder="$t('common.please_input') + $t('menu.url')" v-model="dataForm.url"></el-input>
          </el-form-item>


          <el-form-item :label="$t('menu.is_hidden')" prop="is_hidden">
            <el-switch v-model="dataForm.is_hidden" active-value="1" :active-text="$t('common.show')" inactive-value="2" :inactive-text="$t('common.hidden')">
            </el-switch>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_select') + $t('common.sort')"  v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('menu:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'menu',
        level: [],
        typeList: [
          {'id': 1, 'title': '菜单'},
          {'id': 2, 'title': '按钮'},
          {'id': 3, 'title': '菜单|按钮'}
        ],
        categoryList: [
          {'id': 1, 'title': '平台'},
          {'id': 2, 'title': '机构'},
          {'id': 3, 'title': '平台|机构'}
        ],
        levelProps: {
          label: 'title',
          value: 'id',
          checkStrictly: true
        },
        dataForm:
        {
          id: 0,
          title: '',
          parent_id: 0,
          content: '',
          category: 1,
          type: 1,
          icon: '',
          url: '',
          is_hidden: '1',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('menu.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/menu/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title     = data.data.title
                this.dataForm.parent_id = data.data.parent_id
                this.dataForm.content   = data.data.content
                this.dataForm.category  = data.data.category.value
                this.dataForm.type      = data.data.type.value
                this.dataForm.icon      = data.data.icon
                this.dataForm.url       = data.data.url
                this.dataForm.is_hidden = data.data.is_hidden + ''
                this.dataForm.sort      = data.data.sort
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
              url: this.$http.adornUrl(`/menu/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'parent_id': this.dataForm.parent_id,
                'content': this.dataForm.content,
                'category': this.dataForm.category,
                'type': this.dataForm.type,
                'icon': this.dataForm.icon,
                'url': this.dataForm.url,
                'is_hidden': this.dataForm.is_hidden,
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
          url: this.$http.adornUrl('/menu/level'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.level = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      // 图标选中
      iconActiveHandle (iconName)
      {
        this.dataForm.icon = iconName
      },
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadLevelList();
    },
  };
</script>
