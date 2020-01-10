'use strict';

const Bcrypt = require('bcryptjs');
const Uuid = require('uuid')

const base = require('./base');

// session表（如果不需要保留用户的所有登录时间的话，可以不用伪删除）
module.exports = app => {
  const { STRING, BOOLEAN, UUID, ENUM, Op } = app.Sequelize;
  const Session = base.defineModel(app, 'session', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: UUID,
      allowNull: false
    },
    key: {
      type: STRING,
      allowNull: false
    },
    passwordHash: {
      type: STRING,
      allowNull: false
    },
  });

  Session.createInstance = async function(user) {
    const document = {
      userId: user.id,
      key: Uuid.v4(),
      passwordHash: user.password
    }

    const newSession = await Session.create(document)
    const query = { where: { userId: user.id, key: { [Op.ne]: document.key } } };
    // 上一步如果没有出错的话，再删除旧的
    await Session.destroy(query)

    return newSession
  }

  Session.findByCredentials = async function(id, key) {
    const session = await Session.findByPk(id);
    if (!session) {
      return false;
    }

    return session.key === key ? session : false;
  };

  async function generateKeyHash() {
    const key = Uuid.v4()
    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(key, salt);
    return { key, hash };
  }

  return Session;
};
