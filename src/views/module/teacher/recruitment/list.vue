<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_teacher_recruitment_form'}">
              <el-button v-if="isAuth('module:teacher:recruitment:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:teacher:recruitment:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.archive_weixin" :placeholder="$t('common.please_input') + $t('member.archive.weixin')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('teacher.management.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="username" :label="$t('member.username')"  width="100">
          </el-table-column>

          <el-table-column :label="$t('teacher.management.archive.weixin')" width="100">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.weixin }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.info')" width="280">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar :size="45" :src="scope.row.avatar">
                    <img src="@/assets/images/default/circle.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('teacher.management.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('teacher.management.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.archive.sex')" width="80">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.sex.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.archive.city')" width="240">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.province_id.text }} {{ scope.row.archive.city_id.text }} {{ scope.row.archive.region_id.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.archive.address')">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.address }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.recruitment.dividend_income')" width="80">
            <template slot-scope="scope" v-if="scope.row.share">
              {{ scope.row.share.total_money }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.condition')" width="80">
            <template slot-scope="scope">
              {{ scope.row.condition.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:teacher:recruitment:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_teacher_recruitment_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:teacher:recruitment:enable')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('member.enable') }}
                </span>
                <span v-else>
                  {{ $t('member.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:teacher:recruitment:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_teacher_recruitment_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:teacher:recruitment:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
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
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'teacher/recruitment',
        dataForm: [
          'username',
          'nickname',
          'archive_weixin',
        ],
      };
    },
    methods: {
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
                  this.getDataList()
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
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
  enableHandle
