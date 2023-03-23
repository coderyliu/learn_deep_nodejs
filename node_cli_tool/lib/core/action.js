const {
  promisify
} = require('util')
const open = require('open')

const download = promisify(require('download-git-repo'))

const {
  vueRepo
} = require('../config/repo-config')
// const {
//   commandSpawn
// } = require('../utils/teminal')

const createProjectAction = async (project) => {
  console.log('vueInit tools helps you create your project~')

  // 1.clone项目
  await download(vueRepo, project, {
    clone: true
  })

  // 2. 执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {
    cwd: `./${project}`
  })

  // 3. 执行npm run serve
  commandSpawn(command, ['run', 'serve'], {
    cwd: `./${project}`
  })

  // 4. 打开浏览器
  open('http://localhost:8888')
}

module.exports = {
  createProjectAction
}