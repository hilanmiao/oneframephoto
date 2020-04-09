'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { operationLog } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.get('/operationLog/all', tokenRequired, operationLog.all)
  apiRouter.delete('/operationLog', tokenRequired, operationLog.destroy)
  apiRouter.delete('/operationLog/deleteBatch', tokenRequired, operationLog.destroyBatch)
  apiRouter.put('/operationLog/:id/enable', tokenRequired, operationLog.enable)
  apiRouter.put('/operationLog/:id/disable', tokenRequired, operationLog.disable)
  apiRouter.resources('operationLog', '/operationLog', tokenRequired, operationLog)
};
