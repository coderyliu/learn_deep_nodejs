#DML
#对teacher表插入数据
-- 两种方式
-- 方式一，带要插入表中的键名
INSERT INTO `teachers` (`name`,`phoneNumber`,`birthday`,`id`,`createTime`)
							VALUES ('coder','19931077936','2001-04-21','1','2022-05-16');
-- 方式二：不带要插入的表中的健名
-- 主键id一般推荐放在第一列，否则在插入数据的时候就会错误。
INSERT INTO `teachers` VALUES ('kobe','12345678','1983-03-21','2022-05-16');

#给teachers表添加updateTime列
ALTER TABLE `teachers` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

#删除表数据
-- 删除表中所有数据
DELETE FROM `user`;

-- 删除符合条件的数据
DELETE FROM `teachers` WHERE id=2;

#更新数据
-- 更新所有数据
UPDATE `teachers` SET `name` = 'lilei';
-- 更新符合条件的数据
UPDATE `teachers` SET `name` = 'coder' WHERE id=1;
