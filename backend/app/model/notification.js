'use strict';
// 消息通知表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN, TEXT } = app.Sequelize;
  const Notification = base.defineModel(app, 'notification', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    type: { // 类型
      type: STRING
    },
    title: { // 标题
      type: STRING
    },
    content: TEXT, // 内容
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });

  return Notification;
};
