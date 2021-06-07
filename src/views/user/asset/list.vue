<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'user_form'}">
              <el-button type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-column prop="nickname" :label="$t('user.nickname')" width="300px">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <img :src="scope.row.avatar" width="50">
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('user.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('user.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column :label="$t('role.title')">
            <template slot-scope="scope">
              <span class="user_list_roles">
                <el-tag v-for="(v,k) in scope.row.role" :key="k">{{v.name}}</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="mobile" :label="$t('user.mobile')">
          </el-table-column>

          <el-table-column prop="email" :label="$t('user.email')">
          </el-table-column>

          <el-table-column prop="money" :label="$t('user.money')">
            <template slot-scope="scope">
                {{ scope.row.asset ? scope.row.asset.money : '0.00' }}
            </template>
          </el-table-column>

          <el-table-column prop="integral" label="积分"></el-table-column>
          <el-table-column prop="frozen_money" label="冻结资金"></el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="220px">
            <template slot-scope="scope">
              <el-button icon="el-icon-bank-card" @click="change_user_money(scope.row.id)">
                调整资金
              </el-button>

              <el-button type="primary" icon="el-icon-edit" @click="$router.push({name: 'advertising_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
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

    <!-- 调整资金弹出框 -->
    <el-dialog title="调整资金" :visible.sync="changeShow" width="30%">
      <el-form ref="form"  label-width="90px">
        <el-form-item label="改变对象：">
          <el-select v-model="change_info.change_type" placeholder="请选择">
            <el-option label="余额" :value="0"></el-option>
            <el-option label="积分" :value="1"></el-option>
            <el-option label="冻结资金" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="change_info.type">
            <el-radio :label="1">增加</el-radio>
            <el-radio :label="0">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="change_info.money"></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="changeShow = false">取 消</el-button>
        <el-button type="primary" @click="change_start()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'user',
        dataForm: [],

        changeShow:false, // 显示调整输入框
        change_info:{
          change_type:0, // 修改类型  0 为 余额
          type:1,
          money:1,
        },
      };
    },
    methods: {

      change_user_money:function(id){
        this.user_id = id;
        this.changeShow = true;
      },
      change_start:function(){
        this.change_info.user_id = this.user_id;
        this.$post(this.$api.adminChangeMoney,this.change_info).then(res=>{
          if(res.code == 200){
            this.changeShow = false;
            this.$message.success('修改成功');
          }else{
            this.$message.error(res.msg);
          }
        });
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
<style lang="scss" scoped>
  .user_list_roles span{margin-right: 10px;}
  .user_list_roles span:last-child{margin-right: 0;}
</style>
