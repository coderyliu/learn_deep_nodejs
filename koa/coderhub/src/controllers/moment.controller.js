const fs = require('fs')
const momentService = require('../models/moment.model')
const fileService = require('../models/file.model')
const {
  PICTURE_PATH
} = require('../constants/file.path')

class MomentController {
  // ?用户发表动态
  async create(ctx, next) {
    // 1.拿到用户user_id,content
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 2.操作数据库，插入数据
    const result = await momentService.create(userId, content)

    ctx.body = result
  }
  // ?用户获取多条数据
  async list(ctx, next) {
    // 1.拿到用户的offset、limit
    const {
      offset,
      limit
    } = ctx.request.query

    // 2.操作数据库，获取数据
    const result = await momentService.list(offset, limit)

    ctx.body = result
  }

  // ?用户获取某一条动态
  async detail(ctx, next) {
    // 1.拿到动态id
    const momentId = ctx.request.params.momentId

    // 2.操作数据库,获取数据
    const result = await momentService.detail(momentId)

    ctx.body = result
  }

  // ?修改某一条动态
  async update(ctx, next) {
    const {
      momentId
    } = ctx.request.params

    const {
      content
    } = ctx.request.body
    const result = await momentService.update(momentId, content)

    ctx.body = result
  }

  // ?删除某一条动态
  async remove(ctx, next) {
    const {
      momentId
    } = ctx.request.params
    const result = await momentService.remove(momentId)

    ctx.body = result
  }

  // ?动态配图服务
  async fileInfo(ctx, next) {
    let {
      filename
    } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)

    const type = ctx.query.type
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    // console.log(filename)
    ctx.response.set('content-type', fileInfo[0].mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()