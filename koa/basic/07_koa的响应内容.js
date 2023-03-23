const Koa = require('koa')

const app = new Koa()

// koa的响应内容的格式可以有多种，包括:字符串,buffer,对象/数组，空内容，stream流数据
// ?ctx.body===ctx.response.body这样是等价的，实际上是koa源码上做了一个代理，让他们进行了个等价关系
// ?包括ctx.request或ctx.response上的很多方法都做了代理
app.use((ctx, next) => {
  // 1.string
  // ctx.body='hello coderliu'
  // 2.object--返回的是json格式
  // ctx.body = {
  //   name: "coder",
  //   age: 20
  // }
  // 3.array
  ctx.body = [1, 2, 3]
})

app.listen(3000, () => {
  console.log('3000 端口启动完毕!')
})