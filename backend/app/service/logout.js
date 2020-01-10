'use strict';

const Service = require('egg/index').Service;

class LogoutService extends Service {

  // 登出
  async logout(id) {
    const { ctx, app: { model: { User, Session } } } = this;

    return await Session.destroy(id)
  }
}

module.exports = LogoutService;
