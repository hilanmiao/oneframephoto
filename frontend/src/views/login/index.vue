<template>
  <div class="login-container">
    <canvas-star-background />
    <div class="box">
      <div class="box-color" />
      <div class="box-image">
        <img src="@/assets/images/login-left.png" alt="">
      </div>
      <div class="box-title">
        <img src="@/assets/images/logo.png" alt="" class="logo">
        <div class="info">
          <span class="title">{{ title }}</span>
          <span class="sub-title">{{ subTitle }}</span>
        </div>
      </div>
      <el-card class="box-card">
        <div class="left" />
        <div class="right">
          <el-tabs v-model="activeTabName">
            <el-tab-pane label="密码登录" name="account">
              <account-login />
            </el-tab-pane>
            <el-tab-pane label="短信登录" name="note">
              <note-login />
            </el-tab-pane>
            <el-tab-pane label="扫码登录" name="scan">
              <scan-login />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { authService } from '@/services'
import { Message } from 'element-ui'
import config from '@/config'
import defaultSettings from '@/settings'
import CanvasStarBackground from '@/components/CanvasStarBackground'
import AccountLogin from './components/AccountLogin'
import NoteLogin from './components/NoteLogin'
import ScanLogin from './components/ScanLogin'

export default {
  name: 'Login',
  components: { AccountLogin, NoteLogin, ScanLogin, CanvasStarBackground },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      title: defaultSettings.title || 'Vue Element Admin',
      subTitle: defaultSettings.subTitle || 'Vue Element Admin',
      loginForm: {
        username: 'admin',
        password: '0123456789'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      shortUrl: '',
      activeTabName: 'account'
    }
  },
  computed: {
    // The '/auth/{social}' endpoint will first authenticate the user using the third party
    // social authentication, then the appy server will redirect us to the '/login/social/' view
    loginGithubURI() {
      return config.serverURI + '/passport/github'
    },
    loginWeixinURI() {
      return config.serverURI + '/passport/weixin'
    },
    loginDingtalkURI() {
      return config.serverURI + '/passport/dingtalk'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    go(uri) {
      location.href = uri
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          authService.login(this.loginForm)
            .then(response => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch(error => {
              this.loading = false
              Message({
                message: error.data.message,
                type: 'error',
                duration: 5 * 1000
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
  $loginWidth: 900px;
  $loginHeight: 500px;
  $colorExtraHeight: 40px;
  $imageExtraWidth: 40px;
  $borderRadius: 8px;
  $formPaddingLeft: 80px;

  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: radial-gradient(circle,#99CCCC, #7171B7);

    .box {
      position: relative;
    }

    .box-color {
      width: calc(#{$loginWidth}/2);
      height: calc(#{$loginHeight} + #{$colorExtraHeight});
      position: absolute;
      background-image: linear-gradient(to bottom , #409EFF , #B3D8FF);
      margin-top: calc(-#{$colorExtraHeight}/2);
      border-radius: $borderRadius;
      clip-path: polygon(0 0,75% 0,95% 100%, 0px 100%)
    }

    .box-image {
      position: absolute;
      height: $loginHeight;
      width: calc(#{$loginWidth}/2 + #{$imageExtraWidth}/2);
      display: flex;
      align-items: center;
      margin-left: -40px;
      img {
        max-width: 100%;
      }
    }

    .box-title {
      position: absolute;
      top: 40px;
      left: calc(#{$loginWidth}/2 + #{$imageExtraWidth}/2);
      display: flex;
      align-items: center;
      .logo {
        height: 44px;
        width: 44px;
      }
      .info {
        padding-left: 6px;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 20px;
          color: #303133;
          font-weight: bold;
        }
        .sub-title {
          font-size: 12px;
          padding-top: 2px;
          color: #909399;
        }
      }
    }

    .box-card {
      height: $loginHeight;
      width: $loginWidth;
      border-radius: $borderRadius;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);

      .left {
        flex: 1;
      }

      .right {
        flex: 1;
        padding-left: calc(#{$formPaddingLeft}/2);

        .el-tabs {
          padding-right: calc(#{$formPaddingLeft}/2);
        }
      }
    }
  }
</style>

<style lang="scss">
  .login-container {
    .el-card__body {
      width: 100%;
      display: flex;
    }

    .el-input {
      height: 40px;
      line-height: 40px;

      input {
        height: 40px;
        line-height: 40px;
        padding-left: 35px;
      }
    }

    .el-input__prefix {
      width: 30px;
      color: #889aa4;
    }
    .el-input__suffix {
      width: 30px;
      color: #889aa4;
    }
  }
</style>
