const mysql = require("mysql2");

// 1.创建数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "admin",
});

// 2.执行sql语句
const statement = `
  SELECT * FROM PRODUCT WHERE PRICE > ? AND SCORE > ?;
`;

connection.query(statement, [6000, 7], (err, results, fields) => {
  console.log(results);
});
