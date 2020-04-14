/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';
const Fs = require('fs');
const Path = require('path');
const Uid = require('uuid');
const svgCaptcha = require('svg-captcha'); // 验证码插件
const Controller = require('egg').Controller;

class CommonController extends Controller {
  // 获取验证码
  async getVerification() {
    const { ctx } = this;
    const options = { // 参数
      width: 100,
      height: 40, // height of captcha
      fontSize: 50, // captcha text size
      color: true,
      noise: 5,
      size: 4,
      ignoreChar: '0o1i', // 过滤掉一些字符，例如0o1i
    };
    const Captcha = svgCaptcha.create(options);// 生成验证码
    if (ctx.gets.type === '1') {
      // 登陆验证码
      ctx.session.login_code = Captcha.text;// 把验证码保存到session
    } else if (ctx.gets.type === '2') {
      // 注册验证码
      ctx.session.register_code = Captcha.text;
    }
    // 设置session过期时间
    ctx.session.maxAge = 1000 * 60 * 10;
    ctx.body = { // 返回结果给客户端
      data: Captcha.data,
    };
    ctx.status = 200;
  }
}

module.exports = CommonController;
