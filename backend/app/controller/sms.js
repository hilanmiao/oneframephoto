// 短信验证码有效期5分钟
// 验证码为6位纯数字
// 每个手机号60秒内只能发送一次短信验证码，且这一规则的校验必须在服务器端执行
// 同一个手机号在同一时间内可以有多个有效的短信验证码
// 一旦用户登录 后端redis中的该手机号码的value全部失效
// 短信验证码不可直接记录到日志文件
// 发送短信验证码之前，先验证图形验证码是否正确（可选）
// 集成第三方API做登录保护（可选）
// 验证码重复的问题（可选）

'use strict';

const Controller = require('./base');

class SmsController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 发送短信验证码
  async sendLoginSmsCode() {
    const { ctx, service: { sms } } = this;
    const { mobile } = ctx.request.body;
    const payload = { mobile };
    const data = await sms.sendLoginSmsCode(payload);
    if (data.result) {
      this.success({ ctx });
    } else {
      this.fail({ ctx, message: data.message });
    }
  }

  // 注册
  register() {

  }

  // 更换手机号码
  changeMobile() {

  }
}

module.exports = SmsController;
