'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
const config = {
  SERVER_HOST: '127.0.0.1',
  SERVER_PORT: '7001',
  DOMAIN: '127.0.0.1:7001',
  WEB_URL: 'http://localhost:9527',
  JWT_SECRET: 'oneframephoto',
  DEFAULT_ROLE_NAME: '普通用户',
  GITHUB_ID: '',
  GITHUB_SECRET: '',
  WEIXIN_ID: '',
  WEIXIN_SECRET: '',
  DINGTALK: {
    DINGTALK_ID: '',
    DINGTALK_SECRET: '',
    OAUTH_PAGE_CONFIG: {
      TITLE: '一帧照片',
      LOGO: 'https://avatars1.githubusercontent.com/u/27052900?s=460&v=4',
      SLOGAN: '一帧照片，一个瞬间，一次回忆。',
    },
  },
  MYSQL: {
    HOST: '127.0.0.1',
    PORT: '3306',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'oneframephoto',
  },
  REDIS: {
    PORT: '6379',
    HOST: '127.0.0.1',
    PASSWORD: '',
    DB: 0,
  },
  ALINODE: {
    SERVER: 'wss://agentserver.node.aliyun.com:8080',
    APPID: '',
    SECRET: ''
  },
  ALISMS: {
    ACCESS_KEY_ID: '',
    ACCESS_KEY_SECRET: '',
    ENDPOINT: 'https://dysmsapi.aliyuncs.com',
    API_VERSION: '2017-05-25',
    REGION_ID: 'cn-hangzhou',
    SIGN_NAME: '',
    TEMPLATE_CODE: {
      LOGIN_TEMPLATE: ''
    }
  },
  SHORTURL: {
    CACHE_MAX_AGE: 3600 * 24 * 7,
    CACHE_PREFIX: 'dwz'
  }
}

module.exports = config
