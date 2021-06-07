<template>
  <div class="qingwu color">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('order.goods.money_total') }} <b class="red">{{ money_total }}</b>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:order:goods:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.order_no" :placeholder="$t('common.please_input') + $t('order.goods.order_no')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.goods_title" :placeholder="$t('common.please_input') + $t('goods.title')" clearable>
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

          <el-table-column prop="order_no" :label="$t('order.goods.order_no')" width="180">
          </el-table-column>

          <el-table-column :label="$t('goods.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.goods">
                {{ scope.row.goods.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.goods.nickname')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.goods.username')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="pay_type" :label="$t('order.goods.exchange_type')" width="100">
            <template slot-scope="scope">
              {{ scope.row.exchange_type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.goods.lollipop_total')" width="120">
            <template slot-scope="scope">
              <span class="red">
                {{ scope.row.lollipop_total }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('order.goods.pay_money')" width="100">
            <template slot-scope="scope">
              <span class="red">
                {{ scope.row.pay_money }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="pay_status" :label="$t('order.course.pay_status')" width="100">
            <template slot-scope="scope">
              {{ scope.row.pay_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="order_status" :label="$t('order.goods.order_status')" width="100">
            <template slot-scope="scope">
              {{ scope.row.order_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('order.goods.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:order:goods:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_order_goods_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:order:goods:send') && scope.row.order_status.value == 0 && scope.row.pay_status.value == 1" type="primary" icon="el-icon-s-promotion" @click="$router.push({name: 'module_order_goods_send', query: {order_id: scope.row.id, member_id: scope.row.member_id}})">
                {{ $t('order.goods.send') }}
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
        model: 'order/goods',
        money_total: 0.00,
        dataForm: [
          'order_no',
          'goods_title',
          'pay_status',
          'order_status',
        ]
      };
    },
    methods: {
      loadOrderMoneyTotal() {
        this.$http({
          url: this.$http.adornUrl('/order/goods/money'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.money_total = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    mounted () {
      this.loadOrderMoneyTotal();
    },
    created() {
      this.dataForm.pay_status = this.$route.query.pay_status;
      this.dataForm.order_status = this.$route.query.order_status;
      this.getDataList()
    },
  };
</script>
