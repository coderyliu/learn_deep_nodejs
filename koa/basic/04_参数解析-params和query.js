// ?ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象,
// ?同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP请求对象。
const Koa = require('koa')

const Router = require('koa-router')

const app = new Koa()
const UserRouter = new Router({
  prefix: '/users'
})

UserRouter.get('/menu/:id', (ctx, next) => {
  // todo params是我们url中的路径后边的动态参数
  console.log(ctx.request.params)
  // todo query是我们在url中的的查询参数,都会帮我们自动解析为对象
  // todo ctx.query===ctx.request.query
  // ?query是把参数解析为对象格式，而queryString是字符串格式name=coder&age=20,这两种方式都可以
  console.log(ctx.request.query)
  // todo url路径
  console.log(ctx.request.url)
  ctx.response.body = 'hello users'
})

app.use(UserRouter.routes())

app.listen(3001, () => {
  console.log('3001端口启动成功!')
})