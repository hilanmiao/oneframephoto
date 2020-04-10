'use strict';

const Controller = require('./base');

class OperationLogController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { operationLog } } = this;
    const { username, content, remark } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { username, content, remark }
    const data = await operationLog.create(payload);
    this.success({ ctx, data });
  }

  // 删除
  async destroy() {
    const { ctx, service: { operationLog } } = this;
    const id = ctx.params.id;
    const data = await operationLog.destroy(id);
    this.success({ ctx, data });
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { operationLog } } = this;
    const ids = ctx.request.body;
    const data = await operationLog.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { operationLog } } = this;
    const id = ctx.params.id;
    const { username, content, remark } = ctx.request.body;
    const payload = { username, content, remark }
    const data = await operationLog.update(id, payload);
    this.success({ ctx, data });
  }

  // 详情
  async show() {
    const { ctx, service: { operationLog } } = this;
    const id = ctx.params.id;
    const data = await operationLog.show(id);
    this.success({ ctx, data });
  }

  // 可用
  async enable() {
    const { ctx, service: { operationLog } } = this;
    const id = ctx.params.id;
    const data = await operationLog.enable(id);
    this.success({ ctx, data });
  }

  // 不可用
  async disable() {
    const { ctx, service: { operationLog } } = this;
    const id = ctx.params.id;
    const data = await operationLog.disable(id);
    this.success({ ctx, data });
  }

  // 列表
  async index() {
    const { ctx, service: { operationLog } } = this;
    const { page, limit, username } = ctx.request.query;
    const payload = { page, limit, username };
    const data = await operationLog.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { operationLog } } = this;
    const payload = { };
    const data = await operationLog.all(payload);
    this.success({ ctx, data });
  }
}

module.exports = OperationLogController;
