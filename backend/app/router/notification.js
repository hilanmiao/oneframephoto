'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { notification } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/notification/all', tokenRequired, notification.all)
  apiRouter.delete('/notification', tokenRequired, notification.destroy)
  apiRouter.delete('/notification/deleteBatch', tokenRequired, notification.destroyBatch)
  apiRouter.put('/notification/:id/enable', tokenRequired, notification.enable)
  apiRouter.put('/notification/:id/disable', tokenRequired, notification.disable)
  apiRouter.resources('notification', '/notification', tokenRequired, notification)
};
