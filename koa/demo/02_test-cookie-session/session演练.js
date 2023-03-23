const Koa = require('koa')

const Router = require('koa-router')
const Session = require('koa-session')

const testRouter = new Router()
const app = new Koa()

// 创建session的配置
const session = Session({
  key: 'sessionId',
  maxAge: 10 * 1000,
  signed: true //是否适用加密签名
}, app)
app.keys=['aaa']//签名涉及到的算法

//如果想要设置session就必须要借助第三方库来实现了,并且session的设置必须是服务器设置
app.use(session)

testRouter.get('/demo', (ctx, next) => {
  // 设置session
  // ?session会生成一个sessionId放在cookie中返回
  // ?但是sessionId是密文的，但是客户端也可以修改，所以会造成一些泄露和伪造
  // ?所以session也可以用一些签名来保证sessionID不被修改,一旦被修改，拒绝请求
  const id = 110
  const name = 'coder'

  ctx.session.user = {
    id,
    name
  }

  ctx.body = '你好demo'
})

testRouter.get('/test', (ctx, next) => {
  // ?有了session之后，sessionId放在cookie中，每次请求都会携带
  // ?那么这时候，我只需要判断有没有session就可以了
  // ?这个过程涉及到加密解密
  console.log(ctx.session.user)
  ctx.body = '你好test'
})

app.use(testRouter.routes())

app.listen(3000, () => {
  console.log('3000端口启动成功!')
})