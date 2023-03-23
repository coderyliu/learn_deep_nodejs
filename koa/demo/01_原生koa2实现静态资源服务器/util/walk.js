const fs = require('fs')
const mimes = require('./mimes')

/**
 * 遍历读取目录内容
 * @param {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */

function walk(reqPath) {
  let files = fs.readdirSync(reqPath)

  // dir目录  file文件
  let dirList = [],
    fileList = []
  for (let i = 0; i < files.length; i++) {
    let item = files[i]
    let itemArr = item.split('\.')
    let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : "undefined"

    if (typeof mimes[itemMime] === 'undefined') {
      dirList.push(files[i])
    } else {
      fileList.push(files[i])
    }
  }

  let result = dirList.concat(fileList)

  return result
}

module.exports = walk