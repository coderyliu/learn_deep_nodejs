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
class Brand extends Model {}
Brand.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: DataTypes.STRING,
  phoneRank: DataTypes.STRING
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'brand',
  sequelize
})

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
  score: DataTypes.DOUBLE,
  brandId: {
    field: 'brand_id',
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id'
    }
  }
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'product',
  sequelize
})

// 两个表建立联系
Product.belongsTo(Brand, {
  foreignKey: 'brandId'
})

// 进行表增删改查操作
async function productOp() {
  // 1.查询表中的所有的数据
  const result = await Product.findAll({
    include: {
      model: Brand
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