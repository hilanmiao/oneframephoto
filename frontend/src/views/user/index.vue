<template>
  <div class="app-container page-user">
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="标题" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="登录名" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.displayName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="150px" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.profileImageUrl"
            fit="fit"
          />
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
          <el-button size="mini" type="success">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="temp.roleId" clearable placeholder="请选择" @change="changeSelect">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入" />
          用户名不能重复
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="temp.displayName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="temp.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="temp.mobile" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="temp.introduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="temp.sex" label="1">男</el-radio>
          <el-radio v-model="temp.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :http-request="upload"
          >
            <img v-if="temp.profileImageUrl" :src="temp.profileImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
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

import config from '@/config'
import { userService, roleService, fileService } from '@/services'

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
      multipleSelection: [],
      // 表单相关
      roleList: [],
      temp: {
        id: undefined,
        username: '',
        password: '',
        displayName: '',
        email: '',
        mobile: '',
        sex: '1',
        introduction: '',
        profileImageUrl: '',
        roleId: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        roleId: [{ required: true, message: '必填', trigger: 'blur' }],
        username: [{ required: true, message: '必填', trigger: 'blur' }],
        password: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 6, message: '至少6个字符', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this._getRoleList()
    this.getList()
  },

  methods: {
    changeSelect(value) {
      console.log(value)
    },
    getList() {
      this.listLoading = true
      userService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('user.getList-error:', error)
        this.listLoading = false
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    upload(content) {
      const checkUpload = this.beforeUpload(content.file)
      if (!checkUpload) {
        return
      }
      console.log(content)
      fileService.upload(content.file.name, content.file).then(response => {
        content.onSuccess(response)
      }).catch(error => {
        content.onError(error)
      })
    },
    handleUploadSuccess(response, file) {
      console.log(response)
      this.temp.profileImageUrl = config.serverURI + response.data.url
    },
    handleUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    changeIsEnabled(row) {
      if (row.isEnabled) {
        userService.enable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('user.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      } else {
        userService.disable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('user.enable-error:', error)
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
        username: '',
        password: '',
        displayName: '',
        email: '',
        mobile: '',
        sex: '1',
        introduction: '',
        profileImageUrl: '',
        roleId: undefined
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          userService.postModel(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('user.postModel-error:', error)
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
          userService.putModel(this.temp.id, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('user.postModel-error:', error)
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
      userService.deleteModel(this.temp.id).then(() => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('user.deleteModel-error:', error)
        this.getList()
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteDataBatch(ids) {
      userService.deleteModels(ids).then(() => {
        this.getList()
        this.$message({
          message: '批量删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('user.deleteModels-error:', error)
        this.getList()
        this.$message({
          message: '批量删除失败',
          type: 'error'
        })
      })
    },
    _getRoleList() {
      roleService.getAll().then(response => {
        this.roleList = response.data.rows
      }).catch(error => {
        console.error('role.getList-error:', error)
        this.$message({
          message: '获取角色列表失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .page-user {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fixed-width {
    .el-button--mini {
      padding: 7px 10px;
      width: auto;
    }
  }
</style>
