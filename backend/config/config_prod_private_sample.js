'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
const config = {
  SERVER_HOST: '127.0.0.1',
  SERVER_PORT: '7001',
  WEB_URL: 'http://www.oneframephoto.com',
  JWT_SECRET: 'oneframephoto',
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
  ALINODE: {
    SERVER: 'wss://agentserver.node.aliyun.com:8080',
    APPID: '',
    SECRET: ''
  }
}

module.exports = config
