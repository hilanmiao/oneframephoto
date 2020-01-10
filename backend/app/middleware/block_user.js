'use strict';

module.exports = () => {

  return async function(ctx, next) {
    console.log('middleware block user')

    await next();
  };
};
