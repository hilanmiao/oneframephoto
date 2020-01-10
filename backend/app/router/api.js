'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 1.业务功能请放在这里，公共或基础功能请放到外面
 * 2.resources 请放在同类路由的最后
 */
module.exports = app => {
  const { controller, middleware } = app;

  // 中间件
  const tokenRequired = middleware.tokenRequired(null, app)
  const apiV1Router = app.router.namespace('/api/v1', tokenRequired);

  const adminRequired = middleware.adminRequired();
};
