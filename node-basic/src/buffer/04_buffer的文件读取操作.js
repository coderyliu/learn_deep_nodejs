const fs = require('fs')
// const sharp = require('sharp')

// 读取文本文件
// todo 读取文本文件还是太简单了，图片，音频，视频的处理都是很麻烦的
fs.readFile('./foo.txt', {
  encoding: 'utf-8'
}, (err, data) => {
  console.log(data)
})

// 读取图片文件
// todo 读取图片文件我们读取到的就是buffer数组
// todo 有了buffer数组之后，对buffer数组处理，进行剪辑等处理
fs.readFile('./foo.png', (err, data) => {
  console.log(data)

  fs.writeFile('./bar.png', data, (err) => console.log(err))
})

// ?sharp库的使用
// sharp('./foo.png')
//   .resize(200, 200)
//   .toFile('./baz.png')