'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { loginLog } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  // 获取当前用户日志
  apiRouter.get('/loginLog/my', tokenRequired, loginLog.getCurrentUserLog)

  apiRouter.get('/loginLog/all', tokenRequired, loginLog.all)
  apiRouter.delete('/loginLog', tokenRequired, loginLog.destroy)
  apiRouter.delete('/loginLog/deleteBatch', tokenRequired, loginLog.destroyBatch)
  apiRouter.put('/loginLog/:id/enable', tokenRequired, loginLog.enable)
  apiRouter.put('/loginLog/:id/disable', tokenRequired, loginLog.disable)
  apiRouter.resources('loginLog', '/loginLog', tokenRequired, loginLog)
};
