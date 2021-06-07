<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_member_archive_form'}">
              <el-button v-if="isAuth('module:member:archive:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:member:archive:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.realname" :placeholder="$t('common.please_input') + $t('member.archive.realname')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.id_card_no" :placeholder="$t('common.please_input') + $t('member.archive.id_card_no')" clearable>
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

          <el-table-column prop="id_card_no" :label="$t('member.archive.id_card_no')">
          </el-table-column>

          <el-table-column :label="$t('member.archive.realname')" width="300px">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dd class="table_dl_dd_all_30">
                  {{ $t('member.archive.realname') }}： {{ scope.row.realname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('common.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="education" :label="$t('member.archive.education')">
          </el-table-column>

          <el-table-column prop="national" :label="$t('member.archive.national')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('member.archive.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:member:archive:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_member_archive_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:member:archive:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'member/archive',
        roleList: [],
        dataForm: [
          'realname',
          'id_card_no',
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
