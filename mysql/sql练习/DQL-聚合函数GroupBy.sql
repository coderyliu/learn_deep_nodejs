#1.聚合函数的使用--聚合函数是对一组数据的操作，可以吧一个表中的一行看成一条，整个是十一组
#事实上聚合函数相当于默认将所有的数据分成了一组
#注意：最后拿到的是结果，是最后的结果，而不是查找到的一条一条数据
-- 求所有的手机的价格总和
SELECT SUM(price) FROM `product`;
-- 起别名
SELECT SUM(price) AS totalPrice FROM `product`;
-- 求华为手机的价格总和和平均价格AVG()  SUM()
SELECT SUM(price) AS totalprice FROM `product` WHERE brand='华为';
SELECT AVG(price) FROM `product` WHERE brand='华为';

#最高手机的价格与最低手机的价格 MIN()  MAX()
SELECT MAX(price) FROM `product`;
SELECT MIN(price) FROM 	`product`;

#求华为手机的个数  COUNT()
SELECT COUNT(*) FROM `product` WHERE brand='华为';
SELECT COUNT(*) FROM `product` WHERE brand='苹果';

-- 进行一个去重操作
SELECT COUNT(price) FROM `product` WHERE brand='华为';
SELECT COUNT(DISTINCT price) FROM `product` WHERE brand='华为';

#2.GROUP BY
#GROUP BY通常和聚合函数一起使用
#where语句只能写在select后面，不能写在groupby后面，WHERE语句作用于from这个表，而groupBy的约束having是作用于group By的分组
-- 简单使用
SELECT brand,AVG(price),COUNT(*),AVG(score) FROM `product` GROUP BY brand;

#HAVING约束的使用   是作用于groupby的，在groupby分组查询到结果之后的表做进一步的约束。
SELECT brand,AVG(price) AS avgPrice,COUNT(*),AVG(score) FROM `product` GROUP BY brand HAVING avgPrice>2000;

-- 求评分score>7.5的手机的平均价格是多少？
SELECT AVG(price) FROM `product` WHERE score>7.5;
-- 升级：评分大于7.5的手机，按照品牌进行分类，求出平均价格。
SELECT brand,AVG(price) AS avgPrice FROM `product` WHERE score>7.5 GROUP BY brand;



