'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
  // 编辑
  async update(id, payload) {
    const { app: { model: { Permission } } } = this;
    await Permission.destroy({ where: { role_id: id } });
    await Permission.bulkCreate(payload);
    return true;
  }

  // 所有
  async all(payload) {
    const { app: { model: { Permission }, Sequelize: { Op } } } = this;
    const { is_enabled } = payload;
    const op = {
      where: {
        // is_enabled,
        // deleted_at: { [Op.eq]: null }
      },
      order: [
        ['created_at', 'DESC'],
      ],
    };
    return await Permission.findAndCountAll(op);
  }
}

module.exports = PermissionService;
