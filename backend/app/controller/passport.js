'use strict';

const Jwt = require('jsonwebtoken'); // token插件

const Controller = require('egg').Controller;

class PassportController extends Controller {
  async authCallbackSuccess() {
    const { app, ctx } = this
    const tokenPayload = {
      username: ctx.user.username,
      githubId: ctx.user.githubId,
      weixinId: ctx.user.weixinId
    }
    const token = await Jwt.sign(tokenPayload,
      app.config.myConfig.private.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1m' }
    )
    const url = `${app.config.myConfig.private.WEB_C_URL}/login/social?token=${token}`;
    return this.ctx.redirect(url);
  }

  async authCallbackFail() {
    const { app, ctx } = this
    const url = `${app.config.myConfig.private.WEB_C_URL}/login`;
    return this.ctx.redirect(url);
  }
}

module.exports = PassportController;
