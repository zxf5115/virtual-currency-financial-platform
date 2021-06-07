<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'config_category_form'}">
              <el-button v-if="isAuth('config:category:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.name" :placeholder="$t('common.please_input') + $t('config.category.name')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-tree-column prop='name' fixed depth file-icon="icon icon-file"
          folder-icon="icon icon-folder" child-key="children" :label="$t('config.category.name')">
　　　　　　</el-table-tree-column>

          <el-table-column prop="title" :label="$t('config.category.title')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="420">
            <template slot-scope="scope">
              <el-button v-if="isAuth('config:category:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'config_category_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('config:list')" type="info" icon="el-icon-search" @click="$router.push({name: 'config_list', query: {category_id: scope.row.id}})">
                {{ $t('config.category.view') }}
              </el-button>

              <el-button v-if="isAuth('config:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'config_form', query: {location_id: scope.row.id}})" >
                {{ $t('config.category.create') }}
              </el-button>

              <el-button v-if="isAuth('config:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                <span class="delete">{{$t('common.delete')}}</span>
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
        model: 'config/category',
        dataForm: [
          'name'
        ]
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
