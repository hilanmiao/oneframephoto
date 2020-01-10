'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { common } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  // 获取图片验证码
  // apiRouter.get('/get_verification', common.getVerification);

};
