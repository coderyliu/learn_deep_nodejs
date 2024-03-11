// 在Koa2中没有像express一样，给我们内置了router,因为koa2是一个轻量级的框架
// 所以我们要使用router，必须借助一些第三方库来使用，常用的就是koa-router
const Router = require("koa-router");

const router = new Router({
  prefix: "/users",
});

router.get("/", (ctx, next) => {
  ctx.response.body = "users get success~";
});

router.post("/", (ctx, next) => {
  ctx.response.body = "users post success";
});

module.exports = router;
