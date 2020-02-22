'use strict';

const Service = require('egg/index').Service;

class ShortUrlService extends Service {

  /**
   * 获取hash
   * @param retryCount 重试次数
   * @return {Promise<*|null>}
   */
  async getHash(retryCount) {
    const { ctx } = this
    // 生成hash
    const hash = ctx.helper.getShortidHash()
    // 检查是否已经存在hash
    const existHash = await ctx.model.ShortUrl.findOne({ where: { hash } })
    if (existHash) {
      if (retryCount > 1) {
        return this.getHash(retryCount - 1)
      }
      return null
    }
    return hash
  }

  /**
   * 缩短链接
   * @param url 原始Url地址
   * @return {Promise<{url: *, hash: *}>}
   */
  async short(url) {
    const { ctx } = this
    const exist = await ctx.model.ShortUrl.findOne({ where: { url, isEnabled: true } })
    if (!exist) {
      // 生成hash
      const hash = await this.getHash(3)
      // 尝试多次仍然没有获取到hash，直接抛出异常
      if (!hash) {
        // const err = new Error('Invalid Hash')
        // err.status = 400
        // throw err
        return { url, hash }
      }

      // 插入数据库
      await ctx.model.ShortUrl.create({ url, hash })
      return { url, hash }
    }

    return { url, hash: exist.hash }
  }

  /**
   * 展开链接
   * @param hash 短链接的 hash
   * @returns {Promise<any|string>}
   */
  async expand(hash) {
    const { app } = this
    const { CACHE_PREFIX, CACHE_MAX_AGE } = app.config.myConfig.private.SHORTURL
    let result = await app.redis.get(`${CACHE_PREFIX}:${hash}`)
    if (!result) {
      result = await app.model.ShortUrl.findOne({ where: { hash } })
      if (result) {
        await app.redis.set(`${CACHE_PREFIX}:${hash}`,
          JSON.stringify(result),
          'ex',
          CACHE_MAX_AGE)
      }
    }

    // 如果result是字符串，需要转换成json
    result = typeof result === 'string' ? JSON.parse(result) : result
    return result
  }

}

module.exports = ShortUrlService;
