'use strict';

const path = require('path');
const fs = require('fs-extra');

// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

const admZip = require('adm-zip')

const Controller = require('./base');

class CourseController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }

  // 上传(按时间归档分类)
  async upload() {
    const { ctx, service: { template } } = this;

    const category = 'others'
    const stream = await ctx.getFileStream();
    console.log('-----------获取数据 start--------------');
    console.log(stream);
    // formData中的其他字段
    console.log(stream.fields);
    console.log('-----------获取数据 end--------------');
    // 基础目录
    const uploadBasePath = 'app/public/upload';
    // 生成文件名
    const extName = path.extname(stream.filename)
      .toLocaleLowerCase();
    const fileName = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${extName}`;
    // 生成文件夹
    const dirName = dayjs(Date.now())
      .format('YYYY/MM/DD');
    console.log(uploadBasePath, category, dirName)
    await fs.ensureDir(path.join(uploadBasePath, category, dirName))
    // 生成写入路径
    const target = path.join(uploadBasePath, category, dirName, fileName)
    console.log('-----------目标路径---------', target);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道，否则浏览器会卡死
      await sendToWormhole(stream);
      this.fail({ ctx, err });
    }
    this.success({ ctx, data: { url: path.join('/public/upload', category, dirName, fileName), } });
  }
}

module.exports = CourseController;
