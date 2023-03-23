const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)

  res.end('hello server')
})

server.listen(3000, () => {
  console.log('3000端口启动成功')
})