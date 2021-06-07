<template>
  <el-form class="form color" ref="dataForm" label-width="150" label-position="top" :model="dataForm" :rules="dataRule">
    <el-form-item v-for="(item, index) in formItemList" :key="index" :label="item.name" :prop="item.title">

      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 单行输入项 -->
          <el-input v-if="item.type == 'text'" v-model="dataForm[item.title]" :clearable="true" @input="handleValue">
          </el-input>

          <!-- 数字输入项 -->
          <el-input-number v-else-if="item.type == 'number'"  v-model="dataForm[item.title]" @input="handleValue"></el-input-number>

          <!-- 天数输入项 -->
          <el-input-number v-else-if="item.type == 'day'"  v-model="dataForm[item.title]" @input="handleValue" :min="1" :max="31" :label="item.content"></el-input-number>

          <!-- 百分百数字输入项 -->
          <el-input v-else-if="item.type == 'percent'" type="number"  v-model="dataForm[item.title]" @input="handleValue">
            <template slot="append">%</template>
          </el-input>

          <!-- 密码输入项 -->
          <el-input v-else-if="item.type == 'password'" type="password"  v-model="dataForm[item.title]" @input="handleValue">
          </el-input>

          <!-- 多行输入项 -->
          <el-input v-else-if="item.type == 'textarea'" type="textarea" maxlength="5000" :rows="8" show-word-limit v-model="dataForm[item.title]" :clearable="true" @input="handleValue">
          </el-input>

          <!-- 单选输入项 -->
          <el-radio-group v-else-if="item.type == 'radio'" v-model="dataForm[item.title]" @input="handleValue">
            <el-radio v-for="(v,k) in item.params" :key="k" :label="v.value">{{ v.text }}</el-radio>
          </el-radio-group>

          <!-- 开关输入项 -->
          <el-switch v-else-if="item.type == 'switch'" v-model="dataForm[item.title]" active-value="1" inactive-value="2" :active-text="$t('config.active')" :inactive-text="$t('config.inactive')" @input="handleValue">
          </el-switch>

          <!-- 日期输入项 -->
          <el-date-picker v-else-if="item.type === 'date'" v-model="dataForm[item.title]" value-format="yyyy-MM-dd" @input="handleValue">
          </el-date-picker>

          <!-- 时间输入项 -->
          <el-time-select v-else-if="item.type === 'time'" v-model="dataForm[item.title]" @input="handleValue">
          </el-time-select>

          <!-- 日期时间输入项 -->
          <el-date-picker v-else-if="item.type === 'datetime'" v-model="dataForm[item.title]" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" @input="handleValue">
          </el-date-picker>

          <!-- 起止时间输入项 -->
          <el-date-picker v-else-if="item.type === 'daterange'" v-model="dataForm[item.title]" type="daterange" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" value-format="yyyy-MM-dd" @input="handleValue">
          </el-date-picker>

          <!-- 上传输入框 -->
          <el-upload v-else-if="item.type === 'upload'" class="avatar-uploader" :action="upload_url" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" @input="handleValue" :data="item">
            <img v-if="dataForm[item.title]" :src="dataForm[item.title]" class="avatar-upload">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <span class="red">{{ item.content }}</span>
        </el-col>
      </el-row>
    </el-form-item>



    <!--留一个插槽-->
    <slot></slot>

    <el-form-item>
      <el-button type="primary" @click="dataFormSubmit()">
        {{ $t('common.confirm') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    inject: ['refresh'],
    props: {
      category_id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        upload_headers: {},
        upload_url: this.$http.adornUrl('/file/data'),

        formItemList:{},
        dataForm: {},
        dataRule: {},
      }
    },
    methods: {
      init ()
      {
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl('/config/select'),
            method: 'get',
            params: this.$http.adornParams({
              'category_id': this.category_id
            })
          }).then(({data}) => {
            if (data && data.status === 200)
            {
              this.formItemList = data.data;

              this.formItemList.forEach(({ title, value, type }) => {

                if('radio' == type)
                {
                  this.dataForm[title] = parseInt(value);
                }
                else
                {
                  this.dataForm[title] = value;
                }
              });
            }
          })
        })
      },

      // 表单提交
      dataFormSubmit () {
        this.$http({
          url: this.$http.adornUrl('/setting/data'),
          method: 'post',
          data: this.$http.adornData(this.dataForm)
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message.success(this.$t('common.handle_success'));
            this.refresh();
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handleAvatarSuccess(res, file) {
        let title = res.data.title
        let url = res.data.url

        this.dataForm[title] = url;

        console.log(url);
      },
      beforeAvatarUpload(file) {
        const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPicture) {
          var message = this.$t('common.rules.picture_type');
          this.$message.error(this.$t(data.message))
        }
        if (!isLt2M) {
          var message = this.$t('common.rules.picture_size');
          this.$message.error(this.$t(data.message))
        }

        return isPicture && isLt2M;
      },
      handleValue(e) {
        this.$forceUpdate();
      },
    },
    mounted(){},
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
<style lang="scss" scoped>
  .admin_form_main .el-form-item {
    width: 800px;
  }
</style>
