#有了外键之后就可以进行多个表之间的查询了，那么怎么查询流程
#1.获取到的是笛卡尔乘积
SELECT * FROM `product`,`brand`;

#2.左连接
-- 2.1查询所有的手机(包括没有品牌的手机)以及对应的品牌
SELECT * FROM `product` LEFT JOIN `brand` ON product.brand_id=brand.id;

-- 2.2查询没有对应品牌数据的手机
-- 没有的条件不推荐用外键的选项
SELECT * FROM `product` LEFT JOIN `brand` ON product.brand_id=brand.id WHERE brand.id IS NULL;

#3.右链接
-- 3.1查询所有的品牌(没有对应的手机数据，品牌也显示)以及对应的手机数据
SELECT * FROM `product` RIGHT JOIN `brand` ON brand.id=product.brand_id;

-- 3.2查询没有对应手机的品牌信息
SELECT * FROM `product` RIGHT JOIN `brand` ON brand.id=product.brand_id WHERE product.id IS NULL;

#4.内连接
SELECT * FROM `product` INNER JOIN `brand` ON product.brand_id=brand.id;
SELECT * FROM `product` JOIN `brand` ON product.brand_id=brand.id;

#5.全连接
# mysql是不支持FULL OUTER JOIN
SELECT * FROM `products` FULL OUTER JOIN `brand` ON products.brand_id = brand.id;

-- 采用左连接+右连接
(SELECT * FROM `product` LEFT JOIN `brand` ON product.brand_id=brand.id)
UNION
(SELECT * FROM `product` RIGHT JOIN `brand` ON product.brand_id=brand.id);

(SELECT * FROM `product` LEFT JOIN `brand` ON product.brand_id=brand.id WHERE brand.id IS NULL)
UNION
(SELECT * FROM `product` RIGHT JOIN `brand` ON product.brand_id=brand.id WHERE product.brand_id IS NULL);
















