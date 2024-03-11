const fs = require("fs");
const path = require("path");

// ?1.writeFile()--异步
// fs.writeFile(path.join(__dirname, "readme.md"), "嘻嘻嘻", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });
// console.log("后续要执行的操作");

// ?2.writeFileSync()--同步
const info = fs.writeFileSync(path.join(__dirname, "readme.md"), "哈哈哈");
console.log(info);
console.log("后续要执行的操作");
