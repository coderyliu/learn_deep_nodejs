#查看所有的数据库
SHOW DATABASES;

#查看当前正在使用的数据库
SELECT DATABASE();

#切换数据库
USE coderhub;

#创建数据库
#方式1：直接创建
CREATE DATABASE huya;

#方式2:为了以防万一抛出错误，严格创建
CREATE DATABASE IF NOT EXISTS huya;

#方式3：在创建数据库的同时，设置数据库编码方式
#这里注意：数据库的默认编码方式是utf8mb4,不同于utf8的是有些数据不能通过utf8编码存入，比如(emoji表情)，但是utf8mb4是可以的
CREATE DATABASE IF NOT EXISTS huya DEFAULT CHARACTER SET utf8mb4
																		COLLATE utf8mb4_0900_ai_ci;
																		
#删除数据库--严格点，不然会报错
DROP DATABASE IF EXISTS huya;

#修改数据库的编码
ALTER DATABASE huya CHARACTER SET = utf8;

																		
																		
																		
																		