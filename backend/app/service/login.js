'use strict';

const GeneratePassword = require('password-generator');

const Service = require('egg/index').Service;

class LoginService extends Service {

  // 登录
  async login(payload) {
    const { ctx, app: { model: { User, Session } } } = this;
    const { username, password } = payload;
    const data = {
      user: {},
      accessToken: '',
      refreshToken: ''
    };

    const user = await User.findByCredentials(username, password);
    data.user = user;

    // 未找到用户
    if (!user.id) {
      return data
    }

    // 未激活、不可用等筛选
    if (!user.isEnabled) {
      return data
    }

    const session = await Session.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.myConfig.constants.EXPIRATION_PERIOD.SHORT);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.myConfig.constants.EXPIRATION_PERIOD.LONG);

    data.user = user;
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    return data
  }

  // 社交登录
  async loginSocial(payload) {
    const { ctx, app: { model: { User, Session } } } = this;
    const conditions = {};
    const data = {
      user: {},
      accessToken: '',
      refreshToken: ''
    }

    // TODO：其实这里应该保证username应该不能重复，设置username为联合主键？
    if (payload.githubId) {
      conditions.githubId = payload.githubId
    } else if (payload.weixinId) {
      conditions.weixinId = payload.weixinId
    } else if (payload.username) {
      conditions.username = payload.username
    }

    const user = await User.findOne(conditions);
    data.user = user;

    // 未激活、不可用等筛选，那么将不再产生新的session
    if (!user.isEnabled) {
      return data
    }

    const session = await Session.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.myConfig.constants.EXPIRATION_PERIOD.SHORT);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.myConfig.constants.EXPIRATION_PERIOD.LONG);

    data.user = user
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    return data
  }

  // 短信登录
  async loginNote(payload) {
    const { ctx, app: { model: { User, Session } } } = this;
    const { mobile, verificationCode } = payload;
    const data = {
      user: {},
      accessToken: '',
      refreshToken: '',
      smsCheckData: {}
    };

    // 检查用户是否存在
    let user = await ctx.service.user.findByMobile(mobile);
    // 用户不存在则创建
    if (!user) {
      user = new ctx.model.User();
      user.mobile = mobile;
      user.password = GeneratePassword(10, false);
      user.username = mobile;
      user.displayName = mobile;
      // 配置用户角色
      const role = await ctx.service.role.findByDefaultName();
      user.roleId = role.id
      try {
        await user.save();
        // await ctx.model.User.create(user);
      } catch (ex) {
        throw ex;
      }
    }

    data.user = user;

    // 未激活、不可用等筛选
    if (!user.isEnabled) {
      return data
    }

    // 检查验证码
    const smsCheckData = await ctx.service.sms.checkLoginSmsCode(payload);
    data.smsCheckData = smsCheckData

    if (!smsCheckData.result) {
      return data
    }

    const session = await Session.createInstance(user);
    const accessToken = await ctx.helper.createToken(user, null, this.config.myConfig.constants.EXPIRATION_PERIOD.SHORT);
    const refreshToken = await ctx.helper.createToken(null, session, this.config.myConfig.constants.EXPIRATION_PERIOD.LONG);

    data.user = user;
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    return data
  }

  // 扫码登录
  loginScan(payload) {

  }

  // 忘记密码
  forgotPassword(payload) {

  }

  // 重置密码
  resetPassword(payload) {

  }
}

module.exports = LoginService;
