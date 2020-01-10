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

  // 注册
  async register() {
    const { app, ctx, service } = this;
  }
}

module.exports = LoginController;
