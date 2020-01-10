'use strict';
// 角色表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1 } = app.Sequelize;
  const Role = base.defineModel(app, 'role', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    title: STRING(128), // 角色名称
    remark: STRING(128), // 备注
  });
  Role.associate = function() {
    Role.hasMany(app.model.Permission, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
    // Role.hasMany(app.model.User, { foreignKey: 'role_id', sourceKey: 'id' });
  };
  return Role;
};
