'use strict';

const Bcrypt = require('bcryptjs');
const GeneratePassword = require('password-generator');

const Service = require('egg/index').Service;

class UserService extends Service {

  // 根据用户名查找
  async findByUserName(username) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { username } });
  }

  // 根据 githubId 查找
  async findByGithubId(githubId) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { github_id: githubId } });
  }

  // 根据 weixinId 查找
  async findByWeixinId(weixinId) {
    const { app: { model: { User } } } = this;
    return await User.findOne({ where: { weixin_id: weixinId } });
  }

  // 检查email
  checkEmail() {
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

  // 启用账户
  enableAccount() {
  }

  // 禁用账户
  disableAccount() {
  }

  // 激活账户
  activateAccount() {
  }

  // 灭活账户
  deactivateAccount() {
  }

  // 获取用户权限
  getUserScope() {
  }
}

module.exports = UserService;
