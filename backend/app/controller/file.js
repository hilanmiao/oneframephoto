'use strict';

const path = require('path');
const fs = require('fs-extra');

const sharp = require('sharp');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
const awaitReadStream = require('await-stream-ready').read;
const { PassThrough, Transform } = require('stream')

// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

const admZip = require('adm-zip')

const ReadableStreamClone = require('readable-stream-clone')

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

  // 上传(按时间归档分类，加入图片宽高)
  async uploadPhoto() {
    const { ctx, service: { template } } = this;

    const category = 'others'
    const stream = await ctx.getFileStream();
    console.log('-----------获取数据 start--------------');
    console.log(stream);
    // formData中的其他字段
    console.log(stream.fields);
    console.log('-----------获取数据 end--------------');

    try {
      // clone 流
      // const streamClone = new ReadableStreamClone(stream);
      const streamClone = new Transform({
        highWaterMark: 10 * 1024 * 1024,
        transform: (chunk, encode, next) => {
          next(null, chunk);
        }
      })
      stream.pipe(streamClone)

      // 基础目录
      const uploadBasePath = 'app/public/upload';
      // 生成文件名
      const extName = path.extname(stream.filename)
        .toLocaleLowerCase();
      // 使用 sharp 获取图片宽高
      let wh = ''
      const meta = await sharp().metadata(function(err, metadata) {
        console.log('-----------图片metadata---------', metadata);
        wh = `${metadata.width}x${metadata.height}`
      })
      await awaitReadStream(stream.pipe(meta))

      const fileName = `${wh}-${Date.now()}${Number.parseInt(Math.random() * 1000)}${extName}`;

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

      // 异步把文件流 写入
      await awaitWriteStream(streamClone.pipe(writeStream));
      this.success({ ctx, data: { url: path.join('/public/upload', category, dirName, fileName), } });
    } catch (err) {
      console.log(err)
      // 如果出现错误，关闭管道，否则浏览器会卡死
      await sendToWormhole(stream);
      this.fail({ ctx, err });
    }
  }
}

module.exports = CourseController;
