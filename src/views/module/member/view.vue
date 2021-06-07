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
                  <el-form-item :label="$t('member.nickname')" label-width="80">
                    {{ dataForm.nickname }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.sex')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.sex.text }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.birthday')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.birthday }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.red_envelope')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.red_envelope }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.lollipop')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.lollipop }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.production')" label-width="100">
                    <span v-if="dataForm.asset">
                      {{ dataForm.asset.production }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-button v-if="isAuth('module:member:freeze') && dataForm.is_freeze" :type="dataForm.is_freeze.value == 1 ? 'warning' : 'primary'" :icon="dataForm.is_freeze.value == 1 ? 'el-icon-s-help' : 'el-icon-help'" @click="freezeHandle(dataForm.id, dataForm.is_freeze.value)">
                    <span v-if="dataForm.is_freeze.value == 1">
                      {{ $t('member.freeze') }}
                    </span>
                    <span v-else>
                      {{ $t('member.thaw') }}
                    </span>
                  </el-button>
                </el-col>
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
            <span>{{ $t('organization.course_info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataList" v-loading="dataListLoading" height="300">

              <el-table-column :label="$t('course.title')">
                <template slot-scope="scope">
                  <span v-if="scope.row.course">
                    {{ scope.row.course.title }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('course.semester')" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.course">
                    {{ scope.row.course.semester.text }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('course.course_start_time')" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.course">
                    {{ scope.row.course.course_start_time }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="order_no" :label="$t('order.course.order_no')" width="200">
              </el-table-column>

              <el-table-column prop="pay_money" :label="$t('order.course.pay_money')" width="200">
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('order.course.create_time')" width="200">
              </el-table-column>

              <el-table-column :label="$t('common.handle')" fixed="right" width="240">
                <template slot-scope="scope">
                  <el-button v-if="isAuth('module:order:course:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_order_course_view', query: {id: scope.row.id}})">
                    {{ $t('member.view_order') }}
                  </el-button>

                  <el-button v-if="isAuth('module:member:course')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_course', query: {id: dataForm.id}})">
                    {{ $t('member.course_production') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="admin_table_main_pagination">
              <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :page-size="pageSize"
                :total="totalPage"
                :current-page="pageIndex"
                background layout="prev, pager, next,jumper,total">
              </el-pagination>
            </div>
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
      // 冻结（解冻）学员账户金额
      freezeHandle (id, status) {
        let message = '您确定要冻结当前学员的资产？'

        if(1 == status)
        {
          message = '您确定要解冻当前学员的资产？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/freeze'),
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
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/order/course/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'member_id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.dataList = data.data.data
            this.totalPage = data.data.total
          }
          else
          {
            this.dataList = []
            this.totalPage = 0
            this.$message.error(data.message)
          }
          this.dataListLoading = false
        })
      },
    },
    created(request)
    {
      this.init();
      this.getDataList();
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
