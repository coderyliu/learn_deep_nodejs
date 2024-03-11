const connection = require("../app/database");

class UserService {
  // 注册用户
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`;

    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }

  // 查询数据中user表中是否有name=? 的用户
  async getUserName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);

    return result[0];
  }

  // 更新用户头像
  async updateAvatarById(userId, avatarUrl) {
    const statement = `UPDATE user SET avatarUrl = ? WHERE id = ?;`;

    const result = await connection.execute(statement, [avatarUrl, userId]);

    return result[0];
  }
}

module.exports = new UserService();
