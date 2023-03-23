const fs = require('fs')

/**
 *读取文件方法
 *@param {string} 文件本地绝对路径
 *@return {string|binary}
 */

function file(filePath) {
  // ?输出的就是文本形式的字符串
  let content = fs.readFileSync(filePath, 'binary')

  return content
}
// file('../static/js/index.js')

module.exports = file