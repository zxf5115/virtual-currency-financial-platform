<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:courseware:point:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_courseware_point_form', query: {courseware_id: dataForm.courseware_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:courseware:point:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_courseware_list'})">
              {{ $t('common.return') }}
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

          <el-table-column :label="$t('courseware.title')" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="picture" :label="$t('courseware.point.picture')" width="100">
            <template slot-scope="scope">
              <el-image :src="scope.row.picture" style="width: 80px;height: 45px;">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('courseware.point.title')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('courseware.point.sort')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:courseware:point:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_courseware_point_form', query: {id : scope.row.id, courseware_id: dataForm.courseware_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:courseware:point:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/courseware/point',
        dataForm: [
          'title',
          'courseware_id',
        ]
      };
    },
    created() {
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.getDataList()
    }
  };
</script>
