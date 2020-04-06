'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    console.log('middleware token required');

    const { header: { authorization }, url, service, model } = ctx;
    const decodedToken = ctx.helper.decodeToken(authorization);

    // 如果token验证不正确或没有
    if (!decodedToken) {
      ctx.helper.unauthorized({ ctx, message: 'Invalid Token' });
      return
    }

    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      // Tips: 注意这里的message是固定的，不能改，前端根据文字判断是哪种token过期
      if (decodedToken.user) {
        ctx.helper.unauthorized({ ctx, message: 'Expired Access Token' });
      } else {
        ctx.helper.unauthorized({ ctx, message: 'Expired Refresh Token' });
      }
      return
    }

    // 如果没有过期

    if (decodedToken.user) {
      let user = decodedToken.user;

      // 设置完整的 user
      user = await service.user.findByUserName(user.username);
      ctx.request.user = user;
      await next();
    } else if (decodedToken.sessionId) {
      const session = await model.Session.findByCredentials(decodedToken.sessionId, decodedToken.sessionKey)

      if (!session) {
        // 检验失败，这个用户的session可能已经被删除
        ctx.helper.unauthorized({ ctx, message: 'Session may have been deleted' });
        return
      }
      const user = await model.User.findByPk(session.userId)
      if (!user) {
        // 校验失败，这个用户可能已经被删除
        ctx.helper.unauthorized({ ctx, message: 'User may have been deleted' });
        return
      }

      if (user.password !== decodedToken.passwordHash) {
        // 检验失败，用户密码可能已经被修改了（另一台电脑）
        ctx.helper.unauthorized({ ctx, message: 'Password may have been modified' });
        return
      }

      // accessToken和refreshToken都有且都没有过期，就要刷新
      const accessToken = await ctx.helper.createToken(user, null, app.config.myConfig.constants.EXPIRATION_PERIOD.SHORT)
      const refreshToken = await ctx.helper.createToken(null, session, app.config.myConfig.constants.EXPIRATION_PERIOD.LONG)
      // 设置浏览器可以获取自定义的响应头
      ctx.set('Access-Control-Expose-Headers', 'X-Access-Token, X-Refresh-Token')
      ctx.set('X-Access-Token', accessToken)
      ctx.set('X-Refresh-Token', refreshToken)
      // 设置完整的 user 和 session
      ctx.request.user = user;
      ctx.request.session = session
      await next();
    }
  };
};
