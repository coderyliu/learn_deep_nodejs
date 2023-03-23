const Router = require('koa-router')

const {
  verifyToken
} = require('../middleware/verify.login')
const {
  verifyPermission
} = require('../middleware/verify.permission')

const {
  create,
  detail,
  list,
  update,
  remove,
  fileInfo
} = require('../controllers/moment.controller')

const MomentRouter = new Router({
  prefix: '/moment'
})

// 用户发表动态
MomentRouter.post('/', verifyToken, create)

// 获取多条动态
MomentRouter.get('/list', list)

// 获取某一条动态
MomentRouter.get('/:momentId', detail)

// 修改某一条动态   修改之前要登录,并且要具有权限
MomentRouter.patch('/:momentId', verifyToken, verifyPermission, update)

// 删除某一条动态   删除之前要登录,并且要具有权限
MomentRouter.delete('/:momentId', verifyToken, verifyPermission, remove)

// 动态配图接口
MomentRouter.get('/images/:filename',fileInfo)

module.exports = MomentRouter