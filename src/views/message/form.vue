<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('message.from') }}</div>
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

          <el-form-item :label="$t('message.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('message.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('message.type')" prop="type">
            <el-select class="fullwidth" v-model="dataForm.type" value-key="key" @change="typeChange" placeholder>
              <el-option :key="key" :label="item" :value="key" v-for="(item, key) in messageType" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.accept_type')" prop="accept_type">
            <el-radio-group :disabled="disabledAcceptType" v-model="dataForm.accept_type">
              <el-radio-button label="user">{{$t('message.user')}}</el-radio-button>
              <el-radio-button label="role">{{$t('message.role')}}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('message.accept_user')" prop="userList" v-if="dataForm.accept_type==='user'">
            <el-select @change="userSelect" :disabled="disabledAcceptType" collapse-tags multiple placeholder v-model="dataForm.userList">
              <el-option :key="item.id" :label="item.nickname" :value="item.id" v-for="item in allUserList" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.accept_role')" prop="roleList" v-else>
            <el-select @change="roleSelect" :disabled="disabledAcceptType" collapse-tags multiple placeholder style="width:100%" v-model="dataForm.roleList">
              <el-option :key="item.id" :label="item.title" :value="item.id" v-for="item in allRoleList" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.author')" prop="author">
            <el-input :maxlength="10" v-model="dataForm.author" />
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('message.content')">
            <mavon-editor class="mavon" :boxShadow="false" v-model="dataForm.content" ref="md" @imgAdd="$imgAdd" @change="change"/>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('message:handle')" type="primary" @click="dataFormSubmit()">
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
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    extends: common,
    components: {
      mavonEditor
    },
    data() {
      return {
        model: 'message',
        disabledAcceptType: false,
        allUserList: [],
        allRoleList: [],
        oldChooseUserList: [[]],
        oldChooseRoleList: [[]],
        messageType: [],
        dataForm:
        {
          id: 0,
          title: '',
          type: '',
          accept_type: 'user',
          userList: [],
          roleList: [],
          user_id: '',
          content: '',
          author: ''
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('message.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 100, message: this.$t('message.rules.title.length'), trigger: 'blur' }
          ],
          type: [
            { required: true, message: this.$t('message.rules.type.require'), trigger: 'blur' },
          ],
          user_id: [
            { required: true, message: this.$t('message.rules.accept.require'), trigger: 'blur' }
          ],
          content: [
            { required: true, message: this.$t('message.rules.content.require'), trigger: 'blur' },
            { min: 1, max: 1000, message: this.$t('message.rules.content.require'), trigger: 'blur' }
          ]
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
              url: this.$http.adornUrl(`/message/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title = data.data.title
                this.dataForm.type = data.data.type.value + ''
                this.dataForm.accept_type = data.data.accept_type
                this.dataForm.accept_user = data.data.accept_user
                this.dataForm.accept_role = data.data.accept_role
                this.dataForm.content = data.data.content
                this.dataForm.author = data.data.author
                this.disabledAcceptType =  true
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
              url: this.$http.adornUrl(`/message/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'type': this.dataForm.type,
                'accept_type': this.dataForm.accept_type,
                'user_list': this.dataForm.userList,
                'role_list': this.dataForm.roleList,
                'content': this.dataForm.content,
                'author': this.dataForm.author
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
      typeChange (select) {
        if (select === '3') {
          this.disabledAcceptType = true
        } else {
          this.disabledAcceptType = false
        }
      },
      loadUserList () {
        this.$http({
          url: this.$http.adornUrl('/user/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.allUserList = [...[{ id: '-1', nickname: '全选' }], ...data.data]
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadRoleList () {
        this.$http({
          url: this.$http.adornUrl('/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.allRoleList = [...[{ id: '-1', title: '全选' }], ...data.data]
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadMessageTypeList () {
        this.$http({
          url: this.$http.adornUrl('/message/type'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.messageType = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      userSelect (val) {console.log(1);
        //保留所有值
        let allValues = this.allUserList.map(item => item.id)

        // 用来储存上一次的值，可以进行对比
        const oldVal = this.oldChooseUserList.length === 1 ? [] : this.oldChooseUserList[1]

        // 若是全部选择
        if (val.includes('-1')) {
          this.dataForm.userList = allValues
        }

        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('-1') && !val.includes('-1')) {
          this.dataForm.userList = []
        }

        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('-1') && val.includes('-1')) {
          const index = val.indexOf('-1')
          val.splice(index, 1) // 排除全选选项
          this.dataForm.userList = val
        }

        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('-1') && !val.includes('-1')) {
          if (val.length === allValues.length - 1) {
            this.dataForm.userList = ['-1'].concat(val)
          }
        }

        //储存当前最后的结果 作为下次的老数据
        this.oldChooseUserList[1] = this.dataForm.userList
      },
      roleSelect (val) {
        //保留所有值
        let allValues = this.allRoleList.map(item => item.id)

        // 用来储存上一次的值，可以进行对比
        const oldVal = this.oldChooseRoleList.length === 1 ? [] : this.oldChooseRoleList[1]

        // 若是全部选择
        if (val.includes('-1')) {
          this.dataForm.roleList = allValues
        }

        // 取消全部选中  上次有 当前没有 表示取消全选
        if (oldVal.includes('-1') && !val.includes('-1')) {
          this.dataForm.roleList = []
        }

        // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('-1') && val.includes('-1')) {
          const index = val.indexOf('-1')
          val.splice(index, 1) // 排除全选选项
          this.dataForm.roleList = val
        }

        //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('-1') && !val.includes('-1')) {
          if (val.length === allValues.length - 1) {
            this.dataForm.roleList = ['-1'].concat(val)
          }
        }

        //储存当前最后的结果 作为下次的老数据
        this.oldChooseRoleList[1] = this.dataForm.roleList
      },
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd (pos, $file) {
        let formdata = new FormData()
        formdata.append('file', $file)
        // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
        this.$http({
          url: this.$http.adornUrl('/file/picture'),
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$refs.md.$img2Url(pos, data.data)
          } else {
            this.$message.error(data.data.message)
          }
        })
      },
      change (value, render) {
        // render 为 markdown 解析后的结果
        this.html = render
      },
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadUserList()
      this.loadRoleList()
      this.loadMessageTypeList()
    },
  };
</script>
<style>
  .mavon {
    width: 800px;
  }
  .v-note-op {
    padding: 0 !important;
  }
</style>
