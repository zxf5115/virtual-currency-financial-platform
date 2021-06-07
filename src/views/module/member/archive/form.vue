<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('member.nickname')">
            <span>
              {{ dataForm.nickname }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('member.archive.realname')" prop="realname">
            <el-input v-model="dataForm.realname" :placeholder="$t('common.please_input')+$t('member.archive.realname')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.age')" prop="age">
            <el-input-number v-model="dataForm.age" :min="10" :max="100"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('member.archive.sex')" class="width_auto">
            <el-radio-group v-model="dataForm.sex">
              <el-radio :label="1">{{ $t('common.man') }}</el-radio>
              <el-radio :label="2">{{ $t('common.woman') }}</el-radio>
              <el-radio :label="3">{{ $t('common.secrecy') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('member.archive.weixin')" prop="weixin">
            <el-input v-model="dataForm.weixin" :placeholder="$t('common.please_input')+$t('member.archive.weixin')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.id_card_no')" prop="id_card_no">
            <el-input v-model="dataForm.id_card_no" :placeholder="$t('common.please_input')+$t('member.archive.id_card_no')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.national')" prop="national">
            <el-select v-model="dataForm.national" filterable :placeholder="$t('common.please_input') + $t('member.archive.national')">
              <el-option v-for="(v,k) in nationalList" :label="v" :key="k" :value="k"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('member.archive.education')" prop="education">
            <el-select v-model="dataForm.education" filterable :placeholder="$t('common.please_input') + $t('member.archive.education')">
              <el-option v-for="(v,k) in degreeList" :label="v" :key="k" :value="k"></el-option>
            </el-select>
          </el-form-item>

          <form-area ref="area" :province_id="dataForm.province_id" :city_id="dataForm.city_id" :region_id="dataForm.region_id" @setProvinceInfo="setProvinceInfo" @setCityInfo="setCityInfo" @setAreaInfo="setAreaInfo"></form-area>

          <el-form-item :label="$t('member.archive.address')" prop="address">
            <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('member.archive.address')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.work_address')" prop="work_address">
            <el-input type="textarea" v-model="dataForm.work_address" :placeholder="$t('common.please_input')+$t('member.archive.work_address')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.archive.remark')" prop="remark">
            <el-input type="textarea" v-model="dataForm.remark" :rows="3" :placeholder="$t('common.please_input')+$t('member.archive.remark')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:member:archive:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'member/archive',
        degreeList: [],
        nationalList: [],
        dataForm:
        {
          id: 0,
          nickname : '',
          member_id : '',
          realname: '',
          age: 10,
          sex: 1,
          weixin: '',
          id_card_no: '',
          national: '',
          education: '',
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
          work_address: '',
          remark: '',
        },
        dataRule:
        {
          realname: [
            { required: true, message: this.$t('member.archive.rules.realname.require'), trigger: 'blur' },
          ],
          id_card_no: [
            { required: true, message: this.$t('member.archive.rules.id_card_no.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.nickname  = data.data.nickname

                if(data.data.archive)
                {
                  this.dataForm.member_id    = data.data.archive.id
                  this.dataForm.realname     = data.data.archive.realname
                  this.dataForm.age          = data.data.archive.age
                  this.dataForm.sex          = data.data.archive.sex
                  this.dataForm.weixin       = data.data.archive.weixin
                  this.dataForm.id_card_no   = data.data.archive.id_card_no
                  this.dataForm.national     = data.data.archive.national.value + ''
                  this.dataForm.education    = data.data.archive.education.value + ''
                  this.dataForm.province_id  = data.data.archive.province_id
                  this.dataForm.city_id      = data.data.archive.city_id
                  this.dataForm.region_id    = data.data.archive.region_id
                  this.dataForm.address      = data.data.archive.address
                  this.dataForm.work_address = data.data.archive.work_address
                  this.dataForm.remark       = data.data.archive.remark
                }
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/member/archive/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.member_id || undefined,
                'member_id': this.dataForm.id,
                'realname': this.dataForm.realname,
                'age': this.dataForm.age,
                'sex': this.dataForm.sex,
                'weixin': this.dataForm.weixin,
                'id_card_no': this.dataForm.id_card_no,
                'national': this.dataForm.national,
                'province_id': this.$refs.area.province_id,
                'city_id': this.$refs.area.city_id,
                'region_id': this.$refs.area.region_id,
                'address': this.dataForm.address,
                'work_address': this.dataForm.work_address,
                'education': this.dataForm.education,
                'remark': this.dataForm.remark,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      loadDegreeList () {
        this.$http({
          url: this.$http.adornUrl('/common/education/degree'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.degreeList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadNationalList () {
        this.$http({
          url: this.$http.adornUrl('/common/national/list'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.nationalList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      setProvinceInfo (id) {
        this.dataForm.province_id = id
      },
      setCityInfo (id) {
        this.dataForm.city_id = id
      },
      setAreaInfo (id) {
        this.dataForm.region_id = id
      },
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadDegreeList();
      this.loadNationalList();
    },
  };
</script>
