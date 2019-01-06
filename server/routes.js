const Router = require('koa-router')

const createRequest = require('./utils/createRequest')

const router = new Router()

router.get('/app', ctx => {
  ctx.body = 'This is the app.'
})

router.get('/schedule', async ctx => {
  const {
    path,
    query,
  } = ctx
  const response = await createRequest(`/api/v1/${path}`, query)
  ctx.body = response
})

module.exports = router
