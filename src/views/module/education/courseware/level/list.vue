<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:courseware:level:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_courseware_level_form', query: {'courseware_id': dataForm.courseware_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:courseware:level:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_courseware_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')"  width="70">
          </el-table-column>

          <el-table-column :label="$t('courseware.title')" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="level" :label="$t('courseware.level.level')" width="200">
          </el-table-column>

          <el-table-column prop="description" :label="$t('courseware.level.description')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:courseware:level:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_courseware_level_form', query: {id : scope.row.id, courseware_id: dataForm.courseware_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:level:status')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('courseware.level.enable') }}
                </span>
                <span v-else>
                  {{ $t('courseware.level.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:level:unit:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_courseware_level_unit_list', query: {courseware_id: dataForm.courseware_id, level_id: scope.row.id}})">
                {{ $t('courseware.level.unit_info') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:level:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                <span class="delete">{{$t('common.delete')}}</span>
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
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'education/courseware/level',
        dataForm: [
          'courseware_id',
          'title'
        ]
      };
    },
    methods: {
      // 停用（启用）课程类型
      enableHandle (id, status) {
        let message = '您确定要启用当前课程类型？'

        if(1 == status)
        {
          message = '您确定要停用当前课程类型？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/status'),
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
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.getDataList()
    }
  };
</script>
