const Router = require('koa-router')

// 中间件路由句柄函数
const {
  create,
  success,
  avatarInfo
} = require('../controllers/users.controller')

// 中间件判断用户信息
const {
  verifyUser,
} = require('../middleware/verify.user')
const {verifyToken}=require('../middleware/verify.login')

const userRouter = new Router({
  prefix: '/users'
})

userRouter.post('/', verifyUser, create)
userRouter.get('/profile',verifyToken,success)

// 获取头像信息
userRouter.get('/:id/avatar',verifyToken,avatarInfo)

module.exports = userRouter