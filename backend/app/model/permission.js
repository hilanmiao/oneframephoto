'use strict';
// 权限表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const Permission = base.defineModel(app, 'permission', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    roleId: UUID, // 角色id
    identification: { // 权限标识
      type: STRING,
      allowNull: false,
    },
    type: STRING, // 类型：d：目录 m：菜单 b：按钮 a：接口
    remark: STRING, // 备注
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  }, {
    // 真删除
    paranoid: false,
  });
  Permission.associate = function() {
    Permission.belongsTo(app.model.Role, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
  };
  return Permission;
};
