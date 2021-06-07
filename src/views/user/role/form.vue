<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('user.role.from') }}</div>
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

          <el-form-item :label="$t('user.role.title')" prop="title">
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input')+$t('user.role.title')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('user.role.content')" prop="content">
            <el-input v-model="dataForm.content" type="textarea" maxlength="200" show-word-limit :placeholder="$t('common.please_input')+$t('user.role.content')"></el-input>
          </el-form-item>

          <el-form-item class="width_auto margin-bottom-0">
            <el-divider content-position="left">
              {{ $t('user.role.menu') }}
            </el-divider>
          </el-form-item>

          <el-form-item class="width_auto">
            <div style="margin-left:24px;">
              <el-checkbox
                :indeterminate="isIndeterminate"
                @change="checkedAll"
                v-model="checkedMenu"
              />
              <span>全选 / 取消</span>
            </div>
            <el-tree
              :data="menuList"
              :empty-text="$t('common.empty_data')"
              :props="menuListTreeProps"
              node-key="id"
              ref="menuListTree"
              :default-expand-all="false"
              show-checkbox>
            </el-tree>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('user:role:handle')" type="primary" @click="dataFormSubmit()">
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
  import { treeDataTranslate } from '@/utils/tree'
  export default {
    extends: common,
    data() {
      return {
        model: 'role',
        menuList: [],
        menuListId: [],
        menuListTreeProps: {
          label: 'remark',
          children: 'children'
        },
        isIndeterminate: false,
        checkedMenu: false,
        disabled: false,
        dataForm:
        {
          id: 0,
          title: '',
          content: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('user.rules.username.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
	let query = this.$route.query
        let id = query.id

        if(id)
        {
          this.disabled = true
        }

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/role/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title = data.data.title
                this.dataForm.content = data.data.content
              }
            }).then(() => {
              if (this.dataForm.id) {
                this.$http({
                  url: this.$http.adornUrl(`/role/permission/${this.dataForm.id}`),
                  method: 'get',
                  params: this.$http.adornParams()
                }).then(({data}) => {
                  if (data && data.status === 200) {
                    this.checkedMenu = this.menuListId.length === data.data.permission.length

                    this.$refs.menuListTree.setCheckedKeys(data.data.permission)
                  }
                })
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
              url: this.$http.adornUrl(`/role/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'content': this.dataForm.content,
                'menu_id': this.$refs.menuListTree.getCheckedKeys()

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
      loadMenuList () {
        this.$http({
          url: this.$http.adornUrl('/menu/select'),
          method: 'get',
          params: this.$http.adornParams({
            category: 1
          })
        }).then(({data}) => {
          this.menuList = treeDataTranslate(data.data.menu)
          this.menuListId = data.data.all_menu_id
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            // this.$refs['dataForm'].resetFields()
            this.$refs.menuListTree.setCheckedKeys([])
          })
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      checkedAll() {
        if (this.checkedMenu) {
          //全选
          this.$refs.menuListTree.setCheckedKeys(this.menuListId);
          this.isIndeterminate = false;
        } else {
          //取消选中
          this.$refs.menuListTree.setCheckedKeys([]);
          this.isIndeterminate = false;
        }
      }
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadMenuList();
    },
  };
</script>
<style lang="scss" scoped>
  .menus_list{
    float: left;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .apis{
    margin-left: 15px;
    float: left;
  }
  .content{
    float: left;
    margin-left: 15px;
  }
  .div_apis{
    margin-bottom: 15px;
    float: left;
    width: 50%;
  }
  .div_apis:after{
    content:'';
    display: block;
    clear:both;
  }

  .margin-bottom-0{
    margin-bottom: 0;
  }

</style>
