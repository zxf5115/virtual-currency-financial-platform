<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:goods:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_goods_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:goods:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('goods.title')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('goods.cover')" width="120">
            <template slot-scope="scope">
              <el-image :src="scope.row.cover" style="width: 100px;">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('goods.title')" width="300">
          </el-table-column>

          <el-table-column prop="description" :label="$t('goods.description')" width="300">
          </el-table-column>

          <el-table-column prop="lollipop_total" :label="$t('goods.lollipop_total')"  width="120">
          </el-table-column>

          <el-table-column prop="cash_money" :label="$t('goods.cash_money')"  width="120">
          </el-table-column>

          <el-table-column prop="exchange_total" :label="$t('goods.exchange_total')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="320px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:goods:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_goods_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:goods:status')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('goods.enable') }}
                </span>
                <span v-else>
                  {{ $t('goods.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:goods:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'goods',
        dataForm: [
          'title',
        ],
      };
    },
    created() {
      this.getDataList()
    },
    methods: {
      // 停用（启用）课程类型
      enableHandle (id, status) {
        let message = '您确定要上架当前商品？'

        if(1 == status)
        {
          message = '您确定要下架当前商品？'
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
    }
  };
</script>
