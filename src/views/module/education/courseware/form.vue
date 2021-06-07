<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.from') }}</div>
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

          <el-form-item :label="$t('courseware.title')" prop="title">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.description')" prop="description">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.description')" type="textarea" v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('courseware.is_permanent')" prop="is_permanent">
            <el-radio-group v-model="dataForm.is_permanent" @change="showTimeLimit">
              <el-radio :label="1">
                {{ $t('courseware.permanent') }}
              </el-radio>
              <el-radio :label="2">
                {{ $t('courseware.cycle') }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :class="isHidden ? 'display' : ''" :label="$t('courseware.time_limit')">
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.valid_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')"></el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('courseware.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input') + $t('course.sort')" :min="0" :max="100" v-model="dataForm.sort"></el-input-number>
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
        model: 'education/courseware',
        isHidden: false,
        dataForm:
        {
          id: 0,
          title: '',
          description: '',
          is_permanent: 2,
          valid_time: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('courseware.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 20, message: this.$t('courseware.rules.title.length'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title        = data.data.title
                this.dataForm.description  = data.data.description
                this.dataForm.is_permanent = data.data.is_permanent.value
                this.dataForm.valid_time   = data.data.valid_time
                this.dataForm.sort         = data.data.sort

                if(this.dataForm.is_permanent == 1)
                {
                  this.isHidden = true
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
              url: this.$http.adornUrl(`/education/courseware/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'is_permanent': this.dataForm.is_permanent,
                'valid_time': this.dataForm.valid_time,
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
      resetForm: function()
      {
        this.$refs['dataForm'].resetFields();
      },
      showTimeLimit: function(val)
      {
        if(1 == val)
        {
          this.isHidden = true
        }
        else
        {
          this.isHidden = false
        }
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>
