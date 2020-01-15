<template>
  <div class="app-container page-role">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDeleteBatch">
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
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
          <el-button size="mini" type="success" @click="handlePermission(row)">
            权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入" />
          名称不能重复
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
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
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { roleService } from '@/services'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {

  },
  props: {},

  data() {
    return {
    // 列表相关
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      multipleSelection: [],
      // 表单相关
      temp: {
        id: undefined,
        name: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }]
      }
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
      roleService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('role.getList-error:', error)
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
        roleService.enable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('role.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      } else {
        roleService.disable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('role.enable-error:', error)
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
    handlePermission(row) {
      this.$router.push({
        name: 'SysPermission',
        params: {
          role: row
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        remark: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          roleService.postModel(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('role.postModel-error:', error)
            this.getList()
            this.dialogFormVisible = false
            let errMsg = '添加失败'
            if (error.data.message === 'Validation error') {
              errMsg = '名称不能重复'
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
          roleService.putModel(this.temp.id, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('role.postModel-error:', error)
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
      roleService.deleteModel(this.temp.id).then(() => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('role.deleteModel-error:', error)
        this.getList()
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteDataBatch(ids) {
      roleService.deleteModels(ids).then(() => {
        this.getList()
        this.$message({
          message: '批量删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('role.deleteModels-error:', error)
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
