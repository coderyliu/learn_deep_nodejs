const Koa = require('koa')
const fs = require('fs')

const app = new Koa()

/**
 * 用promise封装异步读取文件方法
 * @param {string} page html文件名称
 * @param {promise}
 */

function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `../views/${page}`
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据url获取html内容
 * @param {string} url koa2上下文的url,ctx.url
 * @return {string} html文件内容
 */

async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    default:
      break
  }
  let html = await render(view)
  return html
}

app.use(async (ctx) => {
  let url = ctx.request.url
  let html = await route(url)

  ctx.body = html
})

app.listen(3000, () => {
  console.log('3000端口服务启动成功!')
})