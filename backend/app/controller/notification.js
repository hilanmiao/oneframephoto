'use strict';

const Controller = require('./base');

class NotificationController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { notification } } = this;
    const { type, title, content } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { type, title, content }
    const data = await notification.create(payload);
    this.success({ ctx, data });
  }

  // 删除
  async destroy() {
    const { ctx, service: { notification } } = this;
    const id = ctx.params.id;
    const data = await notification.destroy(id);
    this.success({ ctx, data });
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { notification } } = this;
    const ids = ctx.request.body;
    const data = await notification.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { notification } } = this;
    const id = ctx.params.id;
    const { type, title, content } = ctx.request.body;
    const payload = { type, title, content }
    const data = await notification.update(id, payload);
    this.success({ ctx, data });
  }

  // 详情
  async show() {
    const { ctx, service: { notification } } = this;
    const id = ctx.params.id;
    const data = await notification.show(id);
    this.success({ ctx, data });
  }

  // 可用
  async enable() {
    const { ctx, service: { notification } } = this;
    const id = ctx.params.id;
    const data = await notification.enable(id);
    this.success({ ctx, data });
  }

  // 不可用
  async disable() {
    const { ctx, service: { notification } } = this;
    const id = ctx.params.id;
    const data = await notification.disable(id);
    this.success({ ctx, data });
  }

  // 列表
  async index() {
    const { ctx, service: { notification } } = this;
    const { page, limit, title } = ctx.request.query;
    const payload = { page, limit, title };
    const data = await notification.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { notification } } = this;
    const payload = { };
    const data = await notification.all(payload);
    this.success({ ctx, data });
  }
}

module.exports = NotificationController;
