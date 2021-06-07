<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:production:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.member_nickname" :placeholder="$t('common.please_input') + $t('member.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.archive_age" :placeholder="$t('common.please_select') + $t('member.archive.age')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option label="不满1岁" value="0"></el-option>
              <el-option label="1岁" value="1"></el-option>
              <el-option label="2岁" value="2"></el-option>
              <el-option label="3岁" value="3"></el-option>
              <el-option label="4岁" value="4"></el-option>
              <el-option label="5岁" value="5"></el-option>
              <el-option label="6岁" value="6"></el-option>
              <el-option label="7岁" value="7"></el-option>
              <el-option label="8岁" value="8"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.courseware_id" :placeholder="$t('common.please_select') + $t('courseware.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in coursewareList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="dataForm.course_title" :placeholder="$t('common.please_input') + $t('course.title')" clearable>
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

          <el-table-column prop="id" label="#"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('production.picture')" width="120">
            <template slot-scope="scope">
              <el-image :src="scope.row.picture" style="width: 100px;">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.nickname')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.nickname }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.archive.age')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.archive">
                {{ scope.row.archive.age }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.archive.city')" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.archive">
                {{ scope.row.archive.city_id.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.username')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.member">
                {{ scope.row.member.username }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.title')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.courseware">
                {{ scope.row.courseware.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.semester')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.course">
                {{ scope.row.course.semester.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.level.level')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.level">
                {{ scope.row.level.level }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.title')" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.course">
                {{ scope.row.course.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('production.create_time')" width="140">
          </el-table-column>

          <el-table-column prop="approval_total" :label="$t('production.approval_total')" width="80">
          </el-table-column>

          <el-table-column prop="comment_total" :label="$t('production.comment_total')" width="80">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:production:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_production_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:production:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'production',
        coursewareList: [],
        dataForm: [
          'member_nickname',
          'archive_age',
          'courseware_id',
          'course_title',
        ]
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
