const connection = require('../app/database')

class MomentModel {
  // ?用户发表动态插入数据
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`

    // 执行sql语句
    const result = await connection.execute(statement, [content, userId])

    return result[0]
  }

  // ?用户获取某一条动态内容
  async detail(momentId) {
    const statement = `SELECT m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'author',u.name) author FROM moment m
    LEFT JOIN user u ON m.user_id=u.id
    WHERE m.id= ? ;`

    // 执行sql语句
    const result = await connection.execute(statement, [momentId])

    return result[0]
  }

  // ?用户获取多条动态内容
  async list(offset, limit) {
    const statement = `SELECT m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'author',u.name) author FROM moment m
    LEFT JOIN user u ON m.user_id=u.id
    LIMIT ? OFFSET ?;`

    // 执行sql语句
    const result = await connection.execute(statement, [limit, offset])

    return result[0]
  }

  // ?修改某一条动态
  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`

    const result = await connection.execute(statement, [content, momentId])

    return result[0]
  }

  // ?删除某一条动态
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const result = await connection.execute(statement, [momentId])

    return result[0]
  }
}

module.exports = new MomentModel()