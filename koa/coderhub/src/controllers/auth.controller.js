const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY
} = require('../app/config')

// 处理用户登录身份验证函数
class AuthController {
  async login(ctx, next) {
    const {
      id,
      name
    } = ctx.user

    // 生成token
    const token = jwt.sign({
      id,
      name
    }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    ctx.body = {
      id,
      name,
      token
    }
  }
}

module.exports = new AuthController()