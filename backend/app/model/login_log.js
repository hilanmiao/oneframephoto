'use strict';
// 登录日志表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN, TEXT } = app.Sequelize;
  const LoginLog = base.defineModel(app, 'loginLog', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    username: { // 用户名称
      type: STRING
    },
    content: TEXT, // 登录内容（request）
    remark: TEXT, // 备注
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });

  return LoginLog;
};
