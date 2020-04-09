<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-permission-button="[`${identification}:add`]" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column label="用户名" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录信息" min-width="400px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createdAt }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import permissionButton from '@/directive/permission-button/index.js' // 权限判断指令
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { loginLogService } from '@/services'

export default {
  components: { Pagination },
  directives: { waves, permissionButton },
  filters: {

  },
  props: {},

  data() {
    return {
      // 路由唯一标志
      identification: this.$route.meta.identification,
      // 列表相关
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined
      },
      multipleSelection: []
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      loginLogService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('loginLog.getList-error:', error)
        this.listLoading = false
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fixed-width {
    .el-button--mini {
      padding: 7px 10px;
      width: auto;
    }
  }
</style>
