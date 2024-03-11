const fs = require("fs");

// ?传统的写入文件方式--也是不可控制的
// fs.writeFile('./c.txt', '你好啊', (err => {
//   console.log(err)
// }))

// ?Stream的方式
const writer = fs.createWriteStream("./a.txt", {
  start: 3, //开始写入的位置
  flags: "a", //a代表不是覆盖写入，而是追加到末尾
});

writer.write("你好啊", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("写入成功~");
});

// ?这总方式的写入是不会关闭文件的，要通过方法关闭文件
writer.end("coder");

writer.on("close", () => {
  console.log("文件被关闭");
});
