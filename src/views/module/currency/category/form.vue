<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('currency.category.from') }}</div>
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
        <el-form label-width="140px" ref="dataForm" :model="dataForm" :rules="dataRule">
          <el-form-item :label="$t('currency.category.slug')" prop="slug">
            <el-input :placeholder="$t('currency.category.slug')" v-model="dataForm.slug"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.category.symbol')" prop="symbol">
            <el-input :placeholder="$t('currency.category.symbol')" v-model="dataForm.symbol"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.category.fullname')" prop="fullname">
            <el-input :placeholder="$t('currency.category.fullname')" v-model="dataForm.fullname"></el-input>
          </el-form-item>

          <el-form-item :label="$t('currency.category.logo_url')" prop="logo_url">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handlePictureSuccess" :before-upload="beforePictureUpload">
              <img v-if="dataForm.logo_url" :src="dataForm.logo_url" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="red">
              上传图片分辨率为：200*200
            </div>
          </el-form-item>

          <el-form-item :label="$t('currency.category.market_cap_usd')" prop="market_cap_usd">
            <el-input-number :placeholder="$t('currency.category.market_cap_usd')" v-model="dataForm.market_cap_usd" :precision="4"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('currency.category.available_supply')" prop="available_supply">
            <el-input-number :placeholder="$t('currency.category.available_supply')" v-model="dataForm.available_supply" :precision="4"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('currency.category.total_supply')" prop="total_supply">
            <el-input-number :placeholder="$t('currency.category.total_supply')" v-model="dataForm.total_supply" :precision="4"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('currency.category.max_supply')" prop="max_supply">
            <el-input-number :placeholder="$t('currency.category.max_supply')" v-model="dataForm.max_supply" :precision="4"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('currency.category.issue_time')" prop="issue_time">
            <el-date-picker  v-model="dataForm.issue_time" type="datetime" :placeholder="$t('currency.category.issue_time')"></el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_hot')" prop="is_hot">
            <el-switch v-model="dataForm.is_hot" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_main')" prop="is_main">
            <el-switch v-model="dataForm.is_main" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('currency.category.is_defi')" prop="is_defi">
            <el-switch v-model="dataForm.is_defi" :active-value="1" :inactive-value="2" :active-text="$t('common.yes')" :inactive-text="$t('common.no')"></el-switch>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:currency:category:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'currency/category',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          slug: '',
          symbol: '',
          fullname: '',
          logo_url: '',
          market_cap_usd: '',
          available_supply: '',
          total_supply: '',
          max_supply: '',
          issue_time: '',
          is_hot: 2,
          is_main: 2,
          is_defi: 2,
          sort: 0,
        },
        dataRule:
        {
          slug: [
            { required: true, message: this.$t('currency.category.rules.slug.require'), trigger: 'blur' },
          ],
          symbol: [
            { required: true, message: this.$t('currency.category.rules.symbol.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/currency/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.slug             = data.data.slug
                this.dataForm.symbol           = data.data.symbol
                this.dataForm.fullname         = data.data.fullname
                this.dataForm.logo_url         = data.data.logo_url
                this.dataForm.market_cap_usd   = data.data.market_cap_usd
                this.dataForm.available_supply = data.data.available_supply
                this.dataForm.total_supply     = data.data.total_supply
                this.dataForm.max_supply       = data.data.max_supply
                this.dataForm.issue_time       = data.data.issue_time
                this.dataForm.is_hot           = data.data.is_hot.value
                this.dataForm.is_main          = data.data.is_main.value
                this.dataForm.is_defi          = data.data.is_defi.value
                this.dataForm.sort             = data.data.sort
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
              url: this.$http.adornUrl(`/currency/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'slug': this.dataForm.slug,
                'symbol': this.dataForm.symbol,
                'fullname': this.dataForm.fullname,
                'logo_url': this.dataForm.logo_url,
                'market_cap_usd': this.dataForm.market_cap_usd,
                'available_supply': this.dataForm.available_supply,
                'total_supply': this.dataForm.total_supply,
                'max_supply': this.dataForm.max_supply,
                'issue_time': this.dataForm.issue_time,
                'is_hot': this.dataForm.is_hot,
                'is_main': this.dataForm.is_main,
                'is_defi': this.dataForm.is_defi,
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
      }
    },
    created(request)
    {
      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');

      this.init();
    }
  };
</script>
