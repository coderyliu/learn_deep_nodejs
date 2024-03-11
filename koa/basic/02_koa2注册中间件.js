const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  // ?必须自己判断请求的路径和方法
  // ?所以这种直接使用app对象定义中间件，创建路由方式写起来很麻烦，我们可以使用koa提供的路由就很方便
  if (ctx.request.url === "/login") {
    if (ctx.request.method === "GET") {
      console.log("欢迎来到koa2");
      ctx.response.body = "login success";
    }
  } else {
    ctx.response.body = "success fail";
  }
});

app.listen(3000, () => {
  console.log("3000 端口启动完毕!");
});
