<template>
  <section class="hero is-fullheight-with-navbar page-builder">
    <!-- Hero head: will stick at the top -->
    <Navbar />

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <BackHome />
      <div class="container">
        <div class="card">
          <nav class="level">
            <div class="level-left">
              <input class="input" type="text" placeholder="添加你的标题">
            </div>
            <div class="level-right">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select name="country">
                      <option value="生活">
                        生活
                      </option>
                      <option value="旅行">
                        旅行
                      </option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button type="submit" class="button is-danger">
                    保存
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div class="card-image">
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
                  <el-progress v-show="coverProgressPercent !== 0" type="circle" :percentage="coverProgressPercent" />
                </template>
              </el-upload>
            </figure>
          </div>
          <div class="card-content">
            <div
              v-quill:myQuillEditor="editorOption"
              class="quill-editor"
              :content="content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </div>
        </div>
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
      imageUrl: '',
      coverProgressPercent: 0,
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  },
  mounted () {
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
    setTimeout(() => {
      this.content = 'i am changed'
    }, 3000)
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
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
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

        .card {
          nav.level {
            padding-top: 1.5em;
            padding-right: 1.5em;
            padding-left: 1.5em;
            margin: 0;

            .level-left {
              flex: 1;
              padding-right: 15px;
            }

            .level-right {
              .button {
                background-color: #e60023;
              }

              .button:hover {
                background-color: #ad081b;
              }
            }
          }

          .card-image {
            padding: 1.5rem;
          }

          .card-content {
            padding-top: 0;
          }
        }
      }
    }
  }

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .page-builder {
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

    .avatar-uploader {
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    .el-upload {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .el-progress {
      position: absolute;
    }

    .el-upload .tip {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>
