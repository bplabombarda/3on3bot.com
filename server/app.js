const { resolve } = require('path')

const Koa = require('koa')
const logger = require('koa-logger')

const router = require('./routes')

const app = new Koa()

app.use(logger())

if (process.env.NODE_ENV !== 'production') {
  const koaWebpack = require('koa-webpack')
  const webpackConfig = require('../config/webpack/dev.js')

  koaWebpack({
    config: webpackConfig,
    devMiddleware: {
      colors: true,
      contentBase: 'public',
      publicPath: '/',
      stats: 'minimal',
    },
    hotClient: {
      hmr: true,
    },
  })
  .then(middleware => {
    app.use(middleware)

    app.use(async ctx => {
      const filename = resolve(webpackConfig.output.path, 'index.html')
      ctx.response.type = 'html'
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    })
  })
}

app.use(router.routes())

module.exports = app
