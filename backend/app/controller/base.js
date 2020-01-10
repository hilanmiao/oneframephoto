'use strict';

// controller 编写规范
// 1.方法名和 service 方法名需要一致
// 2.调用service只能传入id，payload两个参数
// 3.验证规则命名前缀是该方法的名称，如：createRule
// 4.伪删除的表获取数据时注意要判断deleted_at字段
// 5.动作名称和业务不要有关系，例：create不要写成courseCreate

// 常见公共方法名如下：
// index：默认或分页列表
// create: 添加
// update: 编辑
// destroy: 删除
// show: 详情
// all: 所有
// copy: 复制
// enable: 设置为可用
// disable: 设置为不可用
// sort: 排序
// top: 置顶
// cancelTop: 取消置顶
// isExist: 是否存在
// isExistChildren: 是否存在子项目
// statistics: 统计
// count: 数量
// findAll: 根据条件过滤
// findOne: 根据条件过滤一个


// 其他方法名请遵循"动作+内容"，举例
// sendEmail: 发送邮件
// enableAccount: 启用账户

// 返回内容结构为:
// {
//   statusCode,
//   data,
//   message,
//   error
// }

const path = require('path')
const fs = require('fs-extra')
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole')
const dayjs = require('dayjs')

const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 成功
  success({ ctx, data = null }) {
    ctx.status = 200;
    ctx.body = data
  }

  // 失败
  fail({ ctx, statusCode = 500, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  }

  // 上传通用方法(按时间归档分类)
  async baseUpload(category = '') {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    console.log('-----------获取数据 start--------------')
    console.log(stream);
    // formData中的其他字段
    console.log(stream.fields);
    console.log('-----------获取数据 end--------------')
    // 基础目录
    const uploadBasePath = 'app/public/upload'
    // 生成文件名
    const extName = path.extname(stream.filename).toLocaleLowerCase()
    const fileName = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${extName}`
    // 生成文件夹
    const dirName = dayjs(Date.now()).format('YYYY/MM/DD')
    await fs.ensureDir(path.join(uploadBasePath, category, dirName))
    // 生成写入路径
    const target = path.join(uploadBasePath, category, dirName, fileName)
    console.log('-----------目标路径---------', target)
    // 写入流
    const writeStream = fs.createWriteStream(target)
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      // 如果出现错误，关闭管道，否则浏览器会卡死
      await sendToWormhole(stream)
      return {
        err
      }
    }
    return {
      url: path.join('/public/upload', category, dirName, fileName),
      fields: stream.fields,
    }
  }
}

module.exports = BaseController
