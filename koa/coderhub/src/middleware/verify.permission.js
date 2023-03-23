const authModel = require('../models/auth.model')
const errorTypes = require('../constants/error.types')

// ? 判断用户是否具有修改权限
const verifyPermission = async function (ctx, next) {
  // 获取用户的Id以及要修改的动态的id
  const userId = ctx.user.id
  const {
    momentId
  } = ctx.request.params

  // 2.去数据中查找
  const result = await authModel.checkPermission(userId, momentId)

  if (!result) {
    const error = new Error(errorTypes.No_Permission)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.返回true证明有权限
  await next()
}
const verifyCommentPermission = async function (ctx, next) {
  // 获取用户的Id以及要修改的动态的id
  const userId = ctx.user.id
  const {
    commentId
  } = ctx.request.params

  // 2.去数据中查找
  const result = await authModel.checkCommentPermission(userId, commentId)

  if (!result) {
    const error = new Error(errorTypes.No_Permission)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.返回true证明有权限
  await next()
}

module.exports = {
  verifyPermission,
  verifyCommentPermission
}