// ?cookie的设置，Koa2提供了直接从上下文ctx中读取、写入session的方法
// ?ctx.cookies.get(name,[options])
// ?ctx.cookies.set(key,value,[options])

// todo 原理其实是koa源码中使用了npm的cookies模块

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('cid', 'hello world', {
      domain: 'localhost',
      path: '/index',
      maxAge: 10 * 60 * 1000,
      expires: new Date('2022-05-15'),
      httpOnly: false,
      overwrite: false
    })
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000, () => {
  console.log('3000端口启动完毕~')
})