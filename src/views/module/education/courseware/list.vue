<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:courseware:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_courseware_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
          <div>
            <el-button v-if="isAuth('module:education:courseware:category:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_courseware_category_list'})">
              {{ $t('courseware.category.list') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('courseware.title')" clearable>
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

          <el-table-column prop="id" :label="$t('common.id')"  width="70">
          </el-table-column>

          <el-table-column prop="code" :label="$t('courseware.code')" width="100">
          </el-table-column>

          <el-table-column :label="$t('courseware.course_category')" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.category">
                {{ scope.row.category.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('courseware.title')">
          </el-table-column>

          <el-table-column prop="money" :label="$t('courseware.money')" width="120">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')" width="100">
          </el-table-column>

          <el-table-column :label="$t('courseware.is_shelf')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_shelf.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_shelf')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.is_trial')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_trial.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_trial')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column prop="is_recommend" :label="$t('courseware.is_recommend')" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_recommend.value"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatus($event, scope.row.id, 'is_recommend')">
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="320">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:courseware:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_courseware_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:point:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_courseware_point_list', query: {'courseware_id': scope.row.id}})">
                {{ $t('courseware.point_info') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/courseware',
        dataForm: [
          'title'
        ]
      };
    },
    methods: {
       handleStatus($event, id, field) {

        this.$http({
          url: this.$http.adornUrl('/education/courseware/status'),
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
