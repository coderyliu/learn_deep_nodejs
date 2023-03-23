// 用户登录身份验证路由
const Router=require('koa-router')

const {login}=require('../controllers/auth.controller')
const {verifyLogin}=require('../middleware/verify.login')

const authRouter=new Router()

authRouter.post('/login',verifyLogin,login)

module.exports=authRouter