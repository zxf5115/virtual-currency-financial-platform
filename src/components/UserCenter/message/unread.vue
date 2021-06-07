<template>
  <div>
      <el-table :data="dataList" :show-header="false" style="width: 100%" :empty-text="$t('common.no_data')">
        <el-table-column>
          <template slot-scope="scope">
            <el-tag v-if="1 == scope.row.message.type.value">
              {{scope.row.message.type.text}}
            </el-tag>
            <el-tag type="warning" v-else-if="2 == scope.row.message.type.value">
              {{scope.row.message.type.text}}
            </el-tag>
            <el-tag type="success" v-else-if="3 == scope.row.message.type.value">
              {{scope.row.message.type.text}}
            </el-tag>
            <el-tag type="danger" v-else>
              {{scope.row.message.type.text}}
            </el-tag>
            <span class="message-title">
              {{ scope.row.message.content }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="date" width="180"></el-table-column>
        <el-table-column width="120">
          <template slot-scope="scope">
            <el-button size="small" @click="handleRead(scope.row.id)">标为已读</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
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
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data () {
      return {
        model: 'user/message',
        dataList: [],
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/user/message/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'status': 1
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataList = data.data.data
            this.totalPage = data.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      handleRead (id) {
        this.$http({
          url: this.$http.adornUrl('/user/message/readed'),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          }),
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.refresh();
          } else {
            this.$message.error(data.message)
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .message-title{
    cursor: pointer;
    margin-left: 10px;
  }
</style>
