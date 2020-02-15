'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { common, api } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  // 获取图片验证码
  // apiRouter.get('/get_verification', common.getVerification);

  /**
   * 故事模块
   */
  // eslint-disable-next-line no-lone-blocks
  {
    apiRouter.get('/common/story', api.story.index)
    apiRouter.get('/common/story/:id', api.story.show)
  }
};
