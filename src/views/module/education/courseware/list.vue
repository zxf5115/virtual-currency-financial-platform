<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:courseware:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_courseware_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('courseware.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
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

          <el-table-column prop="title" :label="$t('courseware.title')" width="200">
          </el-table-column>

          <el-table-column prop="description" :label="$t('courseware.description')">
          </el-table-column>

          <el-table-column prop="time_limit" :label="$t('courseware.time_limit')" width="180">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:courseware:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_courseware_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:status')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('courseware.enable') }}
                </span>
                <span v-else>
                  {{ $t('courseware.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:level:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_courseware_level_list', query: {'courseware_id': scope.row.id}})">
                {{ $t('courseware.level_info') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:delete') && scope.row.is_delete" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/courseware',
        dataForm: [
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
      this.getDataList()
    }
  };
</script>
