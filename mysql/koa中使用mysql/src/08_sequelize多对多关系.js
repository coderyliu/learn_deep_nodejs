const {
  Sequelize,
  Model,
  DataTypes
} = require('sequelize')

// 创建一个sequelize实例
const sequelize = new Sequelize('coderhub', 'root', 'admin', {
  host: 'localhost',
  post: 3306,
  dialect: 'mysql'
})

// 根据Model,去操作某一个表
class Students extends Model {}
Students.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: DataTypes.INTEGER
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'students',
  sequelize
})

class Courses extends Model {}
Courses.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'courses',
  sequelize
})

class StudentCourse extends Model {}
StudentCourse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    field: 'student_id',
    references: {
      model: Students,
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    field: 'course_id',
    references: {
      model: Courses,
      key: 'id'
    }
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'students_select_courses',
  sequelize
})

// 多个表建立联系
Students.belongsToMany(Courses, {
  through: StudentCourse,
  foreignKey: 'studentId',
  otherKey: 'courseId'
})

Courses.belongsToMany(Students, {
  through: StudentCourse,
  foreignKey: 'courseId',
  otherKey: 'studentId'
})

// 进行表增删改查操作
async function productOp() {
  // 1.查询表中的所有的数据
  const result = await Students.findAll({
    include: {
      model: Courses
    }
  })
  console.log(result)
}

productOp()

// 监听数据库连接是否成功
sequelize.authenticate().then(() => {
  console.log('数据库连接成功~')
}).catch(() => {
  console.log('数据库连接失败~')
})