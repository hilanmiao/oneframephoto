'use strict';

const _ = require('lodash')

const Controller = require('./base');

class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 检查email
  checkEmail() {
  }

  // 获取当前用户资料
  async getCurrentUserProfile() {
    const { app, ctx, service } = this;
    const user = ctx.request.user
    // console.log('user', ctx.request.user)
    // console.log('session', ctx.request.session)
    const data = JSON.parse(JSON.stringify(user))
    data.roles = [{ roleId: '1', roleName: 'administrator' }]
    data.permissions = []
    this.success({ ctx, data })
  }

  // 更新当前用户密码
  async updateCurrentUserPassword() {
    const { app, ctx, service } = this;
    const { password, passwordNew } = ctx.request.body;
    const payload = { password: passwordNew };
    // 判断原密码
    const currentUser = ctx.request.user
    console.log(currentUser)
    if (currentUser.password === password) {
      const user = await service.user.updateCurrentUserPassword(currentUser.id, payload);
      if (!user) {
        this.fail({ ctx });
      } else {
        this.success({ ctx });
      }
    } else {
      this.fail({ ctx });
      // ctx.helper.unauthorized({ ctx });
    }
  }

  // 更新当前用户资料
  async updateCurrentUserProfile() {
    const { app, ctx, service } = this;
    const { displayName, sex, mobile, email, profileImageUrl } = ctx.request.body;
    const payload = { displayName, sex, mobile, email, profileImageUrl };
    const currentUser = ctx.request.user
    const user = await service.user.updateCurrentUserProfile(currentUser.id, payload);
    if (!user) {
      this.fail({ ctx });
    } else {
      this.success({ ctx });
    }
  }

  // 启用账户
  enableAccount() {
    const { app, ctx, service } = this;
    const id = ctx.params.id
  }

  // 禁用账户
  disableAccount() {
  }

  // 激活账户
  activateAccount() {
  }

  // 灭活账户
  deactivateAccount() {
  }

  // 获取用户权限
  getUserScope() {
  }
}

module.exports = UserController;
