<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'user_role_form'}">
              <el-button v-if="isAuth('user:role:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('user:role:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('user.role.title')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')" fixed="left" width="70px">
          </el-table-column>

          <el-table-column prop="title" :label="$t('user.role.title')">
          </el-table-column>

          <el-table-column prop="content" :label="$t('user.role.content')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="120px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('user:role:form')" type="primary" icon="el-icon-edit" @click="$router.push({name:'user_role_form',query:{id:scope.row.id}})">
                {{ $t('common.update') }}
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
        model: 'role',
        dataForm: [
          'title'
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
