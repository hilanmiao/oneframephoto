'use strict';
// 故事表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN, TEXT } = app.Sequelize;
  const Story = base.defineModel(app, 'story', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    title: { // 标题
      type: STRING
    },
    introduction: STRING, // 简介
    content: TEXT, // 内容
    photo: STRING, // 照片
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });

  return Story;
};
