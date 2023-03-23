// ?通过alloc的方式创建Buffer
// todo 通过alloc的方式可以预先指定一下buffer的内存大小
const buffer = Buffer.alloc(8)
console.log(buffer)

// ?也可以之后做一些其它的操作
// todo buffer就是一个数组，里面的每一位都是一个字节 1byte=8kit  1kb=1024byte 1mb=1024kb
// todo buffer每一位都是用16进制表示的，会先通过编码为2进制，再转为16进制
buffer[0] = 88
buffer[1] = 0x88
console.log(buffer)