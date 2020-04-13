'use strict';
// 游戏表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const Game = base.defineModel(app, 'game', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    name: STRING, // 游戏名称
    remark: STRING, // 备注
    rule: STRING, // 规则
    cover: STRING, // 封面
    url: STRING, // 游戏主页地址
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });
  return Game;
};
