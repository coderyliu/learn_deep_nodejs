const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {

  // ?响应结果的方式有两种
  // todo write这种方式是直接写出数据不会关闭流
  // ?如果我们没有调用 end和close，客户端将会一直等待结果：
  // res.write("响应结果一");
  // todo end这种方式是直接写出最后数据，会关闭流
  res.end("Hello World");
});

// 启动服务器,并且制定端口号和主机
server.listen(3000, () => {
  console.log("服务器启动成功~");
});