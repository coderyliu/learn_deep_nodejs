const fs = require('fs')
const filepath = './readme.md'

// ?方式1:同步操作--readFileSync(文件路径,options)
// todo options可以是utf-8,,表示按照字符串的方式读取并输出
// todo 如果是binary表示按照二进制的方式读取输出
// todo 如果不指定，按照buffer的形式读取输出
const info = fs.readFileSync(filepath, 'utf-8')
// const info = fs.readFileSync(filepath,'binary')
// const info = fs.readFileSync(filepath)
console.log(info)
// console.log('后续要执行的代码')

// ?方式二:异步读取,readFile(文件路径，options,回调函数)
// fs.readFile(filepath, 'utf-8', (err, info) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(info)
// })
// console.log('后续要执行的代码')