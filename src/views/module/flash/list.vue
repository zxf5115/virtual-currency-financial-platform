<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_flash_form'}">
              <el-button v-if="isAuth('module:flash:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
          <div>
            <el-button v-if="isAuth('module:flash:category:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_flash_category_list'})">
              {{ $t('flash.category.list') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:flash:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select') + $t('flash.category.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('flash.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.audit_status" :placeholder="$t('common.please_select') + $t('flash.audit_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in auditList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.create_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
            </el-date-picker>
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

          <el-table-column :label="$t('flash.category.title')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.category">
                {{ scope.row.category.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('flash.title')">
          </el-table-column>

          <el-table-column prop="bullish_total" :label="$t('flash.bullish_total')" width="100">
          </el-table-column>

          <el-table-column prop="bearish_total" :label="$t('flash.bearish_total')" width="100">
          </el-table-column>

          <el-table-column :label="$t('flash.audit_status')" width="100">
            <template slot-scope="scope">
              {{ scope.row.audit_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="is_recommend" :label="$t('flash.is_recommend')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_recommend.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_recommend')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('flash.admin')" width="100">
            <template slot-scope="scope" v-if="scope.row.user">
              {{ scope.row.user.nickname }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="220">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:flash:form')" type="warning" icon="el-icon-check" @click="$router.push({name: 'module_flash_form', query: {id : scope.row.id}})">
                {{ $t('common.audit') }}
              </el-button>

              <el-button v-if="isAuth('module:flash:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'flash',
        category_id: 0,
        categoryList: [],
        auditList: [],
        dataForm: [
          'category_id',
          'title',
          'audit_status',
          'create_time',
        ]
      };
    },
    methods: {
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/flash/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadAuditList () {
        this.$http({
          url: this.$http.adornUrl('/common/single/audit'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.auditList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    mounted () {
      this.loadCategoryList();
      this.loadAuditList();
    },
    created() {
      this.dataForm.category_id = this.$route.query.category_id;
      this.getDataList()
    }
  };
</script>
