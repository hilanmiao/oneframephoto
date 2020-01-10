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
};

const config = {
  CONSTANTS: constants,
};

module.exports = config;
