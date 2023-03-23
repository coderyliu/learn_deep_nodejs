#1.创建brand的表和插入数据
CREATE TABLE IF NOT EXISTS `brand` (
				`id` INT PRIMARY KEY AUTO_INCREMENT,
				`name` VARCHAR(20) NOT NULL,
				`website` VARCHAR(100) NOT NULL,
				`phoneRank` INT
);

INSERT INTO `brand` VALUES (1,'华为','http://www.huawei.com',2);
INSERT INTO `brand` VALUES (2,'苹果','http://www.apple.com',1);
INSERT INTO `brand` VALUES (3,'小米','http://www.mi.com',6);
INSERT INTO `brand` VALUES (4,'oppo','http://www.oppo.com',12);
INSERT INTO `brand` VALUES (5,'京东','http://www.jd.com',15);
INSERT INTO `brand` VALUES (6,'geogle','http://www.geogle.com',3);

#2.通过外键将两种表联系起来
ALTER TABLE `product` ADD `brand_id` INT;

#修改brand_id为外键
ALTER TABLE `product` ADD FOREIGN KEY(brand_id) REFERENCES brand(id);

#添加为外键之后，多个表之间就可以相互查询
#如果将某个表的选项和另一个表的外键相关联，则这个选项的值只能为外键值得范围
-- 具体解释如下示例
-- 下面的brand_Id的值的范围只能为1-6
UPDATE `product` SET brand_id=1 WHERE brand='华为';
UPDATE `product` SET brand_id=2 WHERE brand='苹果';
UPDATE `product` SET brand_id=3 WHERE brand='小米';
UPDATE `product` SET brand_id=4 WHERE brand='oppo';

#3.如果要修改和删除外键的引用id呢
-- 三部曲
-- 3.1.看一下创建外键所在表的创建语句,获取到外键的名称
SHOW CREATE TABLE `product`;

-- 如下所示
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(20) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `score` decimal(2,1) DEFAULT NULL,
  `voteCnt` int DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 3.2删除外键名称
ALTER TABLE `product` DROP FOREIGN KEY product_ibfk_1;

-- 3.3重新添加外键约束
ALTER TABLE `product` ADD FOREIGN KEY(brand_id) REFERENCES brand(id)
																								ON UPDATE CASCADE ON DELETE RESTRICT;

