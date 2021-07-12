<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_information_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" row-key="id" border style="width: 100%; ">

          <el-table-column prop="content" :label="$t('information.comment.content')">
          </el-table-column>

          <el-table-column :label="$t('information.comment.nickname')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.nickname }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('information.comment.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:information:comment:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import { treeDataTranslate } from '@/utils/tree'
  export default {
    extends: common,
    data() {
      return {
        model: 'information/comment',
        dataForm: [],
        dataList: [],
      };
    },
    methods:
    {
      // 获取数据列表
      getDataList ()
      {
        this.dataListLoading = true
        this.$http(
        {
          url: this.$http.adornUrl('/information/comment/list'),
          method: 'get',
          params: this.$http.adornParams({
            'information_id': this.dataForm.id
          })
        }).then(({data}) =>
        {
          this.dataList = treeDataTranslate(data.data, 'id')
          this.dataListLoading = false
        })
      },
    },
    created() {
      this.dataForm.id = this.$route.query.id
      this.getDataList()
    }
  };
</script>
