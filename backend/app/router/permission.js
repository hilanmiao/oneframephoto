'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { permission } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/permission/getListByRoleId', tokenRequired, permission.getListByRoleId)
  apiRouter.get('/permission/all', tokenRequired, permission.all)
  apiRouter.delete('/permission', tokenRequired, permission.destroy)
  apiRouter.delete('/permission/deleteBatch', tokenRequired, permission.destroyBatch)
  apiRouter.post('/permission/createPermissionsByRoleId', tokenRequired, permission.createPermissionsByRoleId)
  apiRouter.put('/permission/:id/enable', tokenRequired, permission.enable)
  apiRouter.put('/permission/:id/disable', tokenRequired, permission.disable)
  apiRouter.resources('permission', '/permission', tokenRequired, permission)
};
