'use strict';

const Controller = require('../base');

class GameController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { game } } = this;
    const { name, remark, rule, cover, url } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { name, remark, rule, cover, url }
    const data = await game.create(payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 删除
  async destroy() {
    const { ctx, service: { game } } = this;
    const id = ctx.params.id;
    const data = await game.destroy(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { game } } = this;
    const ids = ctx.request.body;
    const data = await game.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { game } } = this;
    const id = ctx.params.id;
    const { name, remark, rule, cover, url } = ctx.request.body;
    const payload = { name, remark, rule, cover, url };
    const data = await game.update(id, payload);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 详情
  async show() {
    const { ctx, service: { game } } = this;
    const id = ctx.params.id;
    const data = await game.show(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 可用
  async enable() {
    const { ctx, service: { game } } = this;
    const id = ctx.params.id;
    const data = await game.enable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 不可用
  async disable() {
    const { ctx, service: { game } } = this;
    const id = ctx.params.id;
    const data = await game.disable(id);
    if (data) {
      this.success({ ctx, data });
    } else {
      this.fail({ ctx, message: '发生异常' });
    }
  }

  // 列表
  async index() {
    const { ctx, service: { game } } = this;
    const { page, limit, name } = ctx.request.query;
    const payload = { page, limit, name };
    const data = await game.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { game } } = this;
    const payload = { };
    const data = await game.all(payload);
    this.success({ ctx, data });
  }

}

module.exports = GameController;
