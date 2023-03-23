#查看所有表
SHOW TABLES;

#创建数据表普通方式
-- 这种方式不严谨，之后都要通过SQL语句对数据库操作，如果表已经存在会抛出异常
CREATE TABLE `student` (
						`name` VARCHAR(20),
						`age` INT,
						`height` FLOAT);
												
#严谨一点和创建数据库方式一样，判断一下
#并且 每个表都应该有一个主键--primary key(默认就是不为空的)，可以设置为递增的，代表这个表中的唯一索引
CREATE TABLE IF NOT EXISTS `teacher` (
															`name` VARCHAR(20) NOT NULL,
															`age` INT,
															`telphone` VARCHAR(20) UNIQUE NOT NULL,
															`birthday` TIMESTAMP,
															`id` INT PRIMARY KEY AUTO_INCREMENT);
															
#SQL中的数据类型
-- 数型--整数(INT,SMALLINT,BIGINT)、浮点数(FLOAT,DOUBLE)
-- 日期时间--date(YEAR(只能为YYYY),DATE(只能为YYYY-MM-DD),datetime(为yyyy-mm-dd hh:mm:ss),timestamp(同上，不过是有限制的))

#删除表
DROP TABLE IF EXISTS `student`; 

#查看当前表的结构
DESC `teacher`;

#修改表的名字
ALTER TABLE `teacher` RENAME TO `teachers`;

#添加新的一列
ALTER TABLE `teachers` ADD `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

#修改字段名称
ALTER TABLE `teachers` CHANGE `telphone` `phoneNumber` VARCHAR(20);

#修改字段类型
ALTER TABLE `teachers` MODIFY `name` VARCHAR(30);

#删除某个字段
ALTER TABLE `teachers` DROP `age`;

#根据一个表区创建另外一个表--创建的新表结构和原来的表一样，但是不会把值复制过去，主键属性也会复制
CREATE TABLE `user2` LIKE `user`;
