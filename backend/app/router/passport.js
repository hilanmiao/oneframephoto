'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { passport } = controller

  // 挂载鉴权路由

  // local
  const localStrategy = app.passport.authenticate('local', {})
  router.post('passport/local', localStrategy)

  // github
  app.passport.mount('github', app.config.passportGithub)

  // weixin
  app.passport.mount('loginByWeixin', app.config.passportAsiczWeixin)

  // dingtalk
  app.passport.mount('dingtalk', app.config.passportDingtalk)

  // 鉴权回调页面
  router.get('/passport/authCallbackSuccess', passport.authCallbackSuccess)
  router.get('/passport/authCallbackFail', passport.authCallbackFail)

};
