<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
          <div>
            <el-button v-if="isAuth('module:education:course:unlock:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_course_unlock_list'})">
              {{ $t('course.unlock_info') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.courseware_id" :placeholder="$t('common.please_select') + $t('courseware.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in coursewareList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.course_start_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
            </el-date-picker>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main color">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="title" :label="$t('course.title')" width="320">
          </el-table-column>

          <el-table-column :label="$t('courseware.title')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="semester" :label="$t('course.semester')"  width="80">
            <template slot-scope="scope">
              {{ scope.row.semester.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.apply_time')" width="160">
            <template slot-scope="scope">
              {{ scope.row.apply_start_time }} - {{ scope.row.apply_end_time }}
            </template>
          </el-table-column>

          <el-table-column prop="course_start_time" :label="$t('course.course_start_time')" width="100">
          </el-table-column>

          <el-table-column prop="real_price" :label="$t('course.real_price')" width="100">
          </el-table-column>

          <el-table-column prop="recruitment_number" :label="$t('course.recruitment')" width="100">
          </el-table-column>

          <el-table-column prop="class_size" :label="$t('course.management_number')" width="100">
          </el-table-column>

          <el-table-column :label="$t('course.unlock.title')" width="80">
            <template slot-scope="scope">
              <span class="blue" v-if="scope.row.unlock">
                {{ scope.row.unlock.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="apply_number" :label="$t('course.apply_number')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.status')" width="80">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.apply_status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.apply_status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="450px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:teacher:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_course_teacher_list', query: {course_id: scope.row.id, courseware_id: scope.row.courseware_id}})">
                {{ $t('course.teacher_info') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:share:form')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_course_share_form', query: {course_id: scope.row.id}})">
                {{ $t('course.share_info') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course',
        coursewareList: [],
        dataForm: [
          'title',
          'courseware_id',
          'course_start_time'
        ],
      };
    },
    created() {
      this.getDataList()
    },
    methods: {
      loadCoursewareList () {
        this.$http({
          url: this.$http.adornUrl('/education/courseware/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.coursewareList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    mounted () {
      this.loadCoursewareList();
    },
  };
</script>
