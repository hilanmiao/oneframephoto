'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { router, controller, middleware } = app;
  const { shortUrl } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/shortUrl', shortUrl.short); // 生成短网址
  router.get('/:hash', shortUrl.redirect); // 访问短网址
};
