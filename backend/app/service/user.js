'use strict';

const Service = require('egg/index').Service;

class UserService extends Service {

  // 列表
  async index(payload) {
    const { app: { model: { User, Role }, Sequelize: { Op } } } = this;
    const { page, limit, username } = payload;
    const op = {
      where: {
        [Op.or]: {
          username: { [Op.like]: `%${username}%` },
        },
      },
      subQuery: false,
      offset: (+(page || 1) - 1) * +limit || 0,
      limit: +limit || 20,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
        model: Role,
        attributes: ['name'],
      }]
    };
    const data = await User.findAndCountAll(op);
    return data;
  }

  // 所有
  async all(payload) {
    const { app: { model: { User }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    };
    return await User.findAndCountAll(op);
  }

  // 添加
  async create(payload) {
    const { app: { model: { User } } } = this;
    return await User.create(payload);
  }

  // 编辑
  async update(id, payload) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 删除
  async destroy(id) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.destroy();
  }

  // 批量删除
  async destroys(ids) {
    const { app: { model: { User }, Sequelize: { Op } } } = this;
    const query = { where: { id: { [Op.in]: ids } } };

    return User.destroy(query);
  }

  // 详情
  async show(id) {
    const { app: { model: { User } } } = this;
    return await User.findByPk(id);
  }

  // 可用
  async enable(id) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: true });
  }

  // 不可用
  async disable(id) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update({ isEnabled: false });
  }

  // 根据用户名查找
  async findByUserName(username) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { username } });
  }

  // 根据 githubId 查找
  async findByGithubId(githubId) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { githubId } });
  }

  // 根据 weixinId 查找
  async findByWeixinId(weixinId) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { weixinId } });
  }

  // 根据 githubId 查找
  async findByDingtalkId(dingtalkId) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { dingtalkId } });
  }

  // 检查email
  checkEmail() {
  }

  // 获取当前用户资料
  async getCurrentUserProfile(id) {
    const { app: { model: { User, Role, Permission }, Sequelize: { Op } } } = this;
    const op = {
      where: {
        id,
        isEnabled: true
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
        model: Role,
        attributes: ['name'],
        include: [{
          model: Permission
        }]
      }]
    };
    return await User.findOne(op);
  }

  // 更新当前用户密码
  async updateCurrentUserPassword(id, payload) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }

  // 更新当前用户资料
  async updateCurrentUserProfile(id, payload) {
    const { app: { model: { User } } } = this;
    const model = await User.findByPk(id);
    if (!model) {
      return model;
    }
    return await model.update(payload);
  }
}

module.exports = UserService;
