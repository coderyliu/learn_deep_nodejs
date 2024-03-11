const Koa = require("koa");

// ?和express一样，Koa也不能对body中的请求体的内容直接进行解析，也需要借助第三方库，比如：koa-bodyparser
const bodyparser = require("koa-bodyparser");
const app = new Koa();

// 可以让我们的koa解析body中的参数，包括json格式和form-urlencoded格式，解析为对象
// ?不适用于解析大文件上传form-data格式，还需要借助另外的第三方库koa-multer
app.use(bodyparser());

app.use((ctx, next) => {
  console.log(ctx.request.body);

  ctx.response.body = "hello koa2";
});

app.listen(3001, () => {
  console.log("3001端口启动完毕");
});
