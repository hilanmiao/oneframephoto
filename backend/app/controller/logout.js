'use strict';

const Controller = require('./base');

class LogoutController extends Controller {

  // 登出
  async logout() {
    const { app, ctx, service } = this;
    const user = ctx.request.user
    const session = ctx.request.session
    console.log(session)
    if (session) {
      const data = await service.logout.logout(session.id)
      if (data) {
        this.success({ ctx, data })
      } else {
        ctx.helper.notFound({ ctx, message: 'Session not found' })
      }
    } else {
      ctx.helper.badRequest({ ctx, message: 'Refresh token required in auth header to log out' })
    }
  }
}

module.exports = LogoutController;
