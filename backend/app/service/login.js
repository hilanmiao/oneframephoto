'use strict';

const Service = require('egg/index').Service;

class LoginService extends Service {

  // 登录
  async login(payload) {
    const { ctx, app: { model: { User, Session } } } = this;
    const { username, password } = payload
    const user = await User.findByCredentials(username, password)
    let data = { user }

    // 未激活、不可用等筛选
    if (!user.isEnabled) {
      return data
    }

    const session = await Session.createInstance(user)
    const accessToken = await ctx.helper.createToken(user, null, this.config.myConfig.constants.EXPIRATION_PERIOD.SHORT)
    const refreshToken = await ctx.helper.createToken(null, session, this.config.myConfig.constants.EXPIRATION_PERIOD.LONG)
    data = {
      user,
      accessToken,
      refreshToken
    }
    return data
  }

  // 登录
  async loginSocial(payload) {
    const { ctx, app: { model: { User, Session } } } = this;
    const conditions = {}
    // TODO：其实这里应该保证username应该不能重复，设置username为联合主键？
    if (payload.githubId) {
      conditions.githubId = payload.githubId
    } else if (payload.weixinId) {
      conditions.weixinId = payload.weixinId
    } else if (payload.username) {
      conditions.username = payload.username
    }
    const user = await User.findOne(conditions)
    let data = { user }

    // 未激活、不可用等筛选，那么将不再产生新的session
    if (!user.isEnabled) {
      return data
    }

    const session = await Session.createInstance(user)
    const accessToken = await ctx.helper.createToken(user, null, this.config.myConfig.constants.EXPIRATION_PERIOD.SHORT)
    const refreshToken = await ctx.helper.createToken(null, session, this.config.myConfig.constants.EXPIRATION_PERIOD.LONG)
    data = {
      user,
      accessToken,
      refreshToken
    }
    return data
  }

  // 忘记密码
  forgotPassword(payload) {

  }

  // 重置密码
  resetPassword(payload) {

  }
}

module.exports = LoginService;
