'use strict';

const Service = require('egg/index').Service;

class OperationLogService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { OperationLog }, Sequelize: { Op } } } = this;
    const { page, limit, username } = payload;
    const op = {
      where: {
        [Op.or]: {
          username: { [Op.like]: username ? `%${username}%` : '%%' },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await OperationLog.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { OperationLog }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await OperationLog.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { OperationLog } } } = this;
    return await OperationLog.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { OperationLog } } } = this;
    const model = await OperationLog.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { OperationLog } } } = this;
    const model = await OperationLog.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { OperationLog }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return OperationLog.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { OperationLog } } } = this;
    return await OperationLog.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { OperationLog } } } = this;
    const model = await OperationLog.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { OperationLog } } } = this;
    const model = await OperationLog.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }
}

module.exports = OperationLogService;
