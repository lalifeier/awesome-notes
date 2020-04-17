---
sidebar: auto
---

## 介绍

#### MySQL

## 环境安装

### 安装

- 移除默认安装 mariadb 数据库

```shell
yum remove mariadb-libs.x86_64
```

- 下载 Mysql 源

```shell
#Mysql5.7
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
#Mysql8.0
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
```

#### 参考: [https://dev.mysql.com/downloads/repo/yum](https://dev.mysql.com/downloads/repo/yum)

- 安装源

```shell
yum localinstall mysql57-community-release-el7-11.noarch.rpm
```

- 安装 mysql 服务

```shell
yum install mysql-community-server
```

- 启动

```shell
systemctl start mysqld
```

- 重启

```shell
systemctl restart mysqld
```

- 停止

```shell
systemctl stop mysqld
```

### 修改默认默认密码

```shell
cat /var/log/mysqld.log | grep "password"
```

- 连接 mysql

```shell
mysql -uroot -p
```

- 修改密码

```shell
#Mysql5.7
SET password = password('123456');
#Mysql8.0
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

- 刷新权限

```shell
FLUSH PRIVILEGES;
```

::: warning
出现报错 ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
:::

```shell
SHOW VARIABLES LIKE 'validate_password%';
#Mysql5.7
SET GLOBAL validate_password_policy=0;
SET GLOBAL validate_password_length=1;
#Mysql8.0
SET GLOBAL validate_password.policy=0;
SET GLOBAL validate_password.length=1;
```

### 远程连接

```shell
show databases;
use mysql;
update user set Host = '%' where Host = "localhost" and User = "root";
FLUSH PRIVILEGES;
#开启3306端口
firewall-cmd --permanent --zone=public --add-port=3306/tcp
firewall-cmd --reload
```

::: warning
数据库客户端工具如 Navicat 无法连接 Mysql8.0
:::

```shell
#方法一：修改用户密码和加密方式
use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
#方法二：修改my.ini,将默认密码规则设置为mysql_native_password，刷新权限并重置root密码
vim /etc/my.cnf
[mysqld]
default_authentication_plugin=mysql_native_password
#方法三：安装支持caching_sha2_password密码加密规则的新版本数据库客户端工具
```

- MySQL8 以前版本使用的密码加密规则是 mysql_native_password
- MySQL8 使用的密码加密规则是 caching_sha2_password

#### 参考: [https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password)

::: warning
出现报错 Public Key Retrieval is not allowed
:::

- 连接后面添加 allowPublicKeyRetrieval=true

#### 参考: [https://mysqlconnector.net/connection-options](https://mysqlconnector.net/connection-options)

### 开启 Genelog

```shell
#设置general_log_file路径
set global general_log_file="/tmp/general.log";
#开启general_log
set global general_log=on;
```

### 新建用户和权限操作

```shell
#新建用户
create user 'jiegeng'@'%' identified by '123456';
#赋予权限
grant all privileges on *.* to 'jiegeng'@'%' identified by '123456' with grant option;
#收回权限
revoke all privileges on *.* from jiegeng;
#刷新权限
FLUSH PRIVILEGES;
```

### 忘记 root 密码怎么办

```shell
#编辑my.cnf，增加如下
vim /etc/my.cnf

skip-grant-tables

#进入mysql
mysql -uroot -p
#修改密码
use mysql;
update user set authentication_string = password("123456") where user = "root";
flush privileges;
#取消无密码登录
vim /etc/my.cnf
#skip-grant-tables
```

## 使用

### INSERT

- INSERT IGNORE 如果使用 IGNORE 修饰符，则执行 INSERT 语句时发生的错误将被忽略。

#### 参考: [https://dev.mysql.com/doc/refman/8.0/en/insert.html](https://dev.mysql.com/doc/refman/8.0/en/insert.html)

- INSERT ... ON DUPLICATE KEY UPDATE Statement 检查插入的数据是否违反 PRIMARY KEY 或 UNIQUE 索引 约束，违反则更新数据，否则插入数据。

#### 参考: [https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html](https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html)

```shell
INSERT INTO t1 (a,b,c) VALUES (1,2,3),(4,5,6)
ON DUPLICATE KEY UPDATE c=VALUES(a)+VALUES(b);
```

### SELECT

- Encryption and Compression Functions

#### 参考: [https://dev.mysql.com/doc/refman/8.0/en/encryption-functions.html#function_aes-decrypt](https://dev.mysql.com/doc/refman/8.0/en/encryption-functions.html#function_aes-decrypt)

## 企业级解决方案

### 主键用数字还是 UUID？

#### UUID 是通用唯一识别码的缩写，其目的是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。在数据库集群中，为了避免每个 MySQL 各自生成的主键产生重复，所以有人考虑采用 UUID 方式。

#### 使用 UUID 的好处

- 使用 UUID，分布式生成主键，降低了全局节点的压力，使得主键生成速度更快
- 使用 UUID 生成的主键值全局唯一
- 跨服务器合并数据很方便

#### UUID 主键的缺点

- UUID 占用 16 个字节，比 4 字节的 INT 类型和 8 字节的 BIGINT 类型更加占用存储空间
- UUID 是字符串类型，查询速度很慢
- UUID 不是顺序增长，作为主键，数据写入 IO 随机性很大

#### 主键自动增长的优点

- INT 和 BIGINT 类型占用存储空间较小
- MySQL 检索数字类型速度远快过字符串
- 主键值是自动增长的，所以 IO 写入连续性较好

::: warning
无论什么场合，都不推荐使用 UUID 作为数据表的主键，而是要利用数据库中间件来生成全局主键
:::

### 在线修改表结构

#### 在业务系统运行的过程中随意删改字段，会造成重大事故。常规的做法是业务停机，维护表结构，但是不影响正常业务的表结构是允许在线修改的。

#### ALTER TABLE 修改表结构的弊病

- 由于修改表结构是表级锁，因此在修改表结构时，影响表写入操作
- 如果修改表结构失败，必须还原表结构，所以耗时更长
- 大数据表记录多，修改表结构锁表时间很久

#### 使用 Percona-Toolkit 工具

#### pt-online-schema-change 是 percona 公司开发的一个工具，在 percona-toolkit 包里面可以找到这个功能，它可以在线修改表结构

#### 原理:

- 首先它会新建一张一模一样的表，表名一般是\_new 后缀
- 然后在这个新表执行更改字段操作
- 然后在原表上加三个触发器，DELETE/UPDATE/INSERT，将原表中要执行的语句也在新表中执行
- 最后将原表的数据拷贝到新表中，然后替换掉原表

#### 安装 Percona-Toolkit

- yum 软件包管理器安装

```shell
# 安装源
yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
# 安装 toolkit
yum install percona-toolkit
```

#### 参考:

[https://www.percona.com/doc/percona-repo-config/percona-release.html](https://www.percona.com/doc/percona-repo-config/percona-release.html)

[https://www.percona.com/doc/percona-toolkit/3.0/installation.html](https://www.percona.com/doc/percona-toolkit/3.0/installation.html)

- 源码安装

```shell
# 安装第三方依赖包
yum install perl-DBI
yum install perl-DBD-mysql
yum install perl-IO-Socket-SSL
yum install perl-Digest-MD5
yum install perl-TermReadKey
# 下载安装percona-toolkit
wget https://www.percona.com/downloads/percona-toolkit/3.0.13/binary/redhat/7/x86_64/percona-toolkit-debuginfo-3.0.13-1.el7.x86_64.rpm
wget https://www.percona.com/downloads/percona-toolkit/3.0.13/binary/redhat/7/x86_64/percona-toolkit-3.0.13-1.el7.x86_64.rpm
rpm -ivh *.rpm
```

#### 参考: [https://www.percona.com/downloads/percona-toolkit/LATEST](https://www.percona.com/downloads/percona-toolkit/LATEST)

#### 基本使用

```mysql
# 添加表字段
pt-online-schema-change --host=your_host --port=your_port --user=root --password=your_password --alter "add column age int(11) default null" D=your_database,t=your_table --charset=utf8 --execute --print --statistics --no-check-alter
# 删除表字段
pt-online-schema-change --host=your_host --port=your_port --user=root --password=your_password --alter "drop column age" D=your_database,t=your_table --charset=utf8 --execute --print --statistics --no-check-alter
# 修改表字段
pt-online-schema-change --host=your_host --port=your_port --user=root --password=your_password --alter "MODIFY COLUMN num int(11) unsigned NOT NULL DEFAULT '0'" D=your_database,t=your_table --charset=utf8 --execute --print --statistics --no-check-alter
# 修改表字段名
pt-online-schema-change --host=your_host --port=your_port --user=root --password=your_password --alter "CHANGE COLUMN age address varchar(30)" D=your_database,t=your_table --charset=utf8 --execute --print --statistics --no-check-alter
# 添加索引
pt-online-schema-change --host=your_host --port=your_port --user=root --password=your_password --alter "add idx_address(address)" D=your_database,t=your_table --charset=utf8 --execute --print --statistics --no-check-alter
```

::: warning
可以添加 --no-drop-old-table 来保留原表不被删除(会被重命名)
:::

### 订单号和流水号的关系

- 订单号既是订单的唯一编号，而且经常被用来检索，所以应当是数字类型的主键
- 流水号是打印在购物单据上的字符串，便于阅读，但是不用做查询

### 逻辑删除还是物理删除？

物理删除就是用 DELETE、TRUNCATE、DROP 语句删除数据。物理删除是把数据从硬盘中删除，可以释放存储空间，缩小数据表的体积，对性能提升有帮助

物理删除会造成主键的不连续，导致分页查询变慢

```mysql
SELECT ……  FROM ……  LIMIT 1000, 20;
```

```mysql
SELECT ……  FROM ……  WHERE  id>=1000  AND  id<= 1020;
```

核心业务表的数据不建议做物理删除，只做状态变更。比如订单作废、账号禁用、优惠券作废等等。既不删除数据，又能缩小数据表体积，可以把记录转移到历史表。

逻辑删除就是在数据表添加一个字段（is_deleted），用字段值标记该数据已经逻辑删除，查询的时候跳过这些数据

### 海量记录快速分页

利用主键索引来加速分页查询

```mysql
SELECT * FROM t_test WHERE id>=5000000 LIMIT 100;
SELECT * FROM t_test WHERE id>=5000000 AND id<=5000000+100;
```

如果用物理删除，主键不连续，就不能用主键索引来加速分页，所以只能使用折中的方案

```mysql
SELECT t.id, t.name FROM t_test t JOIN ( SELECT id FROM t_test LIMIT 5000000, 100) tmp ON t.id = tmp.id;
```

### 读多写少和写多读少

- 读多写少的解决方案

可以把 MySQL 组建集群，并且设置上读写分离

- 写多读少的解决方案

如果是低价值的数据，可以采用 NoSQL 数据库来存储这些数据

如果是高价值的数据，可以用 TokuDB 来保存

### 乐观锁

在并发环境下，如果多个客户端访问同一条数据，此时就会产生数据不一致的问题，如何解决，通过加锁的机制，常见的有两种锁，乐观锁和悲观锁，可以在一定程度上解决并发访问。

乐观锁，顾名思义，对加锁持有一种乐观的态度，即先进行业务操作，不到最后一步不进行加锁，"乐观"的认为加锁一定会成功的，在最后一步更新数据的时候在进行加锁，乐观锁的实现方式一般为每一条数据加一个版本号，更新数据的时候，比较版本号，系统就知道有没有出现数据的并发更新。如果小于等于当前版本号的更新，都会被放弃。
