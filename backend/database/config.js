'use strict';

let config_private = require('../config/config_local_private');

// 无法获取到egg的环境，转为使用node的环境
const env = process.env.NODE_ENV;
if (env === 'production') {
  config_private = require('../config/config_prod_private');
}

const HOST = config_private.MYSQL.HOST;
const USER = config_private.MYSQL.USER;
const PASSWORD = config_private.MYSQL.PASSWORD;
const DATABASE = config_private.MYSQL.DATABASE;

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql'
  },
  test: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql'
  },
  production: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql'
  },
};
