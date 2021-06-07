<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('goods.from') }}</div>
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

          <el-form-item :label="$t('goods.title')" prop="title">
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input')+$t('goods.title')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('goods.cover')" prop="cover">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleCoverSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('goods.description')" prop="description">
            <el-input v-model="dataForm.description" rows="1" type="textarea" :placeholder="$t('common.please_input')+$t('goods.description')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('goods.lollipop_total')" prop="lollipop_total">
            <el-input-number v-model="dataForm.lollipop_total" :min="1">
            </el-input-number>
          </el-form-item>

          <el-form-item :label="$t('goods.cash_money')" prop="cash_money">
            <el-input-number v-model="dataForm.cash_money" :min="0" :precision="2">
            </el-input-number>
          </el-form-item>

          <el-form-item :label="$t('goods.exchange_total')" prop="exchange_total">
            <el-input-number v-model="dataForm.exchange_total" :min="0">
            </el-input-number>
          </el-form-item>

          <el-form-item class="mavon" :label="$t('goods.picture')" prop="picture">
            <el-upload :action="this.$http.adornUrl('/file/picture')" list-type="picture-card" :headers="upload_headers" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :on-success="handlePictureSuccess" :before-upload="beforePictureUpload" :file-list="pictureList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('goods.content')">
            <div id="content"></div>
          </el-form-item>

          <el-form-item :label="$t('goods.status')" prop="status">
            <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('goods.enable')" inactive-value="2" :inactive-text="$t('goods.disable')">
            </el-switch>
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
        contentEditor: '',
        dataForm:
        {
          id: 0,
          title: '',
          cover : '',
          picture: [],
          description : '',
          lollipop_total: 0,
          cash_money: 0.00,
          exchange_total: 0,
          status: '1',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('goods.rules.title.require'), trigger: 'blur' },
          ],
          cover: [
            { required: true, message: this.$t('goods.rules.cover.require'), trigger: 'blur' },
          ],
          description: [
            { required: true, message: this.$t('goods.rules.description.require'), trigger: 'blur' },
          ],
          lollipop_total: [
            { required: true, message: this.$t('goods.rules.lollipop_total.require'), trigger: 'blur' },
          ],
          cash_money: [
            { required: true, message: this.$t('goods.rules.cash_money.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/goods/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title          = data.data.title
                this.dataForm.cover          = data.data.cover
                this.dataForm.picture        = data.data.pictureData
                this.dataForm.description    = data.data.description
                this.dataForm.lollipop_total = data.data.lollipop_total
                this.dataForm.cash_money     = data.data.cash_money
                this.dataForm.exchange_total = data.data.exchange_total
                this.dataForm.status         = data.data.status.value + ''

                this.pictureList = data.data.pictureList

                if(data.data.detail)
                {
                  this.contentEditor.setValue(data.data.detail.content)
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
              url: this.$http.adornUrl(`/goods/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'cover': this.dataForm.cover,
                'description': this.dataForm.description,
                'lollipop_total': this.dataForm.lollipop_total,
                'cash_money': this.dataForm.cash_money,
                'exchange_total': this.dataForm.exchange_total,
                'picture': this.dataForm.picture,
                'status': this.dataForm.status,
                'content': this.contentEditor.getValue(),
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
      handleRemove(file, fileList) {
        let url = file.url || ''

        var index = this.dataForm.picture.findIndex(item =>{
　　　　　　if(item==url){
　　　　　　　return true
　　　　　　}
　　　　　})
　　　　　this.dataForm.picture.splice(index,1)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureSuccess(res, file) {
        this.dataForm.picture.push(res.data);
      },
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
    mounted () {
      this.initContentVditor();
    },
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
