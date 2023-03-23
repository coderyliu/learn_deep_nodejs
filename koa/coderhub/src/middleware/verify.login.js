const jwt = require('jsonwebtoken')
const {
  PUBLIC_KEY
} = require('../app/config')

const errorTypes = require('../constants/error.types')
const userService = require('../models/users.model')

const md5password = require('../utils/md5password')

// ?登录--判断米否是否正确
const verifyLogin = async function (ctx, next) {
  // 1.获取用户的用户名，密码
  const {
    name,
    password
  } = ctx.request.body

  // 2.判断用户名密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否存在
  const result = await userService.getUserName(name)
  const ret = result[0]
  if (!ret) {
    const error = new Error(errorTypes.USERNAME_IS_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断用户名密码是否正确
  if (md5password(password) !== ret.password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  // 5.执行下一步
  ctx.user = ret
  await next()
}

// ?验证token
const verifyToken = async function (ctx, next) {
  // console.log('验证token中间件执行了~')
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UnAuthorization)
    return ctx.app.emit('error', error, next)
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UnAuthorization)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyToken
}