'use strict';

const Controller = require('./base');

class LoginLogController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { loginLog } } = this;
    const { username, content, remark } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { username, content, remark }
    const data = await loginLog.create(payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 删除
  async destroy() {
    const { ctx, service: { loginLog } } = this;
    const id = ctx.params.id;
    const data = await loginLog.destroy(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { loginLog } } = this;
    const ids = ctx.request.body;
    const data = await loginLog.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { loginLog } } = this;
    const id = ctx.params.id;
    const { username, content, remark } = ctx.request.body;
    const payload = { username, content, remark }
    const data = await loginLog.update(id, payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 详情
  async show() {
    const { ctx, service: { loginLog } } = this;
    const id = ctx.params.id;
    const data = await loginLog.show(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 可用
  async enable() {
    const { ctx, service: { loginLog } } = this;
    const id = ctx.params.id;
    const data = await loginLog.enable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 不可用
  async disable() {
    const { ctx, service: { loginLog } } = this;
    const id = ctx.params.id;
    const data = await loginLog.disable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 列表
  async index() {
    const { ctx, service: { loginLog } } = this;
    const { page, limit, username } = ctx.request.query;
    const payload = { page, limit, username };
    const data = await loginLog.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { loginLog } } = this;
    const payload = { };
    const data = await loginLog.all(payload);
    this.success({ ctx, data });
  }

  // 列表
  async getCurrentUserLog() {
    const { ctx, service: { loginLog } } = this;
    const user = ctx.request.user
    const { page, limit } = ctx.request.query;
    const payload = { page, limit, username: user.username };
    const data = await loginLog.index(payload);
    this.success({ ctx, data });
  }
}

module.exports = LoginLogController;
