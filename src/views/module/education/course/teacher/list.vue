<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:teacher:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_teacher_form', query: {course_id: dataForm.course_id, courseware_id: dataForm.courseware_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:teacher:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_course_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.level_id" :placeholder="$t('common.please_select') + $t('courseware.level.level')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in levelList" :label="v.level" :key="k" :value="v.id"></el-option>
            </el-select>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('course.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.course">
                {{ scope.row.course.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.level.level')">
            <template slot-scope="scope">
              <span v-if="scope.row.level">
                {{ scope.row.level.level }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.management.nickname')">
            <template slot-scope="scope">
              <span v-if="scope.row.teacher">
                {{ scope.row.teacher.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('course.teacher.sort')">
          </el-table-column>


          <el-table-column :label="$t('common.handle')" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:teacher:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_teacher_form', query: {id: scope.row.id, course_id: dataForm.course_id, courseware_id: dataForm.courseware_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:teacher:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course/teacher',
        levelList: [],
        dataForm: [
          'title',
          'course_id',
          'courseware_id',
          'level_id'
        ],
      };
    },
    methods:
    {
      loadLevelList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/level/select'),
          method: 'get',
          params: this.$http.adornParams({
            'courseware_id': this.dataForm.courseware_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.levelList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created() {
      this.dataForm.course_id = this.$route.query.course_id;
      this.dataForm.courseware_id = this.$route.query.courseware_id;
      this.getDataList()
    },
    mounted () {
      this.loadLevelList();
    },
  };
</script>
