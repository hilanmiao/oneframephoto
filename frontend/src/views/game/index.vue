<template>
  <div class="app-container page-game">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="规则" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rule }}</span>
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
      <el-table-column label="封面" width="150px" align="center">
        <template slot-scope="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.cover"
            fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column label="游戏演示地址" align="center">
        <template slot-scope="{row}">
          <el-link type="primary" :href="row.url" target="_blank">{{ row.url }}</el-link>
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
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
        <el-form-item label="游戏名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="规则" prop="rule">
          <el-input v-model="temp.rule" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleCoverUploadSuccess"
            :on-error="handleCoverUploadError"
            :on-progress="handleCoverUploadProgress"
            :http-request="uploadCover"
          >
            <img v-if="temp.cover" :src="temp.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div v-show="coverProgressPercent !== 0" class="progress-wrapper">
              <el-progress type="circle" :percentage="coverProgressPercent" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="压缩文件" prop="url">
          <el-upload
            ref="uploadZip"
            class="upload-zip"
            drag
            action="#"
            accept=".zip"
            :limit="1"
            :on-success="handleZipUploadSuccess"
            :on-error="handleZipUploadError"
            :on-progress="handleZipUploadProgress"
            :http-request="uploadZip"
            :on-exceed="handleZipExceed"
            :on-remove="handleZipRemove"
            :before-remove="beforeZipRemove"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传zip、rar文件，且不超过100mb</div>
          </el-upload>
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
import config from '@/config'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import { gameService, fileService } from '@/services'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {

  },
  props: {},

  data: () => ({
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
      remark: '',
      rule: '',
      cover: '',
      url: ''
    },
    dialogFormVisible: false,
    dialogStatus: '',
    textMap: {
      update: '编辑',
      create: '添加'
    },
    rules: {
      name: [{ required: true, message: '必填', trigger: 'blur' }],
      rule: [{ required: true, message: '必填', trigger: 'blur' }],
      cover: [{ required: true, message: '必填', trigger: 'blur' }],
      url: [{ required: true, message: '必填', trigger: 'blur' }]
    },
    // 头像上传
    coverProgressPercent: 0
  }),

  computed: {},

  watch: {},

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      gameService.getList(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.count
        this.listLoading = false
      }).catch(error => {
        console.error('game.getList-error:', error)
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
        gameService.enable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('game.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      } else {
        gameService.disable(row.id).then(() => {
          this.getList()
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
        }).catch(error => {
          console.error('game.enable-error:', error)
          this.getList()
          this.$message({
            message: '状态修改失败',
            type: 'error'
          })
        })
      }
    },
    beforeUploadCover(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
        return false
      }
      return true
    },
    uploadCover(content) {
      const checkUpload = this.beforeUploadCover(content.file)
      if (!checkUpload) {
        return
      }
      console.log(content)
      fileService.upload(content.file.name, content.file, {
        // axios 上传进度事件
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
          // 更新element upload progress
          content.onProgress({ percent: percentCompleted })
          this.coverProgressPercent = percentCompleted
        }
      }).then(response => {
        content.onSuccess(response)
        setTimeout(() => {
          this.coverProgressPercent = 0
        }, 1000)
      }).catch(error => {
        content.onError(error)
      })
    },
    handleCoverUploadSuccess(response, file) {
      console.log(response)
      this.temp.cover = config.serverURI + response.data.url
    },
    handleCoverUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    handleCoverUploadProgress(event, file, fileList) {
      console.log(event, file)
    },
    beforeUploadZip(file) {
      // const isZip = file.type === ('application/zip' || 'application/x-rar' || 'application/x-7z-compressed')
      const isZip = file.type === ('application/zip')
      const isLt100M = file.size / 1024 / 1024 < 100

      if (!isZip) {
        this.$message.error('上传头像图片只能是 zip 格式!')
        return false
      }
      if (!isLt100M) {
        this.$message.error('上传头像图片大小不能超过 100MB!')
        return false
      }
      return true
    },
    uploadZip(content) {
      const checkUpload = this.beforeUploadZip(content.file)
      if (!checkUpload) {
        // 清空已上传文件列表
        this.$refs.uploadZip.clearFiles()
        return
      }
      console.log(content)
      fileService.uploadZip(content.file.name, content.file, {
        // axios 上传进度事件
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted)
          // 更新element upload progress
          content.onProgress({ percent: percentCompleted })
        }
      }).then(response => {
        // 调用element 上传成功钩子
        content.onSuccess(response)
      }).catch(error => {
        // 调用element 上传失败钩子
        content.onError(error)
      })
    },
    handleZipUploadSuccess(response, file) {
      console.log(response)
      this.temp.url = config.serverURI + response.data.url
    },
    handleZipUploadError(err) {
      console.log(err)
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    handleZipUploadProgress(event, file, fileList) {
      console.log(event, file)
    },
    handleZipRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeZipRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleZipExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.$message.warning(`当前限制选择 1 个文件`)
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
        name: '',
        remark: '',
        rule: '',
        cover: '',
        url: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          gameService.postModel(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('game.postModel-error:', error)
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          gameService.putModel(this.temp.id, this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }).catch(error => {
            console.error('game.postModel-error:', error)
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
      gameService.deleteModel(this.temp.id).then(() => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('game.deleteModel-error:', error)
        this.getList()
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      })
    },
    deleteDataBatch(ids) {
      gameService.deleteModels(ids).then(() => {
        this.getList()
        this.$message({
          message: '批量删除成功',
          type: 'success'
        })
      }).catch(error => {
        console.error('game.deleteModels-error:', error)
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
  .page-game {
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

    .el-upload {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .el-upload .progress-wrapper {
      width: 100%;
      position: absolute;
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .el-progress {
      position: absolute;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
