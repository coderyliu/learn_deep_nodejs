// ?axios库可以在浏览器中使用， 也可以在Node中使用：
// ?在浏览器中， axios使用的是封装xhr；
// ?在Node中， 使用的是http内置模块

const http = require("http");

// todo1.http发送get请求
// http.get('http://localhost:3000', (res) => {
//   res.on('data', (data) => {
//     console.log(data.toString());
//   });

//   res.on('end', () => {
//     console.log("获取到了所有的结果");
//   })
// })

// todo2.http发送posy请求
const req = http.request(
  {
    method: "POST",
    hostname: "localhost",
    port: 3000,
  },
  (res) => {
    res.on("data", (data) => {
      console.log(data);
    });

    res.on("end", () => {
      console.log("获取到了所有结果");
    });
  }
);

req.end();
