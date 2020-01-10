## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

## 插件说明

- 日志插件 egg-logger
- view 模板插件 egg-view-nunjucks
- 国际化(i18n)插件 egg-i18n
- 数据 ORM 插件 egg-sequelize
- sequelize-cli 工具来实现 Migrations sequelize-cli
- passport 鉴权插件 egg-passport
- 静态资源插件 egg-view-assets
- 验证码生成插件 svg-captcha

## 目录说明

- app/router.js 用于配置 URL 路由规则，具体参见 Router。
- app/controller/\*\* 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
- app/service/\*\* 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
- app/middleware/\*\* 用于编写中间件，可选，具体参见 Middleware。
- app/public/\*\* 用于放置静态资源，可选，具体参见内置插件 egg-static。
- app/extend/\*\* 用于框架的扩展，可选，具体参见框架扩展。
- config/config.{env}.js 用于编写配置文件，具体参见配置。
- config/plugin.js 用于配置需要加载的插件，具体参见插件。
- test/\*\* 用于单元测试，具体参见单元测试。
- app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于 agent.js 的作用参见 Agent 机制。

### 由内置插件约定的目录：

- app/public/\*\* 用于放置静态资源，可选，具体参见内置插件 egg-static。
- app/schedule/\*\* 用于定时任务，可选，具体参见定时任务。
- app/view/\*\* 用于放置模板文件，可选，由模板插件约定，具体参见模板渲染。
- app/model/\*\* 用于放置领域模型，可选，由领域类相关插件约定，如 egg-sequelize。

### 团队约定的目录

- app/controller/frontend 网站前端 controller
- app/public/frontend 网站前端资源

- app/controller/backend 网站管理系统 controller
- app/public/backend 网站管理系统资源

### 团队包装的类或方法

- await this.service.public.sms.index(18053648357, { code: 1234 }, 模板); 参数 1 是手机号,2 是一个对象,3 是模板的码
