<template>
  <section class="hero is-fullheight-with-navbar page-builder">
    <!-- Hero head: will stick at the top -->
    <Navbar />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <BackHome />
      <div class="container">
        <el-card class="box-card">
          <figure class="image is-16by9">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <template v-else>
                <i class="el-icon-plus avatar-uploader-icon" />
                <div class="tip has-text-grey-light has-text-centered is-block subtitle">
                  建议：使用小于 30MB 的高质量 .jpg 文件
                </div>
              </template>
            </el-upload>
          </figure>
        </el-card>
      </div>
    </div>

    <footer-buttons />
  </section>
</template>

<script>
import Navbar from '~/components/Navbar'
import FooterButtons from '~/components/FooterButtons'
import BackHome from '~/components/BackHome'

export default {
  components: {
    Navbar,
    FooterButtons,
    BackHome
  },
  async asyncData () {
    // const serverUrl = process.env.SERVER_URL
    // const { data } = await axios.get(`${serverUrl}/api/common/story`)
    // return { list: data.rows }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  mounted () {

  },
  destroyed () {

  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 32

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  .hero {

    .hero-body {
      padding-top: 64px;
      align-items: flex-start;

      .container {
        margin-top: 12px;
        max-width: 960px;
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .page-builder {
    .avatar-uploader {
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #e60023;
    }

    .avatar-uploader-icon {
      font-size: 44px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar {
      display: block;
    }

    .el-upload .tip {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>
