<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('teacher.recruitment.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_teacher_recruitment_list'})">
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
                  <el-form-item :label="$t('teacher.management.create_time')" label-width="80">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.condition')" label-width="80">
                    {{ dataForm.condition.text }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.avatar')" label-width="80">
                    <el-avatar :size="30" :src="dataForm.avatar">
                      <img src="@/assets/images/default/circle.png"/>
                    </el-avatar>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.nickname')" label-width="80">
                    {{ dataForm.nickname }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.archive.sex')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.sex.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.id_card_no')" label-width="80" v-if="dataForm.archive">
                    {{ dataForm.archive.id_card_no }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.archive.weixin')" label-width="80" v-if="dataForm.archive">
                    {{ dataForm.archive.weixin }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.archive.city')" label-width="80" v-if="dataForm.archive">
                    {{ dataForm.archive.province_id.text }} {{ dataForm.archive.city_id.text }} {{ dataForm.archive.region_id.text }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('teacher.management.archive.address')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.address }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-button v-if="isAuth('module:member:enable') && dataForm.status" :type="dataForm.status.value == 2 ? 'danger' : 'success'" :icon="dataForm.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(dataForm.id, dataForm.status.value)">
                    <span v-if="dataForm.status.value == 1">
                      {{ $t('member.enable') }}
                    </span>
                    <span v-else>
                      {{ $t('member.disable') }}
                    </span>
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('teacher.recruitment.undividend_income') }}</span>
          </div>
          <div class="text item color">
            <el-row>
              <el-col :span="22">
                <span class="mr10">{{ $t('teacher.recruitment.undividend_money') }}</span>
                <span class="red">{{ shareMoney.wait_money || 0 }}</span>
              </el-col>
              <el-col :span="2">
                <el-button v-if="isAuth('module:teacher:recruitment:money:form')" type="danger" icon="el-icon-finished" @click="$router.push({name: 'module_teacher_recruitment_money_form', query: {money_id: dataForm.id}})">
                  {{ $t('teacher.settlement') }}
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('teacher.recruitment.dividend_income') }}</span>
          </div>
          <div class="text item color">
            <el-row>
              <el-form ref="form" :model="dataForm" label-width="80">
                <el-col class="red" :span="6">
                  <el-form-item :label="$t('teacher.recruitment.dividend_income_total')" label-width="80">
                    {{ shareMoney.total_money || 0 }}
                  </el-form-item>
                </el-col>
                <el-col class="red" :span="6">
                  <el-form-item :label="$t('teacher.recruitment.buy_course_total')" label-width="80">
                    {{ shareMoney.total_number || 0 }}
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <el-row>
              <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle" height="300">

                <el-table-column prop="money" :label="$t('teacher.recruitment.dividend_income')">
                </el-table-column>

                <el-table-column prop="number" :label="$t('teacher.recruitment.buy_course_number')">
                </el-table-column>

                <el-table-column prop="settlement_status" :label="$t('teacher.recruitment.settlement_status')">
                </el-table-column>

                <el-table-column prop="settlement_time" :label="$t('teacher.recruitment.settlement_time')">
                  <template slot-scope="scope">
                    {{ scope.row.settlement_time.text || '' }}
                  </template>
                </el-table-column>

                <el-table-column prop="settlement_type" :label="$t('teacher.recruitment.settlement_type')">
                  <template slot-scope="scope">
                    {{ scope.row.type.text || '' }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('common.handle')" fixed="right" width="120">
                  <template slot-scope="scope">
                    <el-button v-if="isAuth('module:teacher:recruitment:money:list')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_teacher_recruitment_money_list', query: {id: scope.row.id, money_id: dataForm.id}})">
                      {{ $t('teacher.settlement_view') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="admin_table_main_pagination">
                <el-pagination
                  @size-change="sizeChangeHandle"
                  @current-change="currentChangeHandle"
                  :page-sizes="[10, 50, 100, 500]"
                  :page-size="pageSize"
                  :total="totalPage"
                  :current-page="pageIndex"
                  background layout="prev, pager, next, jumper, total, sizes">
                </el-pagination>
              </div>
            </el-row>
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
        dataForm:
        {
          id: 0,
          condition: ''
        },
        shareMoney: {},
        dataRule: {},
        dataList: []
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
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl(`/teacher/recruitment/money/view/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                if (data && data.status === 200) {
                  this.shareMoney = data.data
                }
              })
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl(`/teacher/recruitment/money/extract/list`),
                method: 'get',
                params: this.$http.adornParams({
                  member_id: this.dataForm.id
                })
              }).then(({data}) => {
                if (data && data.status === 200) {
                  this.dataList = data.data.data
                  this.totalPage = data.data.total
                }
              })
            })
          }
        })
      },
      // 禁用（解禁）学员账户
      enableHandle (id, status) {
        let message = '您确定要解禁当前学员的资产？'

        if(1 == status)
        {
          message = '您确定要禁用当前学员的资产？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/enable'),
            method: 'post',
            data: {id: id}
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message({
                message: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.init()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>


<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .vertical >>> .el-form-item__label {
    float: none;
  }
</style>
