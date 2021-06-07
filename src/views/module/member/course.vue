<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.course_production') }}</div>
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
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('organization.course_info') }}</span>
          </div>
          <div class="text item">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="(v, k) in coursewareList" :label="v.courseware.title" :name="'active'+k" :key="k" :data="v">

                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <el-row>
                      <el-col :span="8" v-if="v.courseware">
                        {{ $t('courseware.title') }} : {{ v.courseware.title }}
                      </el-col>
                      <el-col :span="8" v-if="v.course">
                        {{ $t('course.semester') }} : {{ v.course.semester.text }}
                      </el-col>
                      <el-col :span="8" v-if="v.level">
                        {{ $t('courseware.level.level') }} : {{ v.level.level }}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="text item color">
                    <el-table :data="dataList" v-loading="dataListLoading" height="200">
                      <el-table-column :label="$t('common.id')" width="70">
                        <template slot-scope="scope">
                          <span v-if="scope.row.course">
                            {{ scope.row.course.id }}
                          </span>
                        </template>
                      </el-table-column>

                      <el-table-column :label="$t('course.title')">
                        <template slot-scope="scope">
                          <span v-if="scope.row.course">
                            {{ scope.row.course.title }}
                          </span>
                        </template>
                      </el-table-column>

                      <el-table-column :label="$t('production.is_upload')" width="200">
                        <template slot-scope="scope">
                          <span v-if="scope.row.production">
                            {{ $t('member.upload_finish') }}
                          </span>
                          <span class="red" v-else>
                            {{ $t('member.upload_wait') }}
                          </span>
                        </template>
                      </el-table-column>

                      <el-table-column :label="$t('common.handle')" fixed="right" width="120">
                        <template slot-scope="scope">
                          <el-button v-if="isAuth('module:production:view') && scope.row.production" type="info" icon="el-icon-view" @click="$router.push({name: 'module_production_view', query: {id: scope.row.production.id}})">
                            {{ $t('production.view') }}
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
              </el-tab-pane>
            </el-tabs>
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
        coursewareList: [],
        activeName: 'active0',
        courseware_id: 0,
        level_id: 0,
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
      loadOrderList() {
        this.$http({
          url: this.$http.adornUrl('/member/order/course/select'),
          method: 'get',
          params: this.$http.adornParams({
            'member_id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.coursewareList = data.data

            this.courseware_id = data.data[0].courseware_id || 0
            this.level_id      = data.data[0].level_id || 0

            this.getDataList();
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handleClick(tab, event) {
        this.courseware_id = tab.$attrs.data.courseware_id || 0
        this.level_id      = tab.$attrs.data.level_id || 0

        this.getDataList();
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/member/course/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'member_id': this.dataForm.id,
            'courseware_id': this.courseware_id,
            'level_id': this.level_id,
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
      }
    },
    created(request)
    {
      this.init();
      this.loadOrderList();
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
