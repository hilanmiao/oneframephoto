'use strict';

const GeneratePassword = require('password-generator');

module.exports = app => {

  // local 鉴权处理
  const localHandler = async (ctx, { username, password }) => {

    const existUser = ctx.service.user.getUserByUserName(username);
    // 用户不存在
    if (!existUser) {
      return null;
    }
    // 密码不匹配


    // 用户不可用


    return existUser;
  };

  // github 鉴权处理
  const githubHandler = async (ctx, { profile }) => {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    let existUser = await ctx.service.user.findByGithubId(profile.id);

    // 用户不存在则创建
    if (!existUser) {
      existUser = new ctx.model.User();
      existUser.githubId = profile.id;
      // TODO: 临时固定
      // existUser.password = GeneratePassword(10, false)
      existUser.password = '0123456789'
    }
    // 用户存在，更新字段
    existUser.username = profile.username;
    existUser.displayName = profile.displayName;
    existUser.email = email || existUser.email;
    existUser.profileImageUrl = profile._json.avatar_url;
    existUser.introduction = profile._json.bio;

    try {
      await existUser.save();
      // await ctx.model.User.create(existUser);
    } catch (ex) {
      throw ex;
    }

    return existUser;
  };

  // weixin 鉴权处理
  const weixinHandler = async (ctx, profile) => {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    const unionid = profile.refreshToken.unionid;
    let existUser = await ctx.service.user.findByWeixinId(unionid);

    // 用户不存在则创建
    if (!existUser) {
      existUser = new ctx.model.User();
      existUser.weixinId = unionid;
      existUser.password = GeneratePassword(10, false)
    }
    // 用户存在，更新字段
    existUser.username = unionid;
    existUser.displayName = profile.displayName;
    existUser.email = email || existUser.email;
    existUser.profileImageUrl = profile.photo;

    try {
      await existUser.save();
      // await ctx.model.User.create(existUser);
    } catch (ex) {
      throw ex;
    }

    return existUser;
  };

  // 开始前执行
  app.beforeStart(async () => {
    // 本地开发时可以使用自动迁移数据库，
    if (app.config.env === 'development' || app.config.env === 'local') {
      await app.model.sync({ force: false });
    }
    console.log(new Date().valueOf());
  });

  // 准备好执行
  app.ready(async () => {
    // 检查用户
    app.passport.verify(async (ctx, user) => {
      let handler;
      switch (user.provider) {
        case 'local':
          handler = localHandler;
          break;
        case 'github':
          handler = githubHandler;
          break;
        case 'weixin':
          // passport-weixin 插件没有兼容egg-passport,没有ctx,创造一个匿名context实例
          ctx = app.createAnonymousContext();
          handler = weixinHandler;
          break;
        default:
          break;
      }

      const existUser = await handler(ctx, user);

      return existUser;
    });

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保留个别字段
    // app.passport.serializeUser(async (ctx, user) => {
    //
    // });

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, user) => {
      return user;
    });

  });

  // 关闭前执行
  app.beforeClose(async () => {

  });
};
