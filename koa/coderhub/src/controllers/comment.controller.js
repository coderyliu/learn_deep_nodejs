const commentModel = require('../models/comment.model')

class CommentController {
  // ?用户发表评论
  async create(ctx, next) {
    // 1.获取用户信息
    const {
      content,
      momentId
    } = ctx.request.body
    const userId = ctx.user.id

    // 2.操作数据库
    const result = await commentModel.create(momentId, content, userId)

    ctx.body = result
  }

  // ?用户回复评论
  async reply(ctx, next) {
    // 1.获取用户信息
    const {
      commentId
    } = ctx.params
    const {
      momentId,
      content
    } = ctx.request.body
    const userId = ctx.user.id

    // 2.操作数据库
    const result = await commentModel.reply(momentId, content, userId, commentId)

    ctx.body = result
  }

  // ?用户修改评论
  async update(ctx, next) {
    // 1.获取用户信息
    const commentId = ctx.params.commentId
    const content = ctx.request.body.content

    // 2.操作数据库
    const result = await commentModel.update(content, commentId)

    ctx.body = result
  }

  // ?用户删除评论
  async remove(ctx, next) {
    // 1.获取用户信息
    const commentId = ctx.request.params.commentId

    // 2.操作数据库
    const result = await commentModel.remove(commentId)

    ctx.body = result
  }

  // ?用户获取评论列表
  async list(ctx, next) {
    // 1.获取用户信息
    const {
      momentId
    } = ctx.request.query

    // 2.操作数据库
    const result = await commentModel.getList(momentId)

    ctx.body = result
  }
}

module.exports = new CommentController()