<template>
  <div class="qingwu color">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:order:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button v-if="isAuth('module:order:export')" type="success" icon="el-icon-download" @click="handleExport">
              {{ $t('common.export') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.order_no" :placeholder="$t('common.please_input') + $t('order.order_no')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.courseware_title" :placeholder="$t('common.please_input') + $t('courseware.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.order_status" :placeholder="$t('common.please_select') + $t('order.order_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in orderList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
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

          <el-table-column prop="order_no" :label="$t('order.order_no')" width="180">
          </el-table-column>

          <el-table-column :label="$t('courseware.title')" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.nickname')">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.username')">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.pay_money')">
            <template slot-scope="scope">
              <span class="red">
                {{ scope.row.pay_money }}
              </span>
            </template>

          </el-table-column>

          <el-table-column prop="pay_type" :label="$t('order.pay_type')">
            <template slot-scope="scope">
              {{ scope.row.pay_type.text }}
            </template>
          </el-table-column>

          <el-table-column prop="pay_status" :label="$t('order.pay_status')">
            <template slot-scope="scope">
              {{ scope.row.pay_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="order_status" :label="$t('order.order_status')">
            <template slot-scope="scope">
              {{ scope.row.order_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('order.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="360">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:order:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_order_course_view', query: {id: scope.row.id}})">
                {{ $t('order.view') }}
              </el-button>

              <el-button v-if="isAuth('module:order:close') && scope.row.order_status.value == 1 && scope.row.pay_status.value == 1" type="warning" icon="el-icon-close" @click="$router.push({name: 'module_order_course_send', query: {order_id: scope.row.id, member_id: scope.row.member_id}})">
                {{ $t('order.close') }}
              </el-button>

              <el-button v-if="isAuth('module:order:cancel') && (scope.row.order_status.value == 0 || scope.row.order_status.value == 1) && scope.row.pay_status.value == 1" type="warning" icon="el-icon-switch-button" @click="handleCancel(scope.row.id)">
                {{ $t('order.cancel') }}
              </el-button>

              <el-button v-if="isAuth('module:order:delete') && scope.row.order_status.value == 3" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('order.delete') }}
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
        model: 'order',
        orderList: [
          {'id': 0, 'title': '待学习'},
          {'id': 1, 'title': '学习中'},
          {'id': 2, 'title': '已完成'},
          {'id': 3, 'title': '已关闭'},
        ],
        dataForm: [
          'order_no',
          'courseware_title',
          'member_username',
        ]
      };
    },
    created() {
      this.getDataList()
    },
    methods: {
      handleCancel(id) {
        let message = '您确定要取消当前订单？'

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/cancel'),
            method: 'post',
            data: {
              id: id
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.getDataList()
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      },
      handleExport() {
        this.$http({
          url: this.$http.adornUrl(`/order/export`),
          method: 'post',
          data: this.$http.adornData({
            'order_no': this.dataForm.order_no,
            'courseware_title': this.dataForm.courseware_title,
            'member_username': this.dataForm.member_username,
            'page': this.pageIndex,
            'limit': this.pageSize,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            window.open(data.data)
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
  };
</script>
