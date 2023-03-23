// 用户评论路由
const Router = require('koa-router')
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controllers/comment.controller')

const {
  verifyToken
} = require('../middleware/verify.login')

const {
  verifyCommentPermission
} = require('../middleware/verify.permission')

const commentRouter = new Router({
  prefix: '/comment'
})

// 用户发表评论
commentRouter.post('/', verifyToken, create)

// 用户回复评论接口
commentRouter.post('/:commentId/reply', verifyToken, reply)

// 修改评论
commentRouter.patch('/:commentId/update', verifyToken, verifyCommentPermission, update)

// 删除评论
commentRouter.delete('/:commentId/remove', verifyToken, verifyCommentPermission, remove)

// 获取评论列表
commentRouter.get('/list', list)

module.exports = commentRouter