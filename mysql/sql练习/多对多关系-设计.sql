#1.基本数据模拟
CREATE TABLE IF NOT EXISTS `students` (
						`id` INT PRIMARY KEY AUTO_INCREMENT,
						`name` VARCHAR(20) NOT NULL,
						`age` INT);

CREATE TABLE IF NOT EXISTS `courses` (
						`id` INT PRIMARY KEY AUTO_INCREMENT,
						`name` VARCHAR(20) NOT NULL,
						`price` DOUBLE);

INSERT INTO `students` VALUES (1,'coder',20);
INSERT INTO `students` VALUES (2,'kobe',40);
INSERT INTO `students` VALUES (3,'curry',34);
INSERT INTO `students` VALUES (4,'lilei',21);
INSERT INTO `students` VALUES (5,'tom',20);

INSERT INTO `courses` VALUES (1,'英语',100);
INSERT INTO `courses` VALUES (2,'语文',666);
INSERT INTO `courses` VALUES (3,'数学',888);
INSERT INTO `courses` VALUES (4,'历史',80);
INSERT INTO `courses` VALUES (5,'物理',888);
INSERT INTO `courses` VALUES (6,'地理',333);

#3.建立关系表
CREATE TABLE `students_select_courses` (
				`id` INT PRIMARY KEY AUTO_INCREMENT,
				`student_id` INT NOT NULL,
				`course_id` INT NOT NULL,
				FOREIGN KEY(student_id) REFERENCES students(id) ON UPDATE CASCADE,
				FOREIGN KEY(course_id) REFERENCES courses(id) ON UPDATE CASCADE
);

#3.学生选课
-- coder选了英文，数学，历史
INSERT INTO `students_select_courses` VALUES(1,1,1);
INSERT INTO `students_select_courses` VALUES(2,1,3);
INSERT INTO `students_select_courses` VALUES(3,1,4);

INSERT INTO `students_select_courses` VALUES(4,3,2);
INSERT INTO `students_select_courses` VALUES(5,3,1);

INSERT INTO `students_select_courses` VALUES(6,5,2);
INSERT INTO `students_select_courses` VALUES(7,5,3);
INSERT INTO `students_select_courses` VALUES(8,5,4);

#4.查询需求
-- 4.1查询所有有选课的学生，选择了哪些课程
SELECT stu.id id,stu.name `name`,stu.age age,cs.name `cname`
FROM `students` stu 
LEFT JOIN `students_select_courses` ssc ON ssc.student_id=stu.id 
LEFT JOIN `courses` cs ON ssc.course_id=cs.id WHERE ssc.student_id IS NOT NULL AND ssc.course_id IS NOT NULL;

SELECT stu.id id,stu.name `name`,stu.age age,cs.name `cname`
FROM `students` stu 
JOIN `students_select_courses` ssc ON ssc.student_id=stu.id 
JOIN `courses` cs ON ssc.course_id=cs.id;

-- 4.2查询所有的学生的选课情况
SELECT * FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id=ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id=cs.id;

-- 4.3哪些学生是没有课的
SELECT * FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id=ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id=cs.id WHERE ssc.course_id is NULL AND ssc.student_id IS NULL;

-- 4.4查询那些课程是没有被选择的
SELECT * FROM `courses` cs
LEFT JOIN `students_select_courses` ssc ON ssc.course_id=cs.id
WHERE ssc.student_id is NULL;

-- 4.5某一个学生选了那些课程
SELECT * FROM `students` stu
JOIN `students_select_courses` ssc ON ssc.student_id=stu.id
JOIN `courses` cs ON ssc.course_id=cs.id
WHERE stu.id=1;









