'use strict'

// 账号密码等敏感信息不要提交到仓库中，gitignore已经忽略此文件
const config = {
  SERVER_HOST: '127.0.0.1',
  SERVER_PORT: '7001',
  WEB_URL: 'http://localhost:9527',
  JWT_SECRET: 'oneframephoto',
  GITHUB_ID: '',
  GITHUB_SECRET: '',
  WEIXIN_ID: '',
  WEIXIN_SECRET: '',
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
