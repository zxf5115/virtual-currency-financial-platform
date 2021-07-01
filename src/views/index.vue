<template>
  <div class="qingwu color">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售额总览</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-medal-1"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div>今日订单收入</div>
                    <div class="blue mt10">
                      <b>{{ statistical.order.today_order_total || 0.00 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-medal"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div>昨日订单收入</div>
                    <div class="blue mt10">
                      <b>{{ statistical.order.yesterday_order_total || 0.00 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-trophy-1"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div>近7天订单收入</div>
                    <div class="blue mt10">
                      <b>{{ statistical.order.week_order_total || 0.00 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-trophy"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div>近1个月订单收入</div>
                    <div class="blue mt10">
                      <b>{{ statistical.order.month_order_total || 0.00 }}</b>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>待办事项</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-s-order"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div class="blue">
                      <b>{{ statistical.todo.wait_pay_total || 0 }}</b>
                    </div>
                    <div class="mt10">待付款订单</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-s-claim"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div class="blue">
                      <b>{{ statistical.todo.wait_confirm_total || 0 }}</b>
                    </div>
                    <div class="mt10">待确认订单</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-alarm-clock"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    <div class="blue">
                      <b>{{ statistical.todo.wait_return_total || 0 }}</b>
                    </div>
                    <div class="mt10">待处理退款申请</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-row :gutter="20" class="mt10">
      <el-col :span="12" class="default_block_col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>课程总览</span>
          </div>
          <div class="text item text-center">
            <el-row :gutter="20">
              <el-col :span="8" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.course.online_course_total || 0 }}</b>
                        </div>
                        <div class="mt10">已上架</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="8" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.course.offline_course_total || 0 }}</b>
                        </div>
                        <div class="mt10">已下架</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="8" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.course.course_total || 0 }}</b>
                        </div>
                        <div class="mt10">全部</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="default_block_col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>会员总览</span>
          </div>
          <div class="text item text-center">
            <el-row :gutter="20">
              <el-col :span="6" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.member.today_member_total || 0 }}</b>
                        </div>
                        <div class="mt10">今日新增</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.member.yesterday_member_total || 0 }}</b>
                        </div>
                        <div class="mt10">昨日新增</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.member.month_member_total || 0 }}</b>
                        </div>
                        <div class="mt10">本月新增</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6" class="default_block_col">
                <el-card shadow="never">
                  <el-row>
                    <el-col :span="24">
                      <div class="default_day_sale">
                        <div class="blue">
                          <b>{{ statistical.member.member_total || 0 }}</b>
                        </div>
                        <div class="mt10">学员总数</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card mt10">
      <div slot="header" class="clearfix">
        <span>订单统计</span>
        <div class="type">
          <el-select v-model="order_type" clearable @change="data">
            <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="text item text-center">
        <div>
          <el-row :gutter="20">
            <el-col :span="24" class="default_block_col">
              <el-card shadow="never">
                <el-row>
                  <el-col :span="24">
                    <div class="default_day_sale">
                      <div>订单总数</div>
                      <div class="blue mt10">
                        <b>{{ statistical.data.order_total }}</b>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="default_total">
          <ve-line :data="statistical.data.line"></ve-line>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  export default {
    components: {
      VeLine,
    },
    data() {
      return {
        order_type: 3,
        typeList: [
          {'id': 3, 'title': '最近七日'},
          {'id': 4, 'title': '最近一个月'},
        ],
        statistical: {
          order: {
            today_order_total: 0.00,
            yesterday_order_total: 0.00,
            week_order_total: 0.00,
            month_order_total: 0.00,
          },
          todo: {
            wait_pay_total: 0,
            wait_confirm_total: 0,
            wait_return_total: 0,
          },
          course: {
            online_course_total: 0,
            offline_course_total: 0,
            course_total: 0,
          },
          member: {
            today_member_total: 0,
            yesterday_member_total: 0,
            month_member_total: 0,
            member_total: 0,
          },
          data: {
            order_total: 0,
            line: {
              columns: ['title', '订单数'],
              rows: []
            },
          }
        },
      };
    },
    methods: {
      order() {
        this.$http({
          url: this.$http.adornUrl(`/index/order`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.order.today_order_total     = data.data.today_order_total
            this.statistical.order.yesterday_order_total = data.data.yesterday_order_total
            this.statistical.order.week_order_total      = data.data.week_order_total
            this.statistical.order.month_order_total     = data.data.month_order_total
          }
        })
      },
      todo() {
        this.$http({
          url: this.$http.adornUrl(`/index/todo`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.todo.wait_pay_total     = data.data.wait_pay_total
            this.statistical.todo.wait_confirm_total = data.data.wait_confirm_total
            this.statistical.todo.wait_return_total  = data.data.wait_return_total
          }
        })
      },
      course() {
        this.$http({
          url: this.$http.adornUrl(`/index/course`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.course.online_course_total  = data.data.online_course_total
            this.statistical.course.offline_course_total = data.data.offline_course_total
            this.statistical.course.course_total         = data.data.course_total
          }
        })
      },
      member() {
        this.$http({
          url: this.$http.adornUrl(`/index/member`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.member.today_member_total     = data.data.today_member_total
            this.statistical.member.yesterday_member_total = data.data.yesterday_member_total
            this.statistical.member.month_member_total     = data.data.month_member_total
            this.statistical.member.member_total           = data.data.member_total
          }
        })
      },
      data(type = 3) {
        this.$http({
          url: this.$http.adornUrl(`/index/data`),
          method: 'get',
          params: this.$http.adornParams({
            'type': type
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.data.order_total = data.data.order_total
            this.statistical.data.line.rows   = data.data.line
          }
        })
      },
    },
    created(request)
    {
      this.order();
      this.todo();
      this.course();
      this.member();
      this.data();
    }
  };
</script>
<style lang="scss" scoped>
  .text-center {
    text-align: center;
  }
  .type {
    float: right;
    padding: 3px 0
  }
  .icon {
    font-size: 36px;
    padding-top: 40px;
  }
  .unline {
    margin: 15px 0;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .el-button--mini, .el-button--small {
    font-size: 15px;
  }
</style>
