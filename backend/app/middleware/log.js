'use strict';
const Moment = require('moment');
const Fs = require('fs');
// app/middleware/error_handler.js
module.exports = () => {
  return async (ctx, next) => {
    console.log('middleware log')

    const log = { request: ctx.request, params: ctx.gets, time: Moment().format('YYYY-MM-DD HH:mm:ss') };
    const new_log = JSON.stringify(log) + '\r\n';
    Fs.writeFile(`logs/request_log/${Moment().format('YYYY-MM-DD')}.txt`, new_log, { mode: '0777', flag: 'a' }, function(err) {
      if (err) {
        return console.error(err);
      }
    });
    // console.log(new Date(Moment().format('YYYY-MM-DD')).getTime());  获取当天0点的时间辍
    await next();
  };
};
