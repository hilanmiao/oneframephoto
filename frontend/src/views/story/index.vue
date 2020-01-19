<template>
  <div class="app-container page-story">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="150px" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.photo"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="temp.introduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="图片" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handlePhotoUploadSuccess"
            :on-error="handlePhotoUploadError"
            :http-request="uploadPhoto"
          >
            <img v-if="temp.photo" :src="temp.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
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
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import config from '@/config'
import { storyService, fileService } from '@/services'

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
        title: undefined
      },
      multipleSelection: [],
      // 表单相关
      temp: {
        id: undefined,
        title: '',
        introduction: '',
        photo: '',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        title: [{ required: true, message: '必填', trigger: 'blur' }],
        photo: [{ required: true, message: '必填', trigger: 'blur' }],
        introduction: [{ required: true, message: '必填', trigger: 'blur' }],
        content: [{ required: true, message: '必填', trigger: 'blur' }]
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
      storyService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('story.getList-error:', error)
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
        storyService.enable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('story.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      } else {
        storyService.disable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('story.enable-error:', error)
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
    beforeUploadPhoto(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
        return false
      }
      return true
    },
    uploadPhoto(content) {
      const checkUpload = this.beforeUploadPhoto(content.file)
      if (!checkUpload) {
        return
      }
      console.log(content)
      fileService.uploadPhoto(content.file.name, content.file).then(response => {
        content.onSuccess(response)
      }).catch(error => {
        content.onError(error)
      })
    },
    handlePhotoUploadSuccess(response, file) {
      console.log(response)
      this.temp.photo = config.serverURI + response.data.url
    },
    handlePhotoUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
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
        title: '',
        introduction: '',
        photo: '',
        content: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          storyService.postModel(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('story.postModel-error:', error)
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
          storyService.putModel(this.temp.id, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('story.postModel-error:', error)
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
      storyService.deleteModel(this.temp.id).then(() => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('story.deleteModel-error:', error)
        this.getList()
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteDataBatch(ids) {
      storyService.deleteModels(ids).then(() => {
        this.getList()
        this.$message({
          message: '批量删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('story.deleteModels-error:', error)
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
  .page-story {
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

</style>
