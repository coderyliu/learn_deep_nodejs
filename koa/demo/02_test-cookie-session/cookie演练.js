const Koa = require('koa')

const Router = require('koa-router')

const testRouter = new Router()

const app = new Koa()

// koa提供给了我们不需要借助第三方库来操作cookie，主要原理还是koa框架的实现

testRouter.get('/demo', (ctx, next) => {
  // 设置cookie
  ctx.cookies.set('coder', 'liu', {
    maxAge: 1000 * 30,
    path: '/',
    httpOnly: false,
    secure: false
  })
  ctx.body = '你好demo'
})

testRouter.get('/test', (ctx, next) => {
  ctx.cookies.get('coder')
  ctx.body = '你好test'
})

app.use(testRouter.routes())

app.listen(3000, () => {
  console.log('3000端口启动成功!')
})