<template>
  <div>
    <div class="title">
      账号绑定
      <span class="tips">
        完成
        <b class="danger">3/4</b>
      </span>
    </div>
    <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .title {
    font-size: 16px;
    font-weight: 700;

    .tips {
      font-size: 12px;
      color: #93999f;
      margin-left: 18px;
      font-weight: 400;
      b {
        color: #EF1300!important;
        font-weight: bold;
      }
    }
  }
</style>
