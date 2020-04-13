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

  const { story, game } = controller.api;

  /**
   * 故事模块
   */
  // eslint-disable-next-line no-lone-blocks
  {
    apiV1Router.get('/story/all', story.all)
    apiV1Router.delete('/story', story.destroy)
    apiV1Router.delete('/story/deleteBatch', story.destroyBatch)
    apiV1Router.put('/story/:id/enable', story.enable)
    apiV1Router.put('/story/:id/disable', story.disable)
    apiV1Router.resources('story', '/story', story)
  }

  /**
   * 游戏模块
   */
  // eslint-disable-next-line no-lone-blocks
  {
    apiV1Router.get('/game/all', game.all)
    apiV1Router.delete('/game', game.destroy)
    apiV1Router.delete('/game/deleteBatch', game.destroyBatch)
    apiV1Router.put('/game/:id/enable', game.enable)
    apiV1Router.put('/game/:id/disable', game.disable)
    apiV1Router.resources('game', '/game', game)
  }

};
