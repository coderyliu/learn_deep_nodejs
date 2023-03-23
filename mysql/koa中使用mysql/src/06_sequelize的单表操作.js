const {
  Sequelize,
  Model,
  DataTypes,
  Op
} = require('sequelize')

// 创建一个sequelize实例
const sequelize = new Sequelize('coderhub', 'root', 'admin', {
  host: 'localhost',
  post: 3306,
  dialect: 'mysql'
})

// 根据Model,去操作某一个表
class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'product',
  sequelize
})

// 进行表增删改查操作
async function productOp() {
  // 1.查询表中的所有的数据
  // const result = await Product.findAll({
  //   where: {
  //     price: {
  //       [Op.gte]: 5000
  //     }
  //   }
  // })
  // console.log(result)

  // 2.添加操作
  // const result = await Product.create({
  //   title: '三星Nova',
  //   price: 8888,
  //   score: 5.5
  // })
  // console.log(result)

  // 3.更新操作
  const result = await Product.update({
    price: 10000,
  }, {
    where: {
      id: 1
    }
  })
}

productOp()

// 监听数据库连接是否成功
sequelize.authenticate().then(() => {
  console.log('数据库连接成功~')
}).catch(() => {
  console.log('数据库连接失败~')
})