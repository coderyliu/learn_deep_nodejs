const http = require('http')

// 创建一个web服务器
const server = http.createServer()

server.on('request', (req, res) => {
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('3000端口启动完毕!')
})