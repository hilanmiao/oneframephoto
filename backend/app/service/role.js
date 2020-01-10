'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  // 列表
  async index(payload) {
    const { app: { model: { Role, Permission }, Sequelize: { Op } } } = this;
    const { page, limit, text } = payload;
    const op = {
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${text}%` },
          // '$permissions.identification$': { [Op.like]: `%${text}%` }
        },
      },
      subQuery: false,
      offset: +(page || 1) - 1 || 0,
      limit: +limit || 20,
      // 包含权限
      include: [{
        model: Permission,
        attributes: [ 'identification', 'type', 'remark' ],
      }],
      order: [
        [ 'created_at', 'DESC' ],
      ],
    };
    const data = await Role.findAndCountAll(op);
    return data;
  }

  // 添加
  async create(payload) {
    const { app: { model: { Role } } } = this;
    return await Role.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { Role } } } = this;
    const model = await Role.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 详情
  async role_edit(id) {
    const { app: { model: { Role } } } = this;
    return await Role.findByPk(id);
  }

  // 删除角色
  async destroy(payload) {
    const { app: { model: { CourseCategory }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: payload } } };
    return CourseCategory.destroy(query);
  }

  // 所有
  async all(payload) {
    const { app: { model: { Role }, Sequelize: { Op } } } = this;
    const { is_enabled } = payload;
    const op = {
      where: {
        // is_enabled,
        // deleted_at: { [Op.eq]: null }
      },
      order: [
        ['created_at', 'DESC'],
      ],
    };
    return await Role.findAndCountAll(op);
  }
}

module.exports = RoleService;
