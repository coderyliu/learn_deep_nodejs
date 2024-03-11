// 在Restful规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：
//  GET：查询数据；
//  POST：新建数据；
//  PATCH：更新数据；
//  DELETE：删除数据；

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  if (pathname === "/login") {
    if (req.method === "POST") {
      req.setEncoding("utf-8");
      // 获取这种body携带的数据， 我们需要通过监听req的 data事件来获取；
      req.on("data", (data) => {
        console.log(data);
      });
      res.end("hello world");
    }
  }
});

server.listen(3000, () => {
  console.log("服务器启动成功~");
});
