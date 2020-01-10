'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { passport } = controller

  // 挂载鉴权路由
  // app.passport.mount('github')
  // github
  const githubStrategy = app.passport.authenticate('github', {
    successRedirect: '/passport/authCallbackSuccess',
    failureRedirect: '/passport/authCallbackFail'
  })
  router.get('/passport/github', githubStrategy)
  router.get('/passport/github/callback', githubStrategy)

  // local
  const localStrategy = app.passport.authenticate('local', {})
  router.post('passport/local', localStrategy)

  // weixin
  const weixinStrategy = app.passport.authenticate('loginByWeixin', {
    successRedirect: '/passport/authCallbackSuccess',
    failureRedirect: '/passport/authCallbackFail'
  })
  router.get('/passport/weixin', weixinStrategy)
  router.get('/passport/weixin/callback', weixinStrategy)

  // 鉴权回调页面
  router.get('/passport/authCallbackSuccess', passport.authCallbackSuccess)
  router.get('/passport/authCallbackFail', passport.authCallbackFail)

};
