const connection = require('../app/database')

class FileModel {
  // ?插入数据
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, userId])

    return result[0]
  }

  // ?选择数据
  async getAvatarById(id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`

    const result = await connection.execute(statement, [id])

    return result[0]
  }

  // ?插入数据
  async createPicture(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, userId, momentId])

    return result[0]
  }

  // ?获取动态配图
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`

    const result = await connection.execute(statement, [filename])

    return result[0]
  }
}

module.exports = new FileModel()