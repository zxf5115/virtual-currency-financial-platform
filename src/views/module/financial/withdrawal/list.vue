<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('financial.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.account_payment_account" :placeholder="$t('common.please_input') + $t('member.account.payment_name')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main color">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">

          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#" width="70px">
          </el-table-column>

          <el-table-column :label="$t('financial.username')">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('financial.withdrawal_type')">
            <template slot-scope="scope">
                {{ scope.row.withdrawal_type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.account.payment_name')">
            <template slot-scope="scope">
              <span v-if="scope.row.account">
                {{ scope.row.account.payment_name }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.account.payment_account')">
            <template slot-scope="scope">
              <span v-if="scope.row.account">
                {{ scope.row.account.payment_account }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('financial.withdrawal_status')">
            <template slot-scope="scope">
                {{ scope.row.withdrawal_status.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('financial.audit_type')">
            <template slot-scope="scope">
                {{ scope.row.audit_type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('financial.money')">
            <template slot-scope="scope">
              <span class="blue">
                {{ scope.row.money }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('financial.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:financial:withdrawal:handle') && scope.row.withdrawal_status.value == 0" type="primary" icon="el-icon-check" @click="agreeHandle(scope.row.id)">
                {{ $t('financial.agree') }}
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
        model: 'financial/withdrawal',
        dataForm: [
          'member_username',
          'account_payment_account',
        ]
      };
    },

    methods: {
      // 停用（启用）课程类型
      agreeHandle (id) {
        let message = '您确定要通过当前提现申请？'

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/handle'),
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
