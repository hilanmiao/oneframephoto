'use strict';

const Service = require('egg/index').Service;

class PermissionService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { Permission }, Sequelize: { Op } } } = this;
    const { page, limit, identification } = payload;
    const op = {
      where: {
        [Op.or]: {
          identification: { [Op.like]: identification ? `%${identification}%` : '%%' },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    const data = await Permission.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Permission }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Permission.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { Permission } } } = this;
    return await Permission.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { Permission } } } = this;
    const model = await Permission.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { Permission } } } = this;
    const model = await Permission.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { Permission }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return Permission.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { Permission } } } = this;
    return await Permission.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { Permission } } } = this;
    const model = await Permission.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { Permission } } } = this;
    const model = await Permission.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }

  // 所有
  async getListByRoleId(payload) {
    const { app: { model: { Permission }, Sequelize: { Op } } } = this;
    const { roleId } = payload
    const op = {
      where: {
        isEnabled: true,
        roleId: { [Op.eq]: roleId }
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await Permission.findAndCountAll(op);
  }

  // 添加
  async createPermissionsByRoleId(payload) {
    const { app, app: { model: { Permission }, Sequelize, Sequelize: { Op } } } = this;
    const { roleId, permissions } = payload
    const query = { where: { roleId: { [Op.eq]: roleId } } };
    const collections = []
    permissions.forEach(item => {
      const document = {
        roleId,
        identification: item.identification,
        type: item.type,
      }
      collections.push(document)
    })
    return app.model.transaction(async t => {
      await Permission.destroy(query);
      return await Permission.bulkCreate(collections)
    }).then(result => {
      // Transaction has been committed
      // result is whatever the result of the promise chain returned to the transaction callback
      return result
    }).catch(err => {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
      return err
    });


  }
}

module.exports = PermissionService;
