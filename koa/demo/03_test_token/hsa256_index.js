const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

// jwt生成token鉴权
const jwt = require('jsonwebtoken')

// ?hs256采用的对称加密算法，即加密解密用的都是同一个密钥(对称密钥)
// ?这样的话在分布式系统或者是服务器集群中，尽管hs256加密的签名不能被破解，但是如果对称密钥被泄露的话
// ?也会造成token模拟，达到攻击的目的
// ?所以，尽可能的话还是用rsa非对称加密，这样的话,只有颁发token的服务器知道私钥，其他的服务器只有公钥
// ?其他服务器只能做一个token验证，不能做token颁发，而且私钥的生成也是不一样的，公钥是基于私钥生成的
const SecretKey='aaaaaaaa'

const testRouter = new Router()

const app = new Koa()

// todo 颁发token
testRouter.post('/login', (ctx, next) => {
  const user = {
    id: 110,
    name: 'coder'
  }
  const token = jwt.sign(user, SecretKey, {
    expiresIn: 60, //token有效时间，单位s
    algorithm: 'HS256', //加密算法，非对称加密rsa256
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
    const result = jwt.verify(token, SecretKey, {
      algorithms: ['HS256']
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