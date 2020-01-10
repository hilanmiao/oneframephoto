'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { router, controller } = app;
  const { login } = controller

  apiRouter.post('/login', login.login)

  apiRouter.post('/login/social', login.loginSocial)
};
