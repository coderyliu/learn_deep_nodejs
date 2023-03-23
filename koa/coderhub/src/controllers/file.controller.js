const fileModel = require('../models/file.model')
const userModel = require('../models/users.model')

const {
  AVATAR_PATH
} = require('../constants/file.path')
const config = require('../app/config')

class FileController {
  // ?头像上传
  async saveAvatarInfo(ctx, next) {
    // 1.获取上传的图片信息
    const userId = ctx.user.id
    const {
      filename,
      mimetype,
      size
    } = ctx.req.file

    // 2.操作数据库，保存图片信息
    const result = await fileModel.createAvatar(filename, mimetype, size, userId)

    // 3.给用户表更新头像信息
    const avatarUrl = `${config.APP_HOST}:${config.APP_PORT}/users/${userId}/avatar`
    await userModel.updateAvatarById(userId, avatarUrl)

    ctx.body = {
      message: '上传头像成功~'
    }
  }

  // ?图片上传
  async savePictureInfo(ctx, next) {
    // 1.获取用户的数据
    const userId = ctx.user.id
    const momentId = ctx.query.momentId
    const files = ctx.req.files

    // 2.操作数据库，插入图片
    for (let file of files) {
      const {
        filename,
        mimetype,
        size
      } = file
      await fileModel.createPicture(filename, mimetype, size, userId, momentId)
    }

    ctx.body='上传动态配图成功!'
  }
}

module.exports = new FileController