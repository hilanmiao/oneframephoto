'use strict';
// 短链接表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN, TEXT } = app.Sequelize;
  const ShortUrl = base.defineModel(app, 'shortUrl', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    url: { // 短链接地址
      type: STRING
    },
    hash: STRING, // hash字符串
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });

  return ShortUrl;
};
