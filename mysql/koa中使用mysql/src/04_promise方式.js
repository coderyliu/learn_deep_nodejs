const mysql = require("mysql2");

// 1.创建一个连接池
const connections = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "coderhub",
  password: "admin",
  connectionLimit: 10,
});

// 2.使用连接池
const statement = `
  SELECT * FROM PRODUCT WHERE PRICE > ? AND SCORE > ?;
`;

connections
  .promise()
  .execute(statement, [6000, 7])
  .then(([result, fields]) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
