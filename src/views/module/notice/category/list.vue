<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_notice_category_form'}">
              <el-button v-if="isAuth('module:notice:category:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <!-- <el-button v-if="isAuth('module:notice:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10"> -->
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_notice_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">

          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#" width="70px">
          </el-table-column>

          <el-table-column prop="title" :label="$t('notice.category.title')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:notice:category:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_notice_category_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <!-- <el-button v-if="isAuth('module:notice:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button> -->
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
        model: 'notice/category',
        dataForm: []
      };
    },

    methods: {
      // 停用（启用）课程类型
      enableHandle (id, status) {
        let notice = '您确定要启用当前投诉分类？'

        if(1 == status)
        {
          notice = '您确定要停用当前投诉分类？'
        }

        this.$confirm(notice, this.$t('common.prompt'), {
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
              this.$notice({
                notice: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$notice.error(this.$t(data.notice))
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
