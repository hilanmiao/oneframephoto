'use strict';
// 权限表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1 } = app.Sequelize;
  const Permission = base.defineModel(app, 'permission', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    roleId: UUID, // 角色id
    identification: STRING(256), // 权限标识
    type: STRING(256), // 类型：d：目录 m：菜单 b：按钮 a：接口
    remark: STRING(128), // 备注
  });
  Permission.associate = function() {
    Permission.belongsTo(app.model.Role, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
  };
  return Permission;
};
