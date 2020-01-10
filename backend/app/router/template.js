'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const apiRouter = app.router.namespace('/api');
  const { controller } = app;

  const { template } = controller

  // 水印图片
  apiRouter.get('/template/watermarkImage', template.watermarkImage);

  // 文件上传
  apiRouter.post('/template/upload', template.upload);

  // 文件上传2
  apiRouter.post('/template/upload2', template.upload2);

  // 文件下载
  apiRouter.get('/template/download', template.download);

  // 导入
  apiRouter.post('/template/import', template.import);

  // 导出
  apiRouter.get('/template/export', template.export);
};
