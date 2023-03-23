const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // ctx.body = 'hello koa2'
  // ?等价于下面这种方式
  ctx.response.body = 'hello koa2'
})

// 1.koa2没有为app提供methods方式的中间件
// 即不能用app.get()/post()方式去定义中间件，只能用app.use()方式注册中间件
// 2.koa2也没有提供连续注册多个中间件句柄的方式
// 即app.use((ctx,next)=>{},()=>{})
// 3.koa2也没有提供Path的方式,必须自己去判断
// 即app.use('/login',()=>{})


app.listen(3000, () => {
  console.log('3000 端口启动完毕!')
})