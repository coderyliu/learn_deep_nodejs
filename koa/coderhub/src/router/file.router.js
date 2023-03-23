const Router = require('koa-router')

const {
  verifyToken
} = require('../middleware/verify.login')
const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controllers/file.controller')

// 图片上传中间件
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')

const fileRouter = new Router({
  prefix: '/upload'
})

// 上传图片接口
fileRouter.post('/avatar', verifyToken, avatarHandler, saveAvatarInfo)

// 用户发表动态配图上传接口
fileRouter.post('/picture', verifyToken, pictureHandler, pictureResize, savePictureInfo)

module.exports = fileRouter