'use strict';

const cryptoRandomString = require('crypto-random-string')
const dayjs = require('dayjs')

const Service = require('egg/index').Service;

class SmsService extends Service {

  // 发送短信验证码
  async sendSmsCode(payload) {
    const { app } = this;
    const { mobile } = payload;

    const timeNow = dayjs()
    const day = timeNow.format('YYYYMMDD')
    const prefix = 'smslogin'
    const suffix = timeNow.format('YYYYMMDDHHmmss')
    const countKey = `count_${prefix}_${mobile}_${day}`
    const codeKeyPrefix = `${prefix}_${mobile}`
    const codeKey = `${codeKeyPrefix}_${suffix}`

    // 计算当前时间到当天23:59:59的间隔
    const dayEnd = dayjs(day + '23:59:59')
    const secondDiff = dayEnd.diff(timeNow, 'second')
    const data = { result: false, message: '' }

    // 系统限制
    const { SEND_INTERVAL, COUNT_LIMIT, EFFECTIVE_TIME } = app.config.myConfig.constants.SMS

    console.log(countKey, codeKey, secondDiff)

    // 1.查看配额
    const count = await this.app.redis.get(countKey)
    if (count >= COUNT_LIMIT) {
      data.message = '今日发送验证码次数已达到上限，请明天再尝试'
      return data
    }

    // 2.查看发送时间间隔（60s）内是否已经有数据
    const list = await this.app.redis.keys(codeKeyPrefix + '*')
    console.log('list', list)
    const timeList = list.map(item => {
      const time = item.split('_')[2]
      return time
    })
    console.log('timeList', timeList)
    let tooFrequent = false
    if (timeList.length >= 1) {
      tooFrequent = timeList.some(item => {
        console.log('diff', dayjs(suffix).diff(dayjs(item), 'second'))
        return dayjs(suffix).diff(dayjs(item), 'second') <= SEND_INTERVAL
      })
      console.log('tooFrequent', tooFrequent)
      if (tooFrequent) {
        data.message = '验证码发送过于频繁'
        return data
      }
    }

    // 3.发送验证码
    const code = cryptoRandomString({ length: 6, type: 'numeric' })
    // 阿里云短信接口
    console.log('send sms')

    // 4.设置到redis，并设置过期时间
    await this.app.redis.setex(codeKey, EFFECTIVE_TIME, code)
    console.log('set redis')

    // 5.增加当天访问验证码次数
    if (!count) {
      // 初始化 1， 并设置过期时间到当天23:59:59
      await this.app.redis.setex(countKey, secondDiff, 1)
    } else {
      // 自增 1
      await this.app.redis.incr(countKey)
    }
    console.log('send redis count')

    data.result = true
    return data
  }
}

module.exports = SmsService;
