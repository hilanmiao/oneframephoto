'use strict';

const Service = require('egg/index').Service;

class NotificationService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { Notification }, Sequelize: { Op } } } = this;
    const { page, limit, title } = payload;
    const op = {
      where: {
        [Op.or]: {
          title: { [Op.like]: title ? `%${title}%` : '%%' },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await Notification.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Notification }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Notification.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { Notification } } } = this;
    return await Notification.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { Notification } } } = this;
    const model = await Notification.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { Notification } } } = this;
    const model = await Notification.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { Notification }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return Notification.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { Notification } } } = this;
    return await Notification.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { Notification } } } = this;
    const model = await Notification.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { Notification } } } = this;
    const model = await Notification.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }
}

module.exports = NotificationService;
