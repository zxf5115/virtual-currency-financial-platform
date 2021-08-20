<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_currency_category_form'}">
              <el-button v-if="isAuth('module:currency:category:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:currency:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.slug" :placeholder="$t('common.please_input') + $t('currency.category.slug')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.symbol" :placeholder="$t('common.please_input') + $t('currency.category.symbol')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.fullname" :placeholder="$t('common.please_input') + $t('currency.category.fullname')" clearable>
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

          <el-table-column prop="id" label="#" width="70px">
          </el-table-column>

          <el-table-column prop="slug" :label="$t('currency.category.slug')" width="140">
          </el-table-column>

          <el-table-column prop="symbol" :label="$t('currency.category.symbol')" width="80">
          </el-table-column>

          <el-table-column prop="fullname" :label="$t('currency.category.fullname')" width="140">
          </el-table-column>

          <el-table-column prop="market_cap_usd" :label="$t('currency.category.market_cap_usd')" width="160">
          </el-table-column>

          <el-table-column prop="available_supply" :label="$t('currency.category.available_supply')" width="160">
          </el-table-column>

          <el-table-column prop="total_supply" :label="$t('currency.category.total_supply')" width="160">
          </el-table-column>

          <el-table-column prop="max_supply" :label="$t('currency.category.max_supply')" width="160">
          </el-table-column>

          <el-table-column prop="issue_time" :label="$t('currency.category.issue_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('currency.category.is_hot')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_hot.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_hot')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('currency.category.is_main')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_main.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_main')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('currency.category.is_defi')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_defi.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_defi')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:currency:category:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_currency_category_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:currency:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
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
        model: 'currency/category',
        dataForm: [
          'slug',
          'symbol',
          'fullname',
        ]
      };
    },
    methods: {
      handleStatus($event, id, field) {

        this.$http({
          url: this.$http.adornUrl('/currency/category/status'),
          method: 'post',
          data: {
            id: id,
            field: field,
            value: $event
          }
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
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
