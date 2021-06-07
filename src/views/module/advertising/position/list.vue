<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_advertising_position_form'}">
              <el-button v-if="isAuth('module:advertising:position:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:advertising:position:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
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

          <el-table-column prop="title" :label="$t('advertising.position.title')">
          </el-table-column>

          <el-table-column prop="width" :label="$t('advertising.position.width')">
            <template slot-scope="scope">
              {{ scope.row.width }} px
            </template>
          </el-table-column>

          <el-table-column prop="height" :label="$t('advertising.position.height')">
            <template slot-scope="scope">
              {{ scope.row.height }} px
            </template>
          </el-table-column>

          <el-table-column prop="is_open" :label="$t('advertising.position.is_open')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.is_open.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.is_open.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="450">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:advertising:position:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_advertising_position_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:advertising:list')" type="info" icon="el-icon-search" @click="$router.push({name: 'module_advertising_list', query: {position_id: scope.row.id}})">
                {{ $t('advertising.view') }}
              </el-button>

              <el-button v-if="isAuth('module:advertising:form') && scope.row.is_open.value == 1" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_advertising_form', query: {position_id: scope.row.id}})" >
                {{ $t('advertising.create') }}
              </el-button>

              <el-button v-if="isAuth('module:advertising:position:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'advertising/position',
        dataForm: []
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
