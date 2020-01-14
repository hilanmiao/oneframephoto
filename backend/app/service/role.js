'use strict';

const Service = require('egg/index').Service;

class RoleService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { Role }, Sequelize: { Op } } } = this;
    const { page, limit, name } = payload;
    const op = {
      where: {
        [Op.or]: {
          name: { [Op.like]: `%${name}%` },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await Role.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Role }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Role.findAndCountAll(op);
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

  // 删除
  async destroy(id) {
    const { app: { model: { Role } } } = this;
    const model = await Role.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { Role }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return Role.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { Role } } } = this;
    return await Role.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { Role } } } = this;
    const model = await Role.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { Role } } } = this;
    const model = await Role.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }
}

module.exports = RoleService;
