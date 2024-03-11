const Koa = require("koa");

const UserRouter = require("./router/user.js");

const app = new Koa();

// userRouter里面的routes方法，把我们的路由注册为中间件
app.use(UserRouter.routes());
// 告诉用户那些请求方法是不能被使用的，有一个提示信息
app.use(UserRouter.allowedMethods());

app.listen(3000, () => {
  console.log("3000端口启动成功");
});
