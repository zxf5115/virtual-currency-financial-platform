<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_currency_symbol_form'}">
              <el-button v-if="isAuth('module:currency:symbol:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:currency:symbol:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.symbol" :placeholder="$t('common.please_input') + $t('currency.symbol.symbol')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.base_currency" :placeholder="$t('common.please_input') + $t('currency.symbol.base_currency')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.quote_currency" :placeholder="$t('common.please_input') + $t('currency.symbol.quote_currency')" clearable>
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

          <el-table-column prop="symbol" :label="$t('currency.symbol.symbol')">
          </el-table-column>

          <el-table-column prop="base_currency" :label="$t('currency.symbol.base_currency')">
          </el-table-column>

          <el-table-column prop="quote_currency" :label="$t('currency.symbol.quote_currency')">
          </el-table-column>

          <el-table-column prop="state" :label="$t('currency.symbol.state')">
            <template slot-scope="scope">
              {{ scope.row.state.text }}
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:currency:symbol:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_currency_symbol_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:currency:symbol:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'currency/symbol',
        dataForm: [
          'symbol',
          'base_currency',
          'quote_currency',
        ]
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
