<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('order.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_order_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.basic_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.order_no')" label-width="120">
                    {{ dataForm.order_no }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.create_time')" label-width="120">
                    {{ dataForm.create_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.order_status')" label-width="80">
                    {{ dataForm.order_status.text }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_money')" label-width="80">
                    <span class="red">
                      {{ dataForm.pay_money }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_type')" label-width="80">
                    {{ dataForm.pay_type.text }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_time')" label-width="80">
                    {{ dataForm.pay_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_status')" label-width="80">
                    {{ dataForm.pay_status.text }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.member_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.nickname')" label-width="80">
                    <span v-if="dataForm.member">
                      {{ dataForm.member.nickname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.username')" label-width="80">
                    <span v-if="dataForm.member">
                      {{ dataForm.member.username }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.course_info') }}</span>
          </div>
          <div class="text item">
            <el-table border v-if="dataForm.courseware" :data="dataForm.courseware" v-loading="dataListLoading">
              <el-table-column prop="code" :label="$t('courseware.code')">
              </el-table-column>

              <el-table-column prop="title" :label="$t('courseware.title')">
              </el-table-column>

              <el-table-column prop="money" :label="$t('courseware.money')">
              </el-table-column>

              <el-table-column prop="point_total" :label="$t('courseware.point_total')">
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.order_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" label-width="80">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('order.order_money')" label-width="80">
                    {{ dataForm.pay_money }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('order.pay_money')" label-width="80">
                    <span class="red">
                      {{ dataForm.pay_money }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('order.handle_info') }}</span>
          </div>
          <div class="text item">
            <el-table border v-if="dataForm.log" :data="dataForm.log" v-loading="dataListLoading">
              <el-table-column prop="username" :label="$t('order.log.username')">
              </el-table-column>

              <el-table-column prop="content" :label="$t('order.log.content')">
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('order.log.create_time')">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'order',
        dataListLoading: false,
        dataForm:
        {
          id: 0,
          pay_type: '',
          pay_status: '',
          order_status: '',
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/order/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
              }
            })
          }
        })
      },
    },
    created(request)
    {
      this.init();
    }
  };
</script>
