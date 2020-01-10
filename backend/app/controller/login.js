'use strict';

const Controller = require('./base');

class LoginController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.loginRule = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 登录
  async login() {
    const { app, ctx, service } = this;
    ctx.validate(this.loginRule);
    const { username, password } = ctx.request.body
    const payload = { username, password }
    let data = await service.login.login(payload);

    if (!data.user) {
      ctx.helper.unauthorized({ ctx, message: '无效的账户名或密码' })
    } else if (!data.user.isEnabled) {
      ctx.helper.unauthorized({ ctx, message: '账户已经被禁用' })
    } else {
      data = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
      this.success({ ctx, data })
    }
  }

  // 社交登录
  async loginSocial() {
    const { app, ctx, service } = this;
    const decodedToken = ctx.helper.decodeToken(ctx.request.body.token);
    let data = await service.login.loginSocial(decodedToken);
    if (!data.user) {
      ctx.helper.unauthorized({ ctx, message: '无效的账户名或密码' })
    } else if (!data.user.isEnabled) {
      ctx.helper.unauthorized({ ctx, message: '账户已经被禁用' })
    } else {
      data = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
      this.success({ ctx, data })
    }
  }
}

module.exports = LoginController;
