<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('courseware.level.from') }}</div>
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

          <el-form-item :label="$t('courseware.level.minimum_age')" prop="minimum_age">
            <el-input-number :placeholder="$t('common.please_input') + $t('courseware.level.minimum_age')" :min="0" :max="100" v-model="dataForm.minimum_age"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.largest_age')" prop="largest_age">
            <el-input-number :placeholder="$t('common.please_input') + $t('courseware.level.largest_age')" :min="0" :max="100" v-model="dataForm.largest_age"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('courseware.level.description')" prop="description">
            <el-input :placeholder="$t('common.please_input') + $t('courseware.level.description')" type="textarea" v-model="dataForm.description"></el-input>
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
        model: 'education/courseware/level',
        dataForm:
        {
          id: 0,
          courseware_id: 0,
          minimum_age: 0,
          largest_age: 0,
          description: '',
        },
        dataRule:
        {
          minimum_age: [
            { required: true, message: this.$t('courseware.level.rules.minimum_age.require'), trigger: 'blur' }
          ],
          largest_age: [
            { required: true, message: this.$t('courseware.level.rules.largest_age.require'), trigger: 'blur' }
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
              url: this.$http.adornUrl(`/education/courseware/level/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.courseware_id = data.data.courseware_id
                this.dataForm.minimum_age   = data.data.minimum_age
                this.dataForm.largest_age   = data.data.largest_age
                this.dataForm.description   = data.data.description
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
              url: this.$http.adornUrl(`/education/courseware/level/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'courseware_id': this.dataForm.courseware_id,
                'minimum_age': this.dataForm.minimum_age,
                'largest_age': this.dataForm.largest_age,
                'description': this.dataForm.description,
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
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.init();
    }
  };
</script>
