const program = require('commander')

const helpOptions = () => {
  // 增加一些自己的options
  program.option('-w -why', 'a vue init cli')
  program.option('-d -dest <dest>', 'a destination folder,例如: -d src/component')
  program.option('-f -framework <framework>', 'your framework')

  program.on('--help', () => {
    console.log("")
    console.log("Others: other options~")
    // console.log("Others:")
  })
}

module.exports = helpOptions