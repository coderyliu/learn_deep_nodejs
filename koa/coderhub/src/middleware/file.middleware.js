const multer = require('koa-multer')
const path = require('path')
const jimp = require('jimp')

const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file.path')

// multer库会返回给我们一个对象
const avatarUpload = multer({
  dest: AVATAR_PATH
})

// 创建另外一个图片上传对象
const pictureUpload = multer({
  dest: PICTURE_PATH
})

const avatarHandler = avatarUpload.single('avatar')
const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  try {
    // 1.获取图片信息
    const files = ctx.req.files

    // 2.对图像处理
    for (let file of files) {
      const destPath = path.join(file.destination, file.filename)
      // console.log(destPath)
      jimp.read(file.path).then(image => {
        image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
        image.resize(640, jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320, jimp.AUTO).write(`${destPath}-small`)
      })
    }

    await next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}