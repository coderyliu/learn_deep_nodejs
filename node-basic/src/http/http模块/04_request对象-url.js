const http = require("http");
const url = require("url");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // ?最基本的方式
  // if (req.url === '/login') {
  //   res.end('欢迎回来')
  // } else if (req.url === '/users') {
  //   res.end('用户列表')
  // } else {
  //   res.end('错误请求,检查')
  // }

  // ?如果url当中携带参数
  const { pathname, query } = url.parse(req.url, true);
  if (pathname === "/login") {
    console.log(query);
    // console.log(qs.parse(query))
    res.end("请求结果");
  }

  // console.log(obj)
  // res.end('请求结果')
});

server.listen(3000, () => {
  console.log("3000端口启动完毕~");
});
