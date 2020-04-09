'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { role } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/role/all', tokenRequired, role.all)
  apiRouter.delete('/role', tokenRequired, role.destroy)
  apiRouter.delete('/role/deleteBatch', tokenRequired, role.destroyBatch)
  apiRouter.put('/role/:id/enable', tokenRequired, role.enable)
  apiRouter.put('/role/:id/disable', tokenRequired, role.disable)
  apiRouter.resources('role', '/role', tokenRequired, role)
};
