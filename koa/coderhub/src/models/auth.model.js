const connection = require('../app/database')

class AuthModel {
  // 检查是否具有某一项权限
  async checkPermission(userId, momentId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?; `

    const result = await connection.execute(statement, [momentId, userId])

    return result[0].length === 0 ? false : true
  }
  async checkCommentPermission(userId, commentId) {
    const statement = `SELECT * FROM comment WHERE id = ? AND user_id = ?; `

    const result = await connection.execute(statement, [commentId, userId])

    return result[0].length === 0 ? false : true
  }
}

module.exports = new AuthModel()