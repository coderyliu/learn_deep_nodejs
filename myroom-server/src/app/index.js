const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const process = require("process");

// 处理body参数中间件
const bodyParser = require("koa-bodyparser");

const useRoutes = require("../router");
// 错误处理函数
const errorHandle = require("./errorhandle");

const app = new Koa();
app.useRoutes = useRoutes;
app.use(cors());

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1024 * 1024 * 200,
    },
  })
);

// ?node中处理错误的几种方式：
// todo 1.同步代码可以通过try catch来捕捉，不过一般使用async/await 在里面使用try catch
// todo 2.通过promise或者async/await来捕捉try catch
// todo 3.通过全局错误捕捉中间价 app.use(async (ctx,next)=> try{ await next() }catch(err){ /*处理错误逻辑*/ })
// todo 4.通过koa自带的ctx.emit('error') 和ctx.on('error'),来处理
// todo 5.通过process.on('uncaughtException',(err)=>{处理逻辑})

// *另外，当我们使用pm2或者fover第三方包的时候，一旦发生错误，会重启服务器

// ?这个process对象里面的监听uncaughtException,捕捉try catch没有捕捉到的错误
process.on("uncaughtException", (err) => {
  // process.exit(1);
  //!表示退出进程，即关闭服务器，尽量少用 而是用pm2或者其他工具，来重启服务器
  //*1或者非0值表示退出进程 0表示没有错误，不结束进程
});

// ?全局错误捕捉器
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
});

app.use(bodyParser());
// 路由中间件
app.useRoutes();
// 抛出错误捕获
app.on("error", errorHandle);

module.exports = app;
