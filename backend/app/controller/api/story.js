'use strict';

const Controller = require('../base');

class StoryController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { story } } = this;
    const { title, introduction, content, photo } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { title, introduction, content, photo }
    const data = await story.create(payload);
    this.success({ ctx, data });
  }

  // 删除
  async destroy() {
    const { ctx, service: { story } } = this;
    const id = ctx.params.id;
    const data = await story.destroy(id);
    this.success({ ctx, data });
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { story } } = this;
    const ids = ctx.request.body;
    const data = await story.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { story } } = this;
    const id = ctx.params.id;
    const { title, introduction, content, photo } = ctx.request.body;
    const payload = { title, introduction, content, photo };
    const data = await story.update(id, payload);
    this.success({ ctx, data });
  }

  // 详情
  async show() {
    const { ctx, service: { story } } = this;
    const id = ctx.params.id;
    const data = await story.show(id);
    this.success({ ctx, data });
  }

  // 可用
  async enable() {
    const { ctx, service: { story } } = this;
    const id = ctx.params.id;
    const data = await story.enable(id);
    this.success({ ctx, data });
  }

  // 不可用
  async disable() {
    const { ctx, service: { story } } = this;
    const id = ctx.params.id;
    const data = await story.disable(id);
    this.success({ ctx, data });
  }

  // 列表
  async index() {
    const { ctx, service: { story } } = this;
    const { page, limit, title } = ctx.request.query;
    const payload = { page, limit, title };
    const data = await story.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { story } } = this;
    const payload = { };
    const data = await story.all(payload);
    this.success({ ctx, data });
  }

}

module.exports = StoryController;
