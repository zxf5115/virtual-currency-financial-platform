<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'menu_form'}">
              <el-button v-if="isAuth('menu:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-select v-model="dataForm.category" :placeholder="$t('common.please_select') + $t('menu.category')">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(v,k) in categoryList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>

      <el-table :data="dataList" row-key="id" border style="width: 100%; ">
        <el-table-column prop="remark" header-align="center" min-width="150" :label="$t('menu.title')">
        </el-table-column>

        <el-table-column header-align="center" align="center" :label="$t('menu.icon')">
          <template slot-scope="scope">
            <icon v-if="scope.row.icon" :name="scope.row.icon || ''" width="15"></icon>
          </template>
        </el-table-column>

        <el-table-column prop="category" header-align="center" align="center" :label="$t('menu.category')">
          <template slot-scope="scope">
            {{ scope.row.category.text }}
          </template>
        </el-table-column>

        <el-table-column prop="type" header-align="center" align="center" :label="$t('menu.type')">
        </el-table-column>

        <el-table-column prop="url" header-align="center" align="center" :show-overflow-tooltip="true" :label="$t('menu.url')">
          <template slot-scope="scope">
            {{ scope.row.url || $t('common.omit') }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" header-align="center" align="center" width="200" :label="$t('common.handle')">
          <template slot-scope="scope">
            <el-button v-if="isAuth('menu:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'menu_form', query: {id: scope.row.id}})">
              {{ $t('common.update') }}
            </el-button>

            <el-button v-if="isAuth('menu:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                <span class="delete">{{$t('common.delete')}}</span>
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import { treeDataTranslate } from '@/utils/tree'
  export default {
    extends: common,
    data() {
      return {
        model: 'menu',
        categoryList: [
          {'id': 1, 'title': '平台'},
          {'id': 2, 'title': '机构'},
          {'id': 3, 'title': '平台|机构'}
        ],
        dataForm: [
          'category'
        ],
        dataList: [],
      };
    },
    methods:
    {
      // 获取数据列表
      getDataList ()
      {
        this.dataListLoading = true
        this.$http(
        {
          url: this.$http.adornUrl('/menu/list'),
          method: 'get',
          params: this.$http.adornParams({
            'category': this.dataForm.category
          })
        }).then(({data}) =>
        {
          this.dataList = treeDataTranslate(data.data, 'id')
          this.dataListLoading = false
        })
      },
    },
    created() {
      this.getDataList()
    }
  };
</script>
