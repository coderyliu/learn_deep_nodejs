const fs = require("fs");
const path = require("path");
// node智能提示引入插件
// const types = require('@types/node')

// 1.创建文件夹
const dirname = path.join(__dirname, "dir");
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  });
}

// 2.读取文件夹下的所有文件--同步读取
fs.readdir(path.join(__dirname), (er, files) => {
  // ? files数组   返回一个数组
  console.log(files);
  for (let file of files) {
    console.log(file);
    console.log(typeof file);
  }
});

// 3.重命名
fs.rename(path.join(__dirname), "kobe", (err) => {
  console.log(err);
});
