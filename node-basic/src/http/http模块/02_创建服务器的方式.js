const http = require('http')

// 创建server的两种方式
// ?1.直接通过http.createServer()创建，返回一个server对象
// ?这种其实底层也是通过new Http.Server()实现的
const server1 = http.createServer()

console.log(server1)
// 监听
server1.on('request', (req, res) => {
  res.end('hello http')
})

// ?2.通过new http.Server
const server2 = new http.Server((req, res) => {
  res.end('hello server2')
})


server2.listen(3000, () => {
  console.log('3000端口启动完毕~')
})