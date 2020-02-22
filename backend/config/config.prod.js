/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

// 根据不同环境导入不同配置
const config_common = require('./config_common');
const config_private = require('./config_prod_private');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 导入配置
  config.myConfig = {
    constants: config_common.CONSTANTS,
    private: config_private
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569419397400_701';

  // 集群
  config.cluster = {
    listen: {
      path: '',
      port: parseInt(config_private.SERVER_PORT),
      hostname: '',
    },
  };

  // 添加你的全局中间件(路由的单独中间件顺序在全局之后)
  config.middleware = ['errorHandler'];

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: config_private.MYSQL.HOST,
      // 端口号
      port: config_private.MYSQL.PORT,
      // 用户名
      user: config_private.MYSQL.USER,
      // 密码
      password: config_private.MYSQL.PASSWORD,
      // 数据库名
      database: config_private.MYSQL.DATABASE,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // sequelize
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: config_private.MYSQL.HOST, // 连接的数据库主机地址
    port: config_private.MYSQL.PORT, // mysql服务端口
    database: config_private.MYSQL.DATABASE, // 数据库名
    username: config_private.MYSQL.USER, // 数据库用户名
    password: config_private.MYSQL.PASSWORD, // 数据库密码
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    define: {
      freezeTableName: true, // 设置后表不用加s
      timestamps: true, // 禁用时间戳 creaedAt 转 created_at问题
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    },
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: false,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  // redis
  config.redis = {
    client: {
      port: config_private.REDIS.PORT,
      host: config_private.REDIS.HOST,
      password: config_private.REDIS.PASSWORD,
      db: config_private.REDIS.DB,
    },
  };

  // 模板配置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks', // 默认模板引擎
    defaultExtension: '.nj', // 省略.nj后缀名
  };

  //  关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: ['*'],
  };

  // 允许跨域
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 上传文件配置
  config.multipart = {
    // mode: 'file',  //file模式上传  默认是流的形式上传
    fileExtensions: ['.rar', '.7z'], // 添加不在默认白名单中的文件类型
    fileSize: '100mb'
  };

  // 配置表单提交的最大限制
  config.bodyParser = {
    jsonLimit: '10mb'
  };

  // local 鉴权
  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password'
  };

  // github 鉴权
  config.passportGithub = {
    key: config_private.GITHUB_ID,
    secret: config_private.GITHUB_SECRET,
    loginURL: '/passport/github',
    callbackURL: '/passport/github/callback',
    successRedirect: '/passport/authCallbackSuccess',
    failureRedirect: '/passport/authCallbackFail'
  };

  // weixin 鉴权
  config.passportAsiczWeixin = {
    clientID: config_private.WEIXIN_ID,
    clientSecret: config_private.WEIXIN_SECRET,
    loginURL: '/passport/weixin',
    callbackURL: '/passport/weixin/callback',
    successRedirect: '/passport/authCallbackSuccess',
    failureRedirect: '/passport/authCallbackFail'
  };

  // dingtalk 鉴权
  config.passportDingtalk = {
    key: config_private.DINGTALK.DINGTALK_ID,
    secret: config_private.DINGTALK.DINGTALK_SECRET,
    loginURL: '/passport/dingtalk',
    callbackURL: '/passport/dingtalk/callback',
    successRedirect: '/passport/authCallbackSuccess',
    failureRedirect: '/passport/authCallbackFail',
    oauthPageConfig: {
      title: config_private.DINGTALK.OAUTH_PAGE_CONFIG.TITLE,
      logo: config_private.DINGTALK.OAUTH_PAGE_CONFIG.LOGO,
      slogan: config_private.DINGTALK.OAUTH_PAGE_CONFIG.SLOGAN
    }
  };

  // alinode 性能平台
  config.alinode = {
    server: config_private.ALINODE.SERVER,
    appid: config_private.ALINODE.APPID,
    secret: config_private.ALINODE.SECRET
  };

  return {
    ...config,
  };
};
