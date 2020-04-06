'use strict';
// 角色表
const base = require('./base');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN } = app.Sequelize;
  const Role = base.defineModel(app, 'role', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV1,
    },
    name: { // 角色名称
      type: STRING(100),
      unique: true,
    },
    remark: STRING, // 备注
    isEnabled: { // 是否可用
      type: BOOLEAN,
      defaultValue: true
    },
  });

  Role.associate = function() {
    Role.hasMany(app.model.Permission, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
    Role.hasMany(app.model.User, { foreignKey: 'roleId', sourceKey: 'id', constraints: false });
  };
  return Role;
};
