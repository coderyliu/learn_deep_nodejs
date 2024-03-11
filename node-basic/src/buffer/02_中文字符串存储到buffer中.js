const message = "你好啊";

// todo 1.编解码相同
// ? 对中文进行编码 默认都是utf-8格式 一个中文字符对应3个字节
// ? 而utf-8中一个英文字符对应1个字节
const buffer = Buffer.from(message);
console.log(buffer);

// ?解码的时候默认也是utf-8格式
console.log(buffer.toString());

// todo 2.编解码不同，就会出现乱码
const buffer2 = Buffer.from(message, "utf16le");
console.log(buffer2);

// ?解码
console.log(buffer2.toString());
