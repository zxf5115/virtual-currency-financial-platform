<template>
  <div class="qingwu">

    <el-row :gutter="20">
      <el-col :span="6" class="default_block_col">
        <el-card shadow="hover" :body-style="{padding:'15px 20px'}">
          <div>账户总额</div>
          <div class="unline"></div>
          <div class="default_total">
            <font style="font-size:30px;">
              {{ statistical.money_total }}
            </font>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="default_block_col">
        <el-card shadow="hover" :body-style="{padding:'15px 20px'}">
          <div>课程收入</div>
          <div class="unline"></div>
          <div class="default_total">
            <font style="font-size:30px;">
              {{ statistical.course_money }}
            </font>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="default_block_col">
        <el-card shadow="hover" :body-style="{padding:'15px 20px'}">
          <div>商品收入</div>
          <div class="unline"></div>
          <div class="default_total">
            <font style="font-size:30px;">
              {{ statistical.goods_money }}
            </font>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="default_block_col">
        <el-card shadow="hover" :body-style="{padding:'15px 20px'}">
          <div>红包提现</div>
          <div class="unline"></div>
          <div class="default_total">
            <font style="font-size:30px;">
              {{ statistical.red_envelope }}
            </font>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          收入占比
          <div class="unline"></div>
          <div class="default_total">
            <ve-ring :data="proportionData"></ve-ring>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          近15天收入走势图
          <div class="unline"></div>
          <div class="default_total">
            <ve-line :data="trendData" :settings="trendSettings"></ve-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VeRing from 'v-charts/lib/ring.common'
  import VeLine from 'v-charts/lib/line.common'
  export default {
    components: {
      VeRing,
      VeLine,
    },
    data() {
      return {
        statistical: {
          money_total: 0,
          course_money: 0,
          goods_money: 0,
          red_envelope: 0,
        },
        trendSettings: {
          area: true,
          metrics: ['商品', '体验课', '写字课', '系统课', '寒假课'],
          dimension: ['日期']
        },
        trendData: {
          columns: ['日期', '商品', '体验课', '写字课', '系统课', '寒假课'],
          rows: []
        },
        proportionData: {
          columns: ['title', 'value'],
          rows: []
        }
      };
    },
    methods: {
      getBasicData() {
        this.$http({
          url: this.$http.adornUrl(`/financial/report/data`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.statistical.money_total  = data.data.money_total
            this.statistical.course_money = data.data.course_money
            this.statistical.goods_money  = data.data.goods_money
            this.statistical.red_envelope = data.data.red_envelope
          }
        })
      },
      getProportionData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/financial/report/proportion'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.proportionData.rows = data.data
          }
        })
      },
      getTrendData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/financial/report/trend'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.trendData.rows  = data.data
          }
        })
      },
    },
    mounted(){
      this.getBasicData();
      this.getProportionData();
      this.getTrendData();
    }
  };
</script>
<style lang="scss" scoped>
  .unline {
    margin: 15px 0;
  }
  .default_program {
    text-align: center;
    width: 100%;
  }
  .default_program ul li {
    float: left;
    width: 22%;
    background: #f9f9f9;
    margin-right: 4%;
    margin-bottom: 10px;
  }
  .default_program ul li:nth-child(4n) {
    margin-right: 0;
  }
  .default_program ul li:hover {
    background: #f1f1f1;
  }
  .default_program2 ul li {
    float: left;
    width: 48%;
    background: #f9f9f9;
    margin-right: 4%;
    margin-bottom: 18px;
    height: 82px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #999;
  }
  .default_program2 ul li:nth-child(2n) {
    margin-right: 0;
  }
  .default_program2 ul li:nth-child(3) {
    width: 100%;
  }
  .default_program2 ul li:hover {
    background: #f3f3f3;
  }
  .default_program .i_backgraounds {
    text-align: center;
    margin: 0 auto;
    display: block;
    padding: 5px 0;
  }
  .default_program2 p {
    line-height: 55px;
    font-size: 22px;
    color: #303133;
  }
  .i_backgraounds i {
    font-size: 28px;
  }
  .default_program p {
    text-align: center;
    background: #fff;
    line-height: 30px;
    font-size: 12px;
    clear: both;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_copyright ul li {
    line-height: 66px;
    border-bottom: 1px solid #efefef;
  }
  .default_copyright ul li:nth-child(3) {
    border-bottom: none;
  }
  .default_copyright ul li span {
    margin-right: 60px;
  }
  .default_tongbi_left {
    float: left;
  }
  .default_tongbi_right {
    float: left;
    margin-left: 40px;
  }
  .default_tongbi:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_tongbi {
    margin-top: 20px;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .default_tubiao {
    width: 100%;
    margin-bottom: 20px;
  }
  .default_hot_goods ul li {
    margin-top: 20px;
    overflow: hidden;
  }
  .default_hot_goods ul li span {
    border-radius: 50%;
    background: #f5f5f5;
    width: 20px;
    height: 20px;
    text-align: center;
    display: block;
    float: left;
    margin-right: 8px;
  }
  .default_hot_goods ul li:nth-child(1) span {
    background: #314659;
    color: #fff;
  }
  .default_hot_goods ul li:nth-child(2) span {
    background: #314659;
    color: #fff;
  }
  .default_hot_goods ul li:nth-child(3) span {
    background: #314659;
    color: #fff;
  }
</style>
