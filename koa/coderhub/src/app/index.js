const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const useRoutes=require('../router')

// 错误处理中间件
const {
  errorhandler
} = require('./errorhandler')

const app = new Koa()
app.useRoutes=useRoutes
// 处理post请求的请求体参数
app.use(bodyParser())

app.useRoutes()

// 错误处理中间件
app.on('error', errorhandler)

module.exports = app