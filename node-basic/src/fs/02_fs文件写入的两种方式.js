const fs = require('fs')

// ?1.writeFile()--异步
// fs.writeFile('./readme.md', '呵呵呵', (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data)
// })
// console.log('后续要执行的操作')

// ?2.writeFileSync()--同步
const info = fs.writeFileSync('./readme.md', '呵呵呵')
console.log(info)
console.log('后续要执行的操作')