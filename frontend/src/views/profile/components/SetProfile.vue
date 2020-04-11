<template>
  <div class="">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" width="460">
      <el-form-item label="昵称">
        <el-input v-model="temp.displayName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="temp.mobile" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="temp.email" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="temp.introduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="temp.sex" label="1">男</el-radio>
        <el-radio v-model="temp.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive

import { userService } from '@/services'
import { mapGetters } from 'vuex'

export default {
  directives: { waves },
  filters: {

  },
  props: {},

  data() {
    return {
      temp: {
        displayName: '',
        sex: '',
        introduction: ''
      },
      rules: {

      }
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  },

  watch: {
    // user: {
    //   handler: (val, oldVal) => {
    //     this.temp.displayName = val.displayName
    //     this.temp.mobile = val.mobile
    //     this.temp.introduction = val.introduction
    //     this.temp.sex = val.sex
    //   },
    //   deep: true
    // }
  },

  created() {
    this.temp.displayName = this.user.displayName
    this.temp.mobile = this.user.mobile
    this.temp.email = this.user.email
    this.temp.introduction = this.user.introduction
    this.temp.sex = this.user.sex
  },

  methods: {
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          userService.putMyProfile(this.temp).then((response) => {
            this.$message({
              message: '用户信息修改成功',
              type: 'success'
            })

            // 更新内存中的用户信息
            console.log(response.data)
            this.$store.commit('auth/SET_USER', response.data)
          }).catch(error => {
            console.error('user.putMyPassword-error:', error)
            this.$message({
              message: error.data.message,
              type: 'error'
            })
          })
        }
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
