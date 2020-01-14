'use strict';

const Controller = require('./base');

class PermissionController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      identification: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 添加
  async create() {
    const { ctx, service: { permission } } = this;
    const { roleId, identification, type, remark } = ctx.request.body;
    // ctx.validate(this.createRule);
    const payload = { roleId, identification, type, remark }
    const data = await permission.create(payload);
    this.success({ ctx, data });
  }

  // 删除
  async destroy() {
    const { ctx, service: { permission } } = this;
    const id = ctx.params.id;
    const data = await permission.destroy(id);
    this.success({ ctx, data });
  }

  // 批量删除
  async destroyBatch() {
    const { ctx, service: { permission } } = this;
    const ids = ctx.request.body;
    const data = await permission.destroys(ids);
    if (data === 0) {
      this.fail({ ctx, data });
    } else {
      this.success({ ctx, data });
    }
  }

  // 编辑
  async update() {
    const { ctx, service: { permission } } = this;
    const id = ctx.params.id;
    const { roleId, identification, type, remark } = ctx.request.body;
    const payload = { roleId, identification, type, remark };
    const data = await permission.update(id, payload);
    this.success({ ctx, data });
  }

  // 详情
  async show() {
    const { ctx, service: { permission } } = this;
    const id = ctx.params.id;
    const data = await permission.show(id);
    this.success({ ctx, data });
  }

  // 可用
  async enable() {
    const { ctx, service: { permission } } = this;
    const id = ctx.params.id;
    const data = await permission.enable(id);
    this.success({ ctx, data });
  }

  // 不可用
  async disable() {
    const { ctx, service: { permission } } = this;
    const id = ctx.params.id;
    const data = await permission.disable(id);
    this.success({ ctx, data });
  }

  // 列表
  async index() {
    const { ctx, service: { permission } } = this;
    const { page, limit, identification } = ctx.request.query;
    const payload = { page, limit, identification };
    const data = await permission.index(payload);
    this.success({ ctx, data });
  }

  // 所有
  async all() {
    const { ctx, service: { permission } } = this;
    const payload = { };
    const data = await permission.all(payload);
    this.success({ ctx, data });
  }

  // 根据roleId获取所有权限
  async getListByRoleId() {
    const { ctx, service: { permission } } = this;
    const { roleId } = ctx.request.query;
    const payload = { roleId };
    const data = await permission.getListByRoleId(payload);
    this.success({ ctx, data });
  }

  // 根据roleId添加权限
  async createPermissionsByRoleId() {
    const { ctx, service: { permission } } = this;
    const { roleId, permissions } = ctx.request.body;
    const payload = { roleId, permissions }
    const data = await permission.createPermissionsByRoleId(payload);
    if (data.errors) {
      this.fail({ ctx, message: data.errors });
    } else {
      this.success({ ctx, data });
    }
  }

}

module.exports = PermissionController;
