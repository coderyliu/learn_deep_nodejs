const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

// 将根目录下的.env里面的变量注入环境变量
dotenv.config()

// 读取本地目录下生成的非对称密钥
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, './keys/privat.key'))
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, './keys/public.key'))

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVATE_KEY,
  PUBLIC_KEY
}