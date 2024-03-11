const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  const isLogin = false;
  // 发出错误的方式,通过ctx.app.emit('error')事件,结合app.on('error)做一个监听
  if (!isLogin) {
    console.log(ctx);
    ctx.app.emit("error", new Error("哈哈哈"), ctx);
  }
});

// 抛出错误
app.on("error", (err, ctx) => {
  console.log(err.message);
  ctx.body = "哈哈哈";
});

app.listen(3000, () => {
  console.log("3000 端口启动完毕!");
});
