'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { permission } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/permission/getListByRoleId', permission.getListByRoleId)
  apiRouter.get('/permission/all', permission.all)
  apiRouter.delete('/permission', permission.destroy)
  apiRouter.delete('/permission/deleteBatch', permission.destroyBatch)
  apiRouter.post('/permission/createPermissionsByRoleId', permission.createPermissionsByRoleId)
  apiRouter.put('/permission/:id/enable', permission.enable)
  apiRouter.put('/permission/:id/disable', permission.disable)
  apiRouter.resources('permission', '/permission', permission)
};
