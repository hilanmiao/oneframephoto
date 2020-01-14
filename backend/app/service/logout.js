'use strict';

const Service = require('egg/index').Service;

class LogoutService extends Service {

  // 登出
  async logout(id) {
    const { ctx, app: { model: { User, Session } } } = this;
    const model = await Session.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }
}

module.exports = LogoutService;
