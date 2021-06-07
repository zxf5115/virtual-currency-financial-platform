<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive.view') }}</div>
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
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.archive.info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.graduation" v-loading="dataListLoading" height="500">
              <el-table-column prop="id" :label="$t('common.id')"  width="70">
              </el-table-column>

              <el-table-column prop="nickname" :label="$t('user.nickname')">
              </el-table-column>

              <el-table-column prop="mobile" :label="$t('user.mobile')">
              </el-table-column>

              <el-table-column prop="email" :label="$t('user.email')">
              </el-table-column>

              <el-table-column :label="$t('common.handle')" fixed="right" width="120">
                <template slot-scope="scope">
                  <el-button v-if="isAuth('module:member:archive:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_archive_view', query: {id: scope.row.id}})">
                    {{ $t('common.view') }}
                  </el-button>
                </template>
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
        model: 'education/graduation',
        dataForm:
        {
          id: 0,
          graduation: '',
          ungraduation: ''
        },
        dataRule: {}
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
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/graduation/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.graduation   = data.data.graduation
                this.dataForm.ungraduation = data.data.ungraduation
              }
            })
          }
        })
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>


<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .mt10 {
    margin-top: 10px;
  }
</style>
