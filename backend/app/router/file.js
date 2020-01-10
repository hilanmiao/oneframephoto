'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller, middleware } = app;
  const { file } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.post('/upload', tokenRequired, file.upload)
};
