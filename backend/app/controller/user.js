'use strict';

const _ = require('lodash')
const Bcrypt = require('bcryptjs');

const Controller = require('./base');

class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { user } } = this;
    const { username, password, displayName, email, mobile, sex, profileImageUrl, introduction, roleId } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { username, password, displayName, email, mobile, sex, profileImageUrl, introduction, roleId }
    const data = await user.create(payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 删除
  async destroy() {
    const { ctx, service: { user } } = this;
    const id = ctx.params.id;
    const data = await user.destroy(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { user } } = this;
    const ids = ctx.request.body;
    const data = await user.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { user } } = this;
    const id = ctx.params.id;
    const { username, password, displayName, email, mobile, sex, profileImageUrl, introduction, roleId } = ctx.request.body;
    const payload = { username, password, displayName, email, mobile, sex, profileImageUrl, introduction, roleId };
    const data = await user.update(id, payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 详情
  async show() {
    const { ctx, service: { user } } = this;
    const id = ctx.params.id;
    const data = await user.show(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 可用
  async enable() {
    const { ctx, service: { user } } = this;
    const id = ctx.params.id;
    const data = await user.enable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 不可用
  async disable() {
    const { ctx, service: { user } } = this;
    const id = ctx.params.id;
    const data = await user.disable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 列表
  async index() {
    const { ctx, service: { user } } = this;
    const { page, limit, username } = ctx.request.query;
    const payload = { page, limit, username };
    const data = await user.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { user } } = this;
    const payload = { };
    const data = await user.all(payload);
    this.success({ ctx, data });
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
    // const data = JSON.parse(JSON.stringify(user))
    // data.roles = [{ roleId: '1', roleName: 'administrator' }]
    // data.permissions = []
    const data = await service.user.getCurrentUserProfile(user.id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 更新当前用户密码
  async updateCurrentUserPassword() {
    const { app: { model: { User } }, ctx, service } = this;
    const { password, passwordNew } = ctx.request.body;
    // 判断原密码
    const currentUser = ctx.request.user
    console.log(currentUser)
    const passwordMatch = await Bcrypt.compare(password, currentUser.password);
    if (passwordMatch) {
      // 新的密码Hash处理
      const generateHash = await User.generateHash(passwordNew)
      const payload = { password: generateHash.hash };
      const user = await service.user.updateCurrentUserPassword(currentUser.id, payload);
      if (!user) {
        this.fail({ ctx, message: '用户不存在' });
      } else {
        // 登出
        const session = ctx.request.session
        console.log(session)
        if (session) {
          await service.logout.logout(session.id)
        }
        this.success({ ctx });
      }
    } else {
      this.fail({ ctx, message: '原密码不正确' });
      // ctx.helper.unauthorized({ ctx });
    }
  }

  // 更新当前用户资料
  async updateCurrentUserProfile() {
    const { app, ctx, service } = this;
    const { displayName, sex, mobile, email, profileImageUrl, introduction } = ctx.request.body;
    // const payload = { displayName, sex, mobile, email, profileImageUrl };
    // 邮箱和手机等需要单独设置
    const payload = { displayName, sex, profileImageUrl, introduction };
    const currentUser = ctx.request.user
    const user = await service.user.updateCurrentUserProfile(currentUser.id, payload);

    if (!user) {
      this.fail({ ctx });
    } else {
      // 重新获取完整关联信息
      const data = await service.user.getCurrentUserProfile(user.id);
      this.success({ ctx, data });
    }
  }
}

module.exports = UserController;
