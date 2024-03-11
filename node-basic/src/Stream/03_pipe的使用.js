const fs = require("fs");

// ?传统的读写方式--也是不灵活的，很麻烦
// fs.readFile('./a.txt', (err, data) => {
//   if (err) console.log(err)
//   fs.writeFile('d.txt', data, (err) => {
//     console.log(err)
//   })
// })

// ?Stream的写法
const reader = fs.createReadStream("./a.txt");
const writer = fs.createWriteStream("./e.txt");

reader.pipe(writer);
