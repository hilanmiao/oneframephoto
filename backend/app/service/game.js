'use strict';

// 这是一个模板文件

const Service = require('egg/index').Service;

class GameService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { Game }, Sequelize: { Op } } } = this;
    const { page, limit, name } = payload;
    const op = {
      where: {
        [Op.or]: {
          name: { [Op.like]: name ? `%${name}%` : '%%' },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await Game.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Game }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Game.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { Game } } } = this;
    return await Game.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { Game } } } = this;
    const model = await Game.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { Game } } } = this;
    const model = await Game.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(payload) {
    const { app: { model: { Game }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: payload } } };

    return Game.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { Game } } } = this;
    return await Game.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { Game } } } = this;
    const model = await Game.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { Game } } } = this;
    const model = await Game.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }
}

module.exports = GameService;
