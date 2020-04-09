<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-permission-button="[`${identification}:add`]" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-permission-button="[`${identification}:add`]" class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-permission-button="[`${identification}:delete`]" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDeleteBatch">
        批量删除
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
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用/禁用" width="100px" align="center">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.isEnabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeIsEnabled(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permission-button="[`${identification}:edit`]" size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-permission-button="[`${identification}:delete`]" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" clearable placeholder="类型" @change="changeSelect">
            <el-option label="通知" value="通知" />
            <el-option label="消息" value="消息" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permissionButton from '@/directive/permission-button/index.js' // 权限判断指令
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { notificationService } from '@/services'

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
        title: undefined
      },
      multipleSelection: [],
      // 表单相关
      roleList: [],
      temp: {
        id: undefined,
        title: '通知：',
        type: '通知',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        type: [{ required: true, message: '必填', trigger: 'blur' }],
        title: [
          { required: true, message: '必填', trigger: 'blur' },
          { max: 40, message: '最多40个字符', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getList()
  },

  methods: {
    changeSelect(value) {
      console.log(value)
    },
    getList() {
      this.listLoading = true
      notificationService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('notification.getList-error:', error)
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
    changeIsEnabled(row) {
      if (row.isEnabled) {
        notificationService.enable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('notification.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      } else {
        notificationService.disable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('notification.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.$confirm('确认将该条数据删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deleteData()
      })
    },
    handleDeleteBatch() {
      const length = this.multipleSelection.length
      if (!length) {
        return
      }
      const ids = this.multipleSelection.map(item => item.id)
      this.$confirm(`确认将${length}条数据删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deleteDataBatch(ids)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '通知：',
        type: '通知',
        content: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          notificationService.postModel(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('notification.postModel-error:', error)
            this.getList()
            this.dialogFormVisible = false
            let errMsg = '添加失败'
            if (error.data.message === 'Validation error') {
              errMsg = '用户名不能重复'
            }
            this.$message({
              message: errMsg,
              type: 'error'
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          notificationService.putModel(this.temp.id, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('notification.postModel-error:', error)
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          })
        }
      })
    },
    deleteData() {
      notificationService.deleteModel(this.temp.id).then(() => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('notification.deleteModel-error:', error)
        this.getList()
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteDataBatch(ids) {
      notificationService.deleteModels(ids).then(() => {
        this.getList()
        this.$message({
          message: '批量删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('notification.deleteModels-error:', error)
        this.getList()
        this.$message({
          message: '批量删除失败',
          type: 'error'
        })
      })
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
