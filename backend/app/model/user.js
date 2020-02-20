'use strict';

const Bcrypt = require('bcryptjs');

const base = require('./base');

// 用户表
module.exports = app => {
  const { STRING, BOOLEAN, UUID, ENUM } = app.Sequelize;
  const User = base.defineModel(app, 'user', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    username: STRING, // 用户名
    password: STRING, // 密码
    displayName: STRING, // 显示名称
    email: STRING, // 邮箱
    mobile: STRING, // 手机
    sex: { // 性别
      type: ENUM,
      // 1:男，2：女
      values: ['1', '2'],
      defaultValue: '1'
    },
    profileImageUrl: STRING, // 头像
    introduction: STRING, // 简介
    roleId: UUID, // 角色id
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
    githubId: STRING, // githubId
    weixinId: STRING, // 微信Id
    dingtalkId: STRING // 钉钉Id
  });

  // 有context的时候可以用this
  User.findByCredentials = async function(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return false;
    }

    const source = user.password;

    const passwordMatch = await Bcrypt.compare(password, source);
    if (passwordMatch) {
      return user;
    }

    return false;
    // return await this.findOne({
    //   where: {
    //     username
    //   }
    // })
  }

  // 没有context的时候只能用prototype（和普通函数不冲突）
  User.prototype.findByCredentials = async function(username, password) {
    return await User.findOne({
      where: {
        username
      }
    })
  }

  // 生成哈希
  async function generateHash(key) {
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(key, salt);
    return { key, hash };
  }

  // 添加钩子
  User.beforeCreate((user, options) => {
    return generateHash(user.password).then(({ hash }) => {
      user.password = hash
    })
    // 需要返回一个promise
    // return new Promise((resolve, reject) => {
    //   user.password = ''
    //   console.log('-------哈希后的密码：' + user.password);
    //   return resolve(user, options);
    // });
  });

  User.associate = function() {
    User.belongsTo(app.model.Role, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
  };

  return User;
};
