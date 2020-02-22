'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/:hash', controller.shortUrl.redirect); // 访问短网址
  router.post('/shortUrl', controller.shortUrl.short); // 生成短网址
};
