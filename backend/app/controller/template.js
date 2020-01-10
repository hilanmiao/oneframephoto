'use strict';

// 这是一个模板文件

// const images = require('images')
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const util = require('util');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');
const ExcelJs = require('exceljs');

const Controller = require('./base');

class TemplateController extends Controller {

  constructor(ctx) {
    super(ctx);
    // 验证规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    };
  }


  // 导入
  async import() {
    const { ctx, service: { template } } = this;

    try {
      // 基础目录
      const uploadBasePath = 'app/public/template';
      const filePath = path.join(uploadBasePath, 'importTest.xlsx');
      const workbook = new ExcelJs.Workbook();
      // 读取文件(也可以直接从流中获取)
      await workbook.xlsx.readFile(filePath);
      // 重新结构化数据
      const data = [];
      // 获取工作表
      const worksheet = workbook.getWorksheet(1);
      // 迭代工作表中具有值的所有行
      worksheet.eachRow((row, rowNumber) => {
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
        // 去掉几行表头
        if (rowNumber > 2) {
          // 重新组织数据，excel无论单元格还是行都是从1开始的
          if (row.values[1]) {
            const model = {
              A: row.values[1] ? row.values[1] + '' : '',
              B: row.values[2] ? row.values[2] + '' : '',
              C: row.values[3] ? row.values[3] + '' : '',
              D: row.values[4] ? row.values[4] + '' : '',
              E: row.values[5] ? row.values[5] + '' : '',
            };

            data.push(model);
          }
        }
      });
      // 业务处理
      const result = data;
      this.success({ ctx, result });
    } catch (err) {
      this.fail({ ctx, result: err });
    }
  }

  // 导出
  async export() {
    const { ctx, service: { template } } = this;

    try {
      // 创建一个文件
      const workbook = new ExcelJs.Workbook();
      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Her';
      workbook.created = new Date();
      workbook.modified = new Date();

      // 创建一个工作组
      const sheet = workbook.addWorksheet('Export Data Sheet');

      // 设置默认行高
      sheet.properties.defaultRowHeight = 20;

      // 创建列
      // eslint-disable-next-line no-sparse-arrays
      sheet.getRow(1).values = ['合同金额', '预付款（第一笔）', , , '申请人'];
      sheet.getRow(2).values = ['合同金额', '金额', '单据', '日期', '申请人'];

      // 设置表头样式
      const colorHeader = 'FFDB8B89';
      const rowHeader1 = sheet.getRow(2);
      rowHeader1.eachCell((cell, rowNumber) => {
        sheet.getColumn(rowNumber).alignment = { vertical: 'middle', horizontal: 'center' };
        sheet.getColumn(rowNumber).font = { size: 12, family: 2, bold: true };
        sheet.getColumn(rowNumber).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: colorHeader }
        };
        sheet.getColumn(rowNumber).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });

      // 冻结行
      sheet.views = [{
        state: 'frozen', ySplit: 2, activeCell: 'A1'
      }];

      // 合并单元格
      sheet.mergeCells('A1:A2');
      sheet.mergeCells('B1:D1');
      sheet.mergeCells('E1:E2');

      // 添加数据项定义
      sheet.columns = [
        { key: 'A', width: 30 },
        { key: 'B', width: 30 },
        { key: 'C', width: 30 },
        { key: 'D', width: 30 },
        { key: 'E', width: 30 },
      ];

      // 业务处理获取数据并重新组织数据格式与定义项相同
      const tempData = [
        {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5'
        },
        {
          A: '2',
          B: '3',
          C: '4',
          D: '5',
          E: '6'
        }
      ];

      // 创建行
      sheet.addRows(tempData);

      // ----------------- Tips:保存导出的数据，方便排查用。如果不需要可以删除 -------------------
      // 基础目录
      const uploadBasePath = 'app/public/upload';
      // 生成文件名
      const extName = '.xlsx'
      const fileName = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${extName}`;
      // 生成文件夹
      const dirName = dayjs(Date.now())
        .format('YYYY/MM/DD');
      await fs.ensureDir(path.join(uploadBasePath, 'export', dirName));
      // 生成写入路径
      const target = path.join(uploadBasePath, 'export', dirName, fileName);
      // ----------------- Tips -------------------

      // 写文件
      await workbook.xlsx.writeFile(target);
      // 返回下载路径
      this.success({ ctx, result: { url: path.join('/public/upload/export', dirName, fileName) } });
    } catch (err) {
      this.fail({ ctx, result: err });
    }
  }

  // 复杂查询1

  // 复杂查询2

  // 图片加水印
  async watermarkImage() {
    const { ctx, service: { template } } = this;
    // // TODO: images 模块暂时不支持node12，2019-12-9
    // const dir = path.join(this.config.baseDir, 'app/public/template')
    // const watermarkImage = images(path.join(dir, 'watermark.jpeg'))
    // const sourceImage = images(path.join(dir, 'imageTest.jpg'))
    // // 获取原图尺寸和水印图片尺寸
    // const sWidth = sourceImage.width()
    // const sHeight = sourceImage.height()
    // const wmWidth = watermarkImage.width()
    // const wmHeight = watermarkImage.height()
    //
    // images(sourceImage)
    //   // 设置绘制的坐标位置，右下角距离 40px
    //   .draw(watermarkImage, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
    //   .save('watermarkTest.jpg')

    try {
      const dir = path.join(this.config.baseDir, 'app/public/template');
      const pathSourceImage = path.join(dir, 'imageTest.jpg');
      const pathSourceImageCopy = path.join(dir, 'imageTestCopy.jpg');
      const pathWatermarkImage = path.join(dir, 'watermark.jpeg');
      // await fs.copy(pathSourceImage, pathSourceImageCopy)
      const sharpImage = sharp(pathSourceImage);
      // const metadata = await sharpImage.metadata()
      // console.log(metadata.width)
      const result = await sharpImage.composite([{ input: pathWatermarkImage, gravity: 'centre' }])
        .toFile(pathSourceImageCopy);
      this.success({ ctx, result });
    } catch (err) {
      this.fail({ ctx, result: err });
    }
  }

  // pdf加水印
  async watermarkPDF() {
    const { ctx, service: { template } } = this;

    try {
      const result = {};
      this.success({ ctx, result });
    } catch (err) {
      this.fail({ ctx, result: err });
    }
  }

  // 日志记录

  // 上传(按时间归档分类)
  async upload(category = 'others') {
    const { ctx, service: { template } } = this;

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
    this.success({ ctx, result: { url: path.join('/public/upload', category, dirName, fileName), } });
  }

  // 上传（继承自base）
  async upload2() {
    const { ctx, service: { template } } = this;

    const { err, url, fields } = await this.baseUpload('avatar');
    if (!err) {
      const result = { url, fields };
      this.success({ ctx, result });
    } else {
      this.fail({ ctx, result: err });
    }
  }

  // 下载
  async download() {
    const { ctx, service: { template } } = this;

    // 基础目录
    const uploadBasePath = 'app/public/template';
    const filePath = path.join(uploadBasePath, 'pdfTest.pdf');
    // HTTP消息实体的传输长度，前端进度条可以使用content-length实现
    const fileSize = (await util.promisify(fs.stat)(filePath)).size.toString();
    // attachment 是附件下载。还有个inline是浏览，不同浏览器效果不同
    ctx.attachment(filePath);
    // ctx.set('Content-disposition', 'inline; filename=pdfTest.pdf');
    ctx.set('Content-Length', fileSize);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(filePath);
    // 前端需要使用 a 标签模拟 <a download href="http://192.168.31.21:7001/api/template/download">download</a>

    // TODO：断点续传
  }
}

module.exports = TemplateController;
