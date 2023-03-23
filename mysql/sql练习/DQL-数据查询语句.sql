#删除user2,user表
DROP TABLE IF EXISTS `user2`;

#创建一个product表
CREATE TABLE IF NOT EXISTS `product`(
														`id` INT PRIMARY KEY AUTO_INCREMENT,
														`brand` VARCHAR(20),
														`title` VARCHAR(100) NOT NULL,
														`price` DOUBLE NOT NULL,
														`score` DECIMAL(2,1),
														`voteCnt` INT,
														`url` VARCHAR(100),
														`pid` INT);

#1.基本查询
-- 查询表中所有的字段以及所有的数据
SELECT * FROM `product`;
-- 查询表中指定的字段
SELECT `title`,`brand` FROM `product`;
-- 对某个字段起别名
SELECT `title` AS `name` FROM `product`;

#2.where条件
#2.1条件判断语句
-- 查询价格小于1000的手机
SELECT `title` FROM `product` WHERE price<1000;
-- 价格等于999的手机
SELECT `title` FROM `product` WHERE price=999;
-- 价格不等于999的手机
SELECT * FROM `product` WHERE price!=999;
SELECT * FROM `product` WHERE price<>999;
-- 查询品牌是否为华为的手机
SELECT * FROM `product` WHERE brand='华为';

#2.2逻辑运算语句
-- 查询1000到2000之间的手机
#between ...and 语句
SELECT * FROM `product` WHERE price BETWEEN 1000 AND 2000;
#逻辑运算符AND
SELECT * FROM `product` WHERE price>1000&&price<2000;
SELECT * FROM `product` WHERE price>1000 AND price<2000;

#逻辑运算符OR
SELECT * FROM `product` WHERE price>5000||brand='华为';
SELECT * FROM `product` WHERE price>5000 OR brand='华为';

#in操作符--查看多个结果中的一个
SELECT * FROM `product` WHERE brand in ('华为','小米');

#将某些值设置为null
UPDATE `product` SET url = NULL WHERE id>=85&&id<=88;
#查询某一个值为null,is判断某个值是否是NULL,只能用于NULL,不能用于其他值
#而=判断是否为NULL,是查找找不到的
SELECT * FROM `product` WHERE url IS NULL;
SELECT * FROM `product` WHERE price IS 9599;

#2.3模糊查询使用like关键字，配置两个符号%  _
#%表示匹配任意一个字符     _表示匹配一个字符
-- 匹配以v开头的title
SELECT * FROM `product` WHERE title LIKE 'v%';
-- 匹配带M的title
SELECT * FROM `product` WHERE title LIKE '%M%';
-- 查询带M的title必须是第三个字符
SELECT * FROM `product` WHERE title LIKE '__M%';


#3.对结果进行排序   ORDER BY DESC降序  ASC 升序排列
SELECT * FROM `product` where price>100 ORDER BY price DESC;
SELECT * FROM `product` where price>100 ORDER BY price ASC;
SELECT * FROM `product` WHERE brand IN ('华为', '小米', '苹果') 
												 ORDER BY price ASC, score DESC;

#4.分页查询
#可以使用limit,offset做分页查询  LIMIT count OFFSET count
SELECT * FROM `product` WHERE price>1000 LIMIT 30 OFFSET 0; 
SELECT * FROM `product` WHERE price>1000 LIMIT 30 OFFSET 30; 
SELECT * FROM `product` WHERE price>1000 LIMIT 30 OFFSET 60; 
