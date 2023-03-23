const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

// jwt生成token鉴权
const jwt = require('jsonwebtoken')

// 获取公钥和私钥
// ?需要注意的是在node当中所有的相对路径的读取都是相对于process.cwd()，也就是程序启动的目录，来找资源的
// ?所以在开发当中我们一般都会把相对路径转化为绝对路径
// console.log(process.cwd())//D:\前端\Node\koa\demo\03_test_token
const privateKey = fs.readFileSync(path.join(__dirname, './keys/privat.key'))//同步读取到的是buffer
const publicKey = fs.readFileSync(path.join(__dirname, './keys/public.key'))

const testRouter = new Router()

const app = new Koa()

// todo 颁发token
testRouter.post('/login', (ctx, next) => {
  const user = {
    id: 110,
    name: 'coder'
  }
  const token = jwt.sign(user, privateKey, {
    expiresIn: 60,//token有效时间，单位s
    algorithm: 'RS256',//加密算法，非对称加密rsa256
  })

  ctx.headers.authorization = token
  ctx.body = token
})

// todo 验证token
testRouter.get('/list', (ctx, next) => {
  // ?验证token 需要进行捕获异常，如果token是被修改过的，伪造的会抛出异常
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })
    ctx.body = result
  } catch (e) {
    ctx.body = 'see you later,sb'
  }
})

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(3000, () => {
  console.log('3000端口启动成功~')
})