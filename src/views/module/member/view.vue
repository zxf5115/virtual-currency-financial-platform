<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive_info') }}</div>
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
        <el-form ref="form" :model="dataForm" label-width="80">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('common.basic_info') }}</span>
            </div>
            <div class="text item">
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
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.vip_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.vip_title')" label-width="100">
                    <span v-if="dataForm.vip && dataForm.vip[0]">
                      {{ dataForm.vip[0].title }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.vip_end_time')" label-width="100">
                    <span v-if="dataForm.vip_relevance">
                      {{ dataForm.vip_relevance.end_time }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.asset_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.asset_money')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.money }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.social_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.attention_total')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.attention_total }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.fans_total')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.fans_total }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.approval_total')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.approval_total }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.accepted_total')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.accepted_total }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>
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
        model: 'member',
        dataForm:
        {
          id: 0
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
                this.dataForm   = data.data
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
