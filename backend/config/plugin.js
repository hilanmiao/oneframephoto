'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus'
  },
  passport: {
    enable: true,
    package: 'egg-passport'
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github'
  },
  passportAsiczWeixin: {
    enable: true,
    package: 'egg-passport-asicz-weixin',
  }
};
