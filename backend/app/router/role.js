'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { role } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/role/all', role.all)
  apiRouter.delete('/role', role.destroy)
  apiRouter.delete('/role/deleteBatch', role.destroyBatch)
  apiRouter.put('/role/:id/enable', role.enable)
  apiRouter.put('/role/:id/disable', role.disable)
  apiRouter.resources('role', '/role', role)
};
