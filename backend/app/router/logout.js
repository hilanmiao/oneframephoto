'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { router, controller, middleware } = app;
  const { logout } = controller

  const tokenRequired = middleware.tokenRequired(null, app)

  apiRouter.delete('/logout', tokenRequired, logout.logout)
};
