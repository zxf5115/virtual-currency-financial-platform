<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('teacher.money.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_teacher_recruitment_view', query: {id: dataForm.money_id}})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading">

          <el-table-column :label="$t('member.avatar')" >
            <template slot-scope="scope" v-if="scope.row.member">
              <el-avatar :size="45" :src="scope.row.member.avatar">
                <img src="@/assets/images/default/circle.png"/>
              </el-avatar>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.nickname')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.nickname }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.username')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.username }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('courseware.title')">
            <template slot-scope="scope" v-if="scope.row.courseware">
              {{ scope.row.courseware.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.semester')">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.semester.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.recruitment.buy_course_time')">
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('teacher.recruitment.dividend_income')">
            <template slot-scope="scope">
              {{ scope.row.money }}
            </template>
          </el-table-column>

        </el-table>
        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-sizes="[10, 50, 100, 500]"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next, jumper, total, sizes">
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
        model: 'teacher/recruitment',
        dataForm: {
          id: 0,
          money_id: 0,
        },
        dataList: []
      };
    },
    methods: {
      init ()
      {
        this.dataForm.id = this.$route.query.id
        this.dataForm.money_id = this.$route.query.money_id

        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/teacher/recruitment/money/obtain/list`),
              method: 'get',
              params: this.$http.adornParams({
                extract_id: this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataList = data.data.data
                this.totalPage = data.data.total
              }
            })
          }
        })
      },
    },
    created() {
      this.init()
    }
  };
</script>
