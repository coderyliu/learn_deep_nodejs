const message = 'hello'

// 创建buffer
// 0-15 0-15
// 0~f 0~f
// 00~ff

//?1.创建方式1 不推荐(过期)
// const buffer = new Buffer(message)
// console.log(buffer)

// ?2.创建方式2 
const buffer = Buffer.from(message)
console.log(buffer)