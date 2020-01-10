'use strict';

const Moment = require('moment');
// 使用中文
Moment.locale('zh-cn');
const Jwt = require('jsonwebtoken');
const Uuid = require('uuid')

const errorCode = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Moved Temporarily',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unordered Collection',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required'
};

module.exports = {
  errorCode,

  // 格式化时间
  formatDate(params) {
    return Moment(params)
      .format('YYYY-MM-DD HH:mm:ss');
  },

  // 创建token
  async createToken(user, session, expirationPeriod) {
    let token = {}

    const JwtSecret = this.config.myConfig.private.JWT_SECRET

    if (session) {
      token = await Jwt.sign(
        {
          sessionId: session.id,
          sessionKey: session.key,
          passwordHash: session.passwordHash,
        },
        JwtSecret,
        { algorithm: 'HS256', expiresIn: expirationPeriod }
      )
    } else {
      const tokenUser = {
        username: user.username,
        // role: user.role,
        // roleName: user.roleName,
        // createdAt: user.createdAt,
        // updatedAt: user.updatedAt,
        id: user.id
      }

      // console.log(tokenUser)

      token = Jwt.sign(
        {
          user: tokenUser
        },
        JwtSecret,
        { algorithm: 'HS256', expiresIn: expirationPeriod }
      )
    }

    return token
  },

  // 解码 token
  decodeToken(token) {
    let result;
    // ignoreExpiration: true 不验证令牌到期时间（因为验证逻辑不在这里，不能返回error）
    Jwt.verify(token, this.config.myConfig.private.JWT_SECRET, { ignoreExpiration: true }, (err, decoded) => {
      if (!err) {
        result = decoded;
      }
    });
    return result;
  },

  // 成功
  success({ ctx, data = null }) {
    ctx.status = 200;
    ctx.body = data
  },

  // 失败
  fail({ ctx, statusCode = 500, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 400
  badRequest({ ctx, statusCode = 400, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 401
  unauthorized({ ctx, statusCode = 401, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 402
  paymentRequired({ ctx, statusCode = 402, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 403
  forbidden({ ctx, statusCode = 403, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 404
  notFound({ ctx, statusCode = 404, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 405
  methodNotAllowed({ ctx, statusCode = 405, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 406
  notAcceptable({ ctx, statusCode = 406, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 407
  proxyAuthRequired({ ctx, statusCode = 407, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 408
  clientTimeout({ ctx, statusCode = 408, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 409
  conflict({ ctx, statusCode = 409, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },


  // 410
  resourceGone({ ctx, statusCode = 410, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 411
  lengthRequired({ ctx, statusCode = 411, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 412
  preconditionFailed({ ctx, statusCode = 412, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 413
  entityTooLarge({ ctx, statusCode = 413, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 414
  uriTooLong({ ctx, statusCode = 414, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 415
  unsupportedMediaType({ ctx, statusCode = 415, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 416
  rangeNotSatisfiable({ ctx, statusCode = 416, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 417
  expectationFailed({ ctx, statusCode = 417, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 418
  teapot({ ctx, statusCode = 418, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 422
  badData({ ctx, statusCode = 422, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 423
  locked({ ctx, statusCode = 423, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 424
  failedDependency({ ctx, statusCode = 424, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 428
  preconditionRequired({ ctx, statusCode = 428, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 429
  tooManyRequests({ ctx, statusCode = 429, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 451
  illegal({ ctx, statusCode = 451, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 500
  internal({ ctx, statusCode = 500, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 501
  notImplemented({ ctx, statusCode = 501, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 502
  badGateway({ ctx, statusCode = 502, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 503
  serverUnavailable({ ctx, statusCode = 503, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },

  // 504
  gatewayTimeout({ ctx, statusCode = 504, message = '' }) {
    ctx.status = statusCode;
    ctx.body = {
      statusCode,
      error: ctx.helper.errorCode[statusCode],
      message: message ? message : ctx.helper.errorCode[statusCode],
    }
  },
};
