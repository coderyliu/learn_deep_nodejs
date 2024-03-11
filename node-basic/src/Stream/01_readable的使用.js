const fs = require("fs");

// ?传统的方式
// todo 这种方式的读取是不灵活的，不能够控制读取的大小，顺序
// todo 如果我们想要控制读取的大小,开始位置等操作可以借助字节流来操作
// fs.readFile('./a.txt', (err, data) => {
//   if (err) console.log(err)
//   console.log(data)
// })

// ?Stream的使用----分为四种：只读，只写，可读可写
// ?所有的流都是继承自EventEmitter
// ?返回给我们一个实例对象，继承自Readable-->Stream
const reader = fs.createReadStream("./a.txt", {
  start: 3, //?从自己个字节开始读取
  end: 6, // ?读取到第几个字节结束
  highWaterMark: 2, //一次读取几个字节
});
// console.log(reader)
// ?通过reader.on('data')监听读取的操作
reader.on("data", (data) => {
  console.log(data);

  // 读取暂停
  reader.pause();

  // 隔一秒之后开始
  setTimeout(() => {
    reader.resume();
  }, 1000);
});

// ?监听打开文件
reader.on("open", () => {
  console.log("文件被打开");
});

// ?监听文件读取结束
reader.on("end", () => {
  console.log("文件读取结束");
});
