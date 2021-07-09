<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.certification_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_member_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('common.basic_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="80">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('common.id')" label-width="80">
                    {{ dataForm.id }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.create_time')" label-width="80">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.avatar')" label-width="80">
                    <el-avatar :size="30" :src="dataForm.avatar">
                      <img src="@/assets/images/default/circle.png"/>
                    </el-avatar>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.nickname')" label-width="80">
                    {{ dataForm.nickname }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card :class="personal" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.certification_personal') }}</span>
          </div>
          <div class="text item">
            <el-form :model="dataForm" label-width="150px" label-position="top">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.personal.id_card_front_picture')" label-width="150">
                    <span>
                      <el-image :src="dataForm.data.id_card_front_picture">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.personal.id_card_behind_picture')" label-width="150">
                    <span>
                      <el-image :src="dataForm.data.id_card_behind_picture">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card :class="company" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.certification_company') }}</span>
          </div>
          <div class="text item">
            <el-form :model="dataForm" label-width="150px" label-position="top">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.company.company_name')" label-width="100">
                    <span>
                      {{ dataForm.data.company_name }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.company.business_license_no')" label-width="100">
                    <span>
                      {{ dataForm.data.business_license_no }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.company.business_license_picture')" label-width="100">
                    <span>
                      <el-image :src="dataForm.data.business_license_picture">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card :class="project" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.certification_project') }}</span>
          </div>
          <div class="text item">
             <el-form :model="dataForm" label-width="120px">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_name')" label-width="100">
                    <span>
                      {{ dataForm.data.project_name }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_logo')" label-width="100">
                    <span>
                      <el-image :src="dataForm.data.project_logo">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.realname')" label-width="100">
                    <span>
                      {{ dataForm.data.realname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.mobile')" label-width="100">
                    <span>
                      {{ dataForm.data.mobile }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_category')" label-width="100">
                    <span>
                      {{ dataForm.data.project_category }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_website')" label-width="100">
                    <span>
                      {{ dataForm.data.project_website }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_document')" label-width="100">
                    <span>
                      {{ dataForm.data.project_document }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_social')" label-width="100">
                    <span>
                      {{ dataForm.data.project_social }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_report')" label-width="100">
                    <span>
                      {{ dataForm.data.project_report }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.certification.project.project_github')" label-width="100">
                    <span>
                      {{ dataForm.data.project_github }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card :class="certification" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.certification_content') }}</span>
          </div>
          <div class="text item">
            <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100">
              <el-form-item :label="$t('member.certification_status')" prop="certification_status">
                <el-switch v-model="dataForm.certification.certification_status" active-value="1" :active-text="$t('common.pass')" inactive-value="2" :inactive-text="$t('common.no_pass')">
                </el-switch>
              </el-form-item>

              <el-form-item :label="$t('member.certification_content')" prop="certification_content">
                <el-input type="textarea" v-model="dataForm.certification.certification_content" :placeholder="$t('common.please_input') + $t('member.certification_content')"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button v-if="isAuth('module:member:certification:handle')" type="primary" @click="dataFormSubmit()">
                  {{ $t('common.confirm') }}
                </el-button>
                <el-button @click="resetForm()">
                  {{ $t('common.reset') }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
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
        model: 'member',
        personal: 'box-card mt10 display',
        company: 'box-card mt10 display',
        project: 'box-card mt10 display',
        certification: 'box-card mt10 display',
        dataForm:
        {
          id: 0,
          avatar: '',
          username: '',
          nickname: '',
          create_time: '',

          certification: {
            id: 0,
            type: 1,
            certification_status: '1',
            certification_content: '',
          },
          data: {
            id_card_front_picture: '',
            id_card_behind_picture: '',
            company_name: '',
            business_license_no: '',
            business_license_picture: '',
            project_name: '',
            project_logo: '',
            realname: '',
            mobile: '',
            project_category: '',
            project_website: '',
            project_document: '',
            project_social: '',
            project_report: '',
            project_github: '',
          },
        },
        dataRule: {}
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
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.id          = data.data.id
                this.dataForm.avatar      = data.data.avatar
                this.dataForm.create_time = data.data.create_time
                this.dataForm.username    = data.data.username
                this.dataForm.nickname    = data.data.nickname

                this.dataForm.certification.id = data.data.certification.id || ''
                this.dataForm.certification.type = data.data.certification.type.value || ''
                this.dataForm.certification.certification_status = data.data.certification.certification_status.value + '' || ''
                this.dataForm.certification.certification_content = data.data.certification.certification_content || ''

                if(0 == this.dataForm.certification.certification_status)
                {
                  this.certification = 'box-card mt10'
                }


                if(this.dataForm.certification.type)
                {
                  let type = this.dataForm.certification.type

                  if(1 == type)
                  {
                    this.personal = 'box-card mt10'
                  }
                  else if(2 == type)
                  {
                    this.company = 'box-card mt10'
                  }
                  else if(3 == type)
                  {
                    this.project = 'box-card mt10'
                  }
                }
              }
            }).then(() => {
              if (this.dataForm.id && this.dataForm.certification.type) {
                this.$http({
                  url: this.$http.adornUrl(`/member/certification/data`),
                  method: 'get',
                  params: this.$http.adornParams({
                    id: this.dataForm.id,
                    type: this.dataForm.certification.type
                  })
                }).then(({data}) => {
                  if (data && data.status === 200) {
                    this.dataForm.data = data.data
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
              url: this.$http.adornUrl(`/member/certification/handle`),
              method: 'post',
              data: this.$http.adornData({
                'certification_id': this.dataForm.certification.id,
                'certification_status': this.dataForm.certification.certification_status,
                'certification_content': this.dataForm.certification.certification_content,
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
    },
    created(request)
    {
      this.init();
    }
  };
</script>
