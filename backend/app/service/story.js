'use strict';

const Service = require('egg/index').Service;

class StoryService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { Story }, Sequelize: { Op } } } = this;
    const { page, limit, title } = payload;
    const op = {
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${title}%` },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await Story.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Story }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Story.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { Story } } } = this;
    return await Story.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { Story } } } = this;
    const model = await Story.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { Story } } } = this;
    const model = await Story.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { Story }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return Story.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { Story } } } = this;
    return await Story.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { Story } } } = this;
    const model = await Story.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { Story } } } = this;
    const model = await Story.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }
}

module.exports = StoryService;
