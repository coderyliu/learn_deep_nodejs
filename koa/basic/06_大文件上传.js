const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')

// 文件上传第三方插件
const multer = require('koa-multer')

const app = new Koa()
const uploadRouter = new Router({
  prefix: '/upload'
})

// 使用multer库
// 指定文件存放路径，文件名称
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
const upload = multer({
  desc: './uploads/'
})

uploadRouter.post('/avatar', upload.single('avatar'), (ctx, next) => {
  // todo 这里注意，和其它的上传不同的是，Koa解析出来的文件信息存放在req里，和request是不同的
  // todo ctx.request是koa自己封装的，而req是http request对象
  console.log(ctx.req.file)
  ctx.response.body = '上传成功!'
})

app.use(uploadRouter.routes())

app.listen(3000, () => {
  console.log('3000端口启动成功')
})