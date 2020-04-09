<template>
  <div>
    <div class="title">
      账号绑定
      <span class="tips">
        完成
        <b class="danger">3/4</b>
      </span>
    </div>
    <el-divider></el-divider>
    <div class="item-box">
      <div class="left">
        <font-awesome-icon :icon="['fas', 'envelope']" size="2x" class="icon"/>
      </div>
      <div class="center">
        <p class="subtitle"><strong>邮箱</strong> shenyingzgd@126.com 已绑定</p>
        <p class="content">可用邮箱加密码登录，可用邮箱找回密码</p>
      </div>
      <div class="right">
        <el-button round>更改</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="item-box">
      <div class="left">
        <font-awesome-icon :icon="['fas', 'mobile-alt']" size="2x" class="icon"/>
      </div>
      <div class="center">
        <p class="subtitle">
          <strong>手机</strong>
          <span>183******68</span>
          <span class="unbound">未设置</span>
        </p>
        <p class="content">可用手机号加密码登录，可通过手机号找回密码</p>
      </div>
      <div class="right">
        <el-button round type="danger">绑定</el-button>
        <el-button round>更改</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="item-box">
      <div class="left">
        <font-awesome-icon :icon="['fas', 'mobile-alt']" size="2x" class="icon"/>
      </div>
      <div class="center">
        <p class="subtitle"><strong>密码</strong> 已设置</p>
        <p class="content">用于保护账号信息和登录安全</p>
      </div>
      <div class="right">
        <el-button round>更改</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="item-box">
      <div class="left">
        <font-awesome-icon :icon="['fas', 'mobile-alt']" size="2x" class="icon"/>
      </div>
      <div class="center">
        <p class="subtitle"><strong>社交账号</strong></p>
        <p class="content">绑定第三方账号，可以直接登录，还可以将内容同步到以下平台，与更多好友分享</p>
      </div>
    </div>

    <div class="social">
      <div class="item">
        <div class="left">
          <font-awesome-icon :icon="['fab', 'github-alt']" size="3x" class="icon github unbound"/>
        </div>
        <div class="right">
          <p class="brand"><strong>github</strong></p>
          <p class="info unbound">未绑定</p>
          <el-button size="mini" type="danger">添加绑定</el-button>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <font-awesome-icon :icon="['fab', 'weixin']" size="3x" class="icon weixin" :style="{ color: '#1BB723' }"/>
        </div>
        <div class="right">
          <p class="brand"><strong>微信</strong></p>
          <p class="info">已绑定 毛毛虫</p>
          <el-button size="mini">解除绑定</el-button>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <font-awesome-icon :icon="['fab', 'weibo']" size="3x" class="icon weibo" :style="{ color: '#EA5D5C' }"/>
        </div>
        <div class="right">
          <p class="brand"><strong>微博</strong></p>
          <p class="info">已绑定 毛毛虫</p>
          <el-button size="mini">解除绑定</el-button>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <font-awesome-icon :icon="['fab', 'qq']" size="3x" class="icon qq" :style="{ color: '#008CFF' }"/>
        </div>
        <div class="right">
          <p class="brand"><strong>QQ</strong></p>
          <p class="info">已绑定 毛毛虫</p>
          <el-button size="mini">解除绑定</el-button>
        </div>
      </div>
    </div>
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
  $unbound-color: #f01414;

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

  .item-box {
    display: flex;
    height: 50px;
    align-items: center;
    > .left {
      display: flex;
      align-items: center;
      padding: 0 30px;
      width: 100px;
      justify-content: center;
      .icon {
        color: #d9dde1;
      }
    }
    .center {
      flex: 1;
      p {
        margin: 0;
      }
      .subtitle {
        color: #2b333b;
        font-size: 14px;
        padding-bottom: 6px;
        strong {
          font-size: 16px;
        }
        span {
          padding-left: 4px;
          &.unbound {
            color: $unbound-color;
          }
        }
      }
      .content {
        color: #93999f;
        font-size: 14px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      padding: 0 30px;
    }
  }

  .social {
    padding-left: 100px;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    .item {
      display: flex;
      padding-right: 60px;
      .left {
        color: #c8cdd2;
        display: flex;
        align-items: center;
        padding-right: 14px;
        justify-content: center;
      }
      .right {
        p {
          margin: 0;
        }
        .brand {
          font-size: 16px;
        }
        .info {
          font-size: 12px;
          color: #71777d;
          padding-top: 6px;
          padding-bottom: 6px;
          &.unbound {
            color: $unbound-color;
          }
        }
      }
    }
  }
</style>
