<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'message_form'}">
              <el-button v-if="isAuth('message:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('message:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('message.title')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-column prop="type" :label="$t('message.type')">
            <template slot-scope="scope">
              <el-tag v-if="1 == scope.row.type.value">
                {{scope.row.type.text}}
              </el-tag>
              <el-tag type="warning" v-else-if="2 == scope.row.type.value">
                {{scope.row.type.text}}
              </el-tag>
              <el-tag type="success" v-else-if="3 == scope.row.type.value">
                {{scope.row.type.text}}
              </el-tag>
              <el-tag type="danger" v-else>
                {{scope.row.type.text}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('message.title')">
          </el-table-column>

          <el-table-column header-align="center" align="center" :label="$t('message.receiver')">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span v-for="(value, index) in scope.row.user" :label="index" :key="index">
                  <b v-if="value">{{ value.nickname }} &nbsp;&nbsp;</b>
                </span>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ $t('common.view') }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="author" :label="$t('message.author')">
          </el-table-column>

          <el-table-column prop="create_time" header-align="center" align="center" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button v-if="isAuth('message:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'message_form', query: {id: scope.row.id}})">
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
        model: 'message',
        dataForm: [
          'title'
        ]
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
