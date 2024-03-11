const http = require("http");

// 创建一个web服务器
const server = http.createServer((req, res) => {
  // todo1.设置状态码
  // 方式一: 直接给属性赋值
  // res.statusCode = 400;
  // 方式二: 和Head一起设置
  res.writeHead(503);

  // todo2.设置响应的header
  // 设置方式一:
  // res.setHeader("Content-Type", "text/plain;charset=utf8");
  // 方式二
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf8",
  });

  // 响应结果
  res.write("响应结果一");
  res.end("Hello World");
});

// 启动服务器,并且制定端口号和主机
server.listen(3000, () => {
  console.log("服务器启动成功~");
});
