<template>
  <el-form-item :label="$t('common.area')" prop="mobile" class="area">
    <div class="area">
      <div>
        <el-select v-model="province_id" filterable size="small" value-key="id" @change="selectProvince" placeholder="请选择省份">
          <el-option value="" label="请选择省份"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in provinceList"></el-option>
        </el-select>
      </div>

      <div>
        <el-select v-model="city_id" filterable size="small" value-key="id" @change="selectCity" placeholder="请选择城市">
          <el-option value="" label="请选择城市"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in cityList"></el-option>
        </el-select>
      </div>

      <div>
        <el-select v-model="region_id" filterable size="small" value-key="id" @change="selectArea" placeholder="请选择区县">
          <el-option value="" label="请选择区县"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in areaList"></el-option>
        </el-select>
      </div>
    </div>
  </el-form-item>
</template>

<script>
  export default {
    data () {
      return {
        // 整个省市县数据
        provinceList: [],
        cityList: [],
        areaList: [],

        province: '',
        city: '',
        region: '',
      }
    },
    props: {
      province_id: Number,
      city_id: Number,
      region_id: Number,
    },
    created () {
      this.init();
    },
    methods: {
      init ()
      {
        this.$http({
          url: this.$http.adornUrl(`/common/area/list`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.provinceList = data.data
          }
        })
      },
      selectProvince (event)
      {
        if (event)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: event
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.cityList = data.data
            }
          })
        }
        else
        {
          this.cityList = []
        }

        this.$emit('getProvinceInfo', event)
      },
      selectCity (event)
      {
        if (event)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: event
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.areaList = data.data
            }
          })
        }
        else
        {
          this.areaList = []
        }

        this.$emit('getCityInfo', event)
      },
      selectArea (event)
      {
        this.$emit('getAreaInfo', event)
      }
    },
    watch: {
      province_id: function(val) {
        this.province = val;
      },
      city_id: function(val) {
        this.city = val;

        if(this.province > 0)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: this.province
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.cityList = data.data
            }
          })
        }
      },
      region_id: function(val) {
        this.region = val;

        if(this.city > 0)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: this.city
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.areaList = data.data
            }
          })
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .area {
    div {
      width: 140px;
      display: flex;
      margin-right: 5px;
    }
  }
</style>
