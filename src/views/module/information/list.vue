<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_information_form'}">
              <el-button v-if="isAuth('module:information:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
          <div>
            <el-button v-if="isAuth('module:information:category:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_information_category_list'})">
              {{ $t('information.category.list') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:information:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.category_id" :placeholder="$t('common.please_select') + $t('information.category.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('information.title')" clearable>
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

          <el-table-column :label="$t('information.category.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.category">
                {{ scope.row.category.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('information.title')">
          </el-table-column>

          <el-table-column prop="source" :label="$t('information.source')">
          </el-table-column>

          <el-table-column prop="author" :label="$t('information.author')">
          </el-table-column>

          <el-table-column prop="read_total" :label="$t('information.read_total')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="220">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:information:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_information_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:information:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'information',
        category_id: 0,
        categoryList: [],
        dataForm: [
          'category_id',
          'title',
        ]
      };
    },
    methods: {
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/information/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.categoryList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    mounted () {
      this.loadCategoryList();
    },
    created() {
      this.dataForm.category_id = this.$route.query.category_id;
      this.getDataList()
    }
  };
</script>
