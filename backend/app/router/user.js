'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { user } = controller

  // const tokenRequired = middleware.tokenRequired()
  const tokenRequired = middleware.tokenRequired(null, app)

  // 获取当前用户资料
  apiRouter.get('/user/my/profile', tokenRequired, user.getCurrentUserProfile)

  // 更新当前用户密码
  apiRouter.put('/user/my/password', tokenRequired, user.updateCurrentUserPassword)

  // 更新当前用户资料
  apiRouter.put('/user/my/profile', tokenRequired, user.updateCurrentUserProfile)

  // 启用账户
  apiRouter.put('/user/:id/enable', tokenRequired, user.enableAccount)
};
