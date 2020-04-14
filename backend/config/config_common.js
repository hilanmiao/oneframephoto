'use strict';

const constants = {
  USER_ROLES: {
    ADMINISTRATOR: 'administrator',
    DEVELOPER: 'developer',
    TESTER: 'tester',
    CUSTOMER: 'customer',
  },
  EXPIRATION_PERIOD: { // 到期期限
    SHORT: '10m',
    MEDIUM: '4h',
    LONG: '730h',
  },
  AUTH_ATTEMPTS: { // 认证尝试次数
    FOR_IP: 50,
    FOR_IP_AND_USER: 5,
  },
  LOCKOUT_PERIOD: 30, // 锁定期限 in units of minutes
  API_TITLE: 'API',
  WEB_TITLE: 'Admin',
  SMS: { //  短信限制
    SEND_INTERVAL: 60, // 发送时间间隔 秒
    COUNT_LIMIT: 5, // 每天上限 条数
    EFFECTIVE_TIME: 60 * 5 // 有效时间 5分钟
  }
};

const config = {
  CONSTANTS: constants,
};

module.exports = config;
