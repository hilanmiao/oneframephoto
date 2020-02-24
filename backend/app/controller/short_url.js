'use strict';

const Controller = require('./base');

class ShortUrlController extends Controller {
  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      url: { type: 'url', required: true, allowEmpty: false }
    };
  }

  /**
     * 缩短链接
     * @return {Promise<void>}
     */
  async short() {
    const { ctx, app, service } = this;
    const { url } = ctx.request.body;
    // url 标准不是所有人都遵守，例如 ？前面要加 /
    // ctx.validate(this.createRule);
    const payload = url
    let data = await service.shortUrl.short(payload);
    if (!data.hash) {
      ctx.helper.badRequest({ ctx, message: 'Invalid Hash' })
    } else {
      const { DOMAIN } = app.config.myConfig.private
      data = {
        shortUrl: `${DOMAIN}/${data.hash}`
      }
      this.success({ ctx, data });
    }
  }

  /**
   * 展开链接
   * @returns {Promise<void>}
   */
  async redirect() {
    const { ctx, service } = this
    const hash = ctx.params.hash
    const record = await service.shortUrl.expand(hash)
    if (!record) {
      ctx.helper.notFound({ ctx, message: 'no record found' })
    } else {
      ctx.status = 302;
      ctx.redirect(record.url)
    }
  }
}

module.exports = ShortUrlController;
