const {
  Sequelize
} = require('sequelize')

const sequelize = new Sequelize('coderhub', 'root', 'admin', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
})

sequelize.authenticate().then(() => {
  console.log('连接数据库成功~')
}).catch(() => {
  console.log('连接数据库失败~')
})