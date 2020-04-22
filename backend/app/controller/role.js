'use strict';

const Controller = require('./base');

class RoleController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { role } } = this;
    const { name, remark } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { name, remark }
    const data = await role.create(payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 删除
  async destroy() {
    const { ctx, service: { role } } = this;
    const id = ctx.params.id;
    const data = await role.destroy(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { role } } = this;
    const ids = ctx.request.body;
    const data = await role.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { role } } = this;
    const id = ctx.params.id;
    const { name, remark } = ctx.request.body;
    const payload = { name, remark };
    const data = await role.update(id, payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 详情
  async show() {
    const { ctx, service: { role } } = this;
    const id = ctx.params.id;
    const data = await role.show(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 可用
  async enable() {
    const { ctx, service: { role } } = this;
    const id = ctx.params.id;
    const data = await role.enable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 不可用
  async disable() {
    const { ctx, service: { role } } = this;
    const id = ctx.params.id;
    const data = await role.disable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 列表
  async index() {
    const { ctx, service: { role } } = this;
    const { page, limit, name } = ctx.request.query;
    const payload = { page, limit, name };
    const data = await role.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { role } } = this;
    const payload = { };
    const data = await role.all(payload);
    this.success({ ctx, data });
  }

}

module.exports = RoleController;
