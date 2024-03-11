const Koa = require("koa");
const staticAssets = require("koa-static");

const app = new Koa();

// koa和express一样，也需要插件部署静态资源，koa-static
app.use(staticAssets("./assets"));

app.listen(3000, () => {
  console.log("3000 端口启动完毕!");
});
