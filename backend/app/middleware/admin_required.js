'use strict';

module.exports = () => {

  return async function(ctx, next) {

    // 需要管理员权限
    // if(!ctx.user.is_admin) {
    //
    // }
    await next();
  };
};
