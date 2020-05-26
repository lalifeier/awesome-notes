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

### Docker 安装 MySQL

#### 拉取镜像

```shell
#docker pull mysql:latest
docker pull mysql:5.7
```

#### 运行 MySQL

```shell
#mkdir -p /home/docker/mysql
mkdir -p /home/docker/mysql/{conf,logs,data}
cd /home/docker/mysql  /etc/mysql/mysql.conf.d
docker run -d --restart=always -p 3306:3306 --name mysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7

#/home/docker/mysql/conf/my.cnf
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

```
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

```
SELECT ……  FROM ……  LIMIT 1000, 20;
```

```
SELECT ……  FROM ……  WHERE  id>=1000  AND  id<= 1020;
```

核心业务表的数据不建议做物理删除，只做状态变更。比如订单作废、账号禁用、优惠券作废等等。既不删除数据，又能缩小数据表体积，可以把记录转移到历史表。

逻辑删除就是在数据表添加一个字段（is_deleted），用字段值标记该数据已经逻辑删除，查询的时候跳过这些数据

### 海量记录快速分页

利用主键索引来加速分页查询

```
SELECT * FROM t_test WHERE id>=5000000 LIMIT 100;
SELECT * FROM t_test WHERE id>=5000000 AND id<=5000000+100;
```

如果用物理删除，主键不连续，就不能用主键索引来加速分页，所以只能使用折中的方案

```
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

### 如何实现商品秒杀

#### 怎么预防数据库超售？

- 设置数据库事务的隔离级别 Serializable
- 在数据表上设置乐观锁字段

#### 什么表需要设置乐观锁？

- 出现同时修改同一条记录的业务，相应的数据表要设置乐观锁 如：库存表
- 不会出现同时修改同一条记录的业务，就不需要设置乐观锁 如：用户表 商品表 订单表 地址表

#### Redis 避免超售现象

- Redis 的单线程是非阻塞执行的，并发修改数据容易产生超售的结果
- Redis 引入了事务机制（批处理），一次性把多条命令传递给 Redis 执行，这就避免了其他客户端中间插队，出现超售的现象

如何保证事务的一致性？

- 为了保证事务的一致性，在开启事务之前必须要用 WATCH 命令监听要操作的记录

如何开启事务?

- 利用 MULTI 命令可以开启一个事务
- 开启事务后所有操作都不会立即执行，只有执行 EXEC 命令的时候才会批处理执行

### 为什么要放弃存储过程、触发器和自定义函数？

因为在数据库集群的场景里，由于存储过程、触发器和自定义函数都是在本地数据库节点上运行，它们与数据库集群业务产生了冲突，所以为了顾全大局，放弃使用数据库本地编程，甚至连数据库本地生成主键的机制也都放弃了。

#### 什么是存储过程？

存储过程是一个编译后的 SQL 脚本集合，可以单独调用，但是不能用在 SQL 语句中

#### 存储过程的优点

- 存储过程是编译过的 SQL 脚本，所以执行的速度非常快
- 实现了 SQL 编程，可以降低锁表的时间和锁表的范围
- 对外封装了表结构，提升了数据库的安全性

### 如何避免偷换交易中的商品信息？

B2B 电商平台，通常采用保存历次商品修改信息、降低搜索排名

B2C 电商平台，只需要保存历次商品修改信息即可

### 如何抵御 XSS 攻击？

XSS 攻击，是通过在网页上嵌入恶意的 JavaScript 代码，然后当浏览器渲染 DOM 组件的时候，这段恶意的脚本就执行了，然后盗取个人账号信息。

第一种，大家都已经知道了，那就是在网页里面植入恶意代码即可。植入过的过程就是你到网站上发帖与回帖。别人看到这个网页，他的账号就被你窃取到了。为什么说 XSS 攻击跟数据库有关系呢？毕竟发帖回帖的内容，是保存到数据库上的。如果我们对保存到 MySQL 的数据，先做一下转义，那么将来输出到页面上，那么浏览器就不会当它是标签了，因此也就不会执行恶意代码。

第二种 XSS 攻击的常用方式，就是发送 HTML 格式的邮件。因为邮件本身就是一个 HTML 页面，所以往里面挂恶意代码非常容易。当用户在浏览器上登陆网易邮箱，然后点开这个邮件，那么恶意脚本就开始执行，马上就窃取到你的账户信息。抵御这种 XSS 攻击，就只能靠电子信箱的运营商，加强邮件内容的过滤，筛选出恶意的脚本。

### 数据库缓存（查询缓存）、程序缓存应该选择哪个？

MySQL 的查询缓存结构的是 KV 的，数据库会把执行过的 SELECT 结果集缓存到内存里面，KEY 是 SQL 语句，VALUE 是结果集。

查询缓存最大的缺点就是，只要用户对数据表修改一条记录，就会让这个数据表的缓存大面积的失效，这就造成的 IO 压力突然增大，所以最好的办法就是不使用查询缓存，而改用数据缓存，数据缓存是把 InnoDB 数据表和索引中的一部分记录缓存到内存中。用户更新数据的时候，更新了数据表多少条记录，响应个缓存就更改多少条，并不会出现缓存大面积失效的情况。

数据库的查询缓存因为不可以细颗粒度的设置哪张数据表结果集被缓存，但是程序查询缓存可以详细设置哪一条的 SQL 的结果集被缓存。所以我们可以避开内容经常变化的数据表，对哪些数据不经常变化的数据表设置查询缓存。

SpringCache 技术是 Java 领域里面比较成熟的缓存方案，使用注解就能管理缓存。结合 Redis，可以充分发挥查询缓存的优势。

### 智能拆分订单

#### 高德地图

#### 参考: [https://lbs.amap.com/dev/id/choose](https://lbs.amap.com/dev/id/choose)

#### 利用 MYSQL 计算两点之间距离

- st_distance 函数可以计算两个坐标之间相差的度数

st_distance 计算的结果单位是度，需要乘 111195（地球半径 6371000\*PI/180）是将值转化为米。

```shell
# 结果 1119.125229711175千米
select  st_distance (
  point(116.414042, 39.92556),
  point(121.486864, 31.232965)
) * 111195 / 1000;
```

### 中文分词技术

- 创建全文索引
- 执行全文索引查询

#### 参考: [https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)

#### 使用专业的全文检索引擎

- Lucene 是 Apache 基金会的开源全文检索引擎，支持中文分词

- Lucene 自带的中文分词插件功能较弱，需要引入第三方中文分词插件，对中文内容准确分词

#### 参考: [http://hanlp.com](http://hanlp.com)

## 数据库性能优化进阶

### MySQL 压力测试

压力测试是针对系统的一种性能测试，但是测试数据与业务逻辑无关，更加简单直接的测试读写性能。

压力测试有 4 个重要测试指标：TPS、QPS、响应时间和并发量

- QPS 是每秒钟处理完的请求数量
- TPS 是每秒钟处理完的事物数量
- 响应时间是一次请求的平均处理时间
- 并发量是系统能同时处理的请求数量

安装 sysbench 工具

```shell
curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | sudo bash
```

```shell
yum install sysbench
```

创建测试数据库 sbtest

准备测试数据

```shell
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-host=192.168.153.130 --mysql-port=3306 --mysql-user=root --mysql-password=123456 --mysql-db=sbtest --oltp-tables-count=10 --oltp-table-size=100000 prepare
```

执行测试

```shell
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-host=192.168.153.130 --mysql-port=3306 --mysql-user=root  --mysql-password=123456 --mysql-db=sbtest --oltp-test-mode=complex --threads=10 --time=300 --report-interval=10 run >> /home/mysysbench.log
```

清除数据

```shell
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-host=192.168.153.130 --mysql-port=3306 --mysql-user=root  --mysql-password=123456 --mysql-db=sbtest  --oltp-tables-count=10 --oltp-table-size=100000 cleanup
```

#### 参考: [https://github.com/akopytov/sysbench](https://github.com/akopytov/sysbench)

### SQL 语句优化

- 不要把 SELECT 子句写成 SELECT\*

```
SELECT * FROM t_emp;
```

- 谨慎使用模糊查询

```
SELECT ename FROM t_emp WHERE ename LIKE '%S%'; #不使用索引
SELECT ename FROM t_emp WHERE ename LIKE 'S%';
```

- 对 ORDER BY 排序的字段设置索引

- 少用 IS NULL

```
SELECT ename FROM t_emp WHERE comm IS NULL; #不使用索引
SELECT ename FROM t_emp WHERE comm =-1;
```

- 尽量少用 != 运算符

```
SELECT ename FROM t_emp WHERE deptno!=20; #不使用索引
SELECT ename FROM t_emp WHERE deptno<20 AND deptno>20;
```

- 尽量少用 OR 运算符

```
SELECT ename FROM t_emp WHERE deptno=20 OR deptno=30; #不使用索引
SELECT ename FROM t_emp WHERE deptno=20
UNION ALL
SELECT ename FROM t_emp WHERE deptno=30;
```

- 尽量少用 IN 和 NOT IN 运算符

```
SELECT ename FROM t_emp WHERE deptno IN (20,30); #不使用索引
SELECT ename FROM t_emp WHERE deptno=20
UNION ALL
SELECT ename FROM t_emp WHERE deptno=30;
```

- 避免条件语句中的数据类型转换

```
SELECT ename FROM t_emp WHERE deptno='20';
```

- 在表达式左侧使用运算符和函数都会让索引失效

```
SELECT ename FROM t_emp WHERE salary*12>=100000; #不使用索引
SELECT ename FROM t_emp WHERE salary>=100000/12;
SELECT ename FROM t_emp WHERE year(hiredate)>=2000; #不使用索引
SELECT ename FROM t_emp
WHERE hiredate>='2000-01-01 00:00:00';
```

### MySQL 参数优化

- 最大连接数
  - max_connections 是 MySQL 最大并发连接数，默认值 151
  - MySQL 允许的最大连接数上限是 16384
  - 实际连接数是最大连接数的 85%较为合适
  ```shell
  SHOW VARIABLES LIKE 'max_connections'
  SHOW STATUS LIKE 'max_used_connections'
  vim /etc/my.cnf
  ```
  ```ini
  #消耗约800M内存
  max_connections=300
  ```
- 请求堆栈的大小
  - back_log 是存放执行请求的堆栈大小，默认值是 50
  - 一般堆栈大小设置成最大连接数的 1/3
  ```ini
  back_log=90
  ```
- 修改并发线程数
  - innodb_thread_concurrency 代表并发线程数，默认是 0
  - 并发线程数应该设置为 CPU 核心数的两倍
  ```ini
  innodb_thread_concurrency=2
  ```
- 修改连接超时时间
  - wait-timeout 是超时时间，单位是秒
  - 连接默认超时为 8 小时，连接长期不用又不销毁，浪费资源
  ```ini
  #10分钟超时
  wait-timeout=600
  ```
- 数据缓存
  - innodb_buffer_pool_size 是 InnoDB 的缓存容量，默认是 128M
  - InnoDB 缓存的大小可以设置为主机内存的 70%~80%
  ```ini
  innodb_buffer_pool_size = 400M
  ```

### 慢查询日志

慢查询日志会把查询耗时超过规定时间的 SQL 语句记录下来，利用慢查询日志，定位分析性能的瓶颈。

```shell
  SHOW VARIABLES LIKE '%slow_query%'
  vim /etc/my.cnf
```

slow_query_log 可以设置慢查询日志的开闭状态

long_query_time 可以规定查询超时的时间，单位是秒

```ini
slow_query_log=ON
long_query_time=1
```

## 数据库集群

### 数据库集群能解决什么问题？

如果在低并发的情况下，单节点 MySQL 的读写速度更快。因为在数据库集群中，多个 MySQL 节点的数据要通过网络同步，所以读写速度不如单节点 MySQL。

但是在高并发的情况下，大量的读写请求会让单节点 MySQL 的硬盘无法承受，所以速度会变得很慢。比如说 12306 最开始上线的时候，大量用户涌入网站购票，结果系统就崩溃了。

高并发恰恰是数据库集群的主场。大量的读写请求会被分散发往多个节点执行。众人拾柴火焰高，多个 MySQL 执行读写请求，肯定比单节点 MySQL 快，所以在高负载的情况下，单节点 MySQL 接近崩溃，反而数据库集群的读写速度更快。

### 常用数据库集群方案

- 常用的 MYSQL 集群方案有 PXC 和 Replication
- 两种集群方案有各自的特点，PXC 集群适合保存少量高价值数据，Replication 集群适合保存大量数据

### 数据同步带来的问题

- 无论在哪个节点写入数据，最终所有节点的数据都是相同的
- 为了实现数据分片的效果，我们必须新组建一个 PXC 集群

### 垂直切分与水平切分

#### 什么是切分？

- 出于降低数据库负载和缩表的目的，通常我们要对单节点的 MYSQL 数据库做切分

- 对数据库切分的方案：垂直切分、水平切分

#### 垂直切分

垂直切分是按照业务对数据表分类，然后把一个数据库拆分成多个独立的数据库

- 垂直切分可以把数据库的并发压力，分散到不同的数据库节点，但是垂直切分并不能减少单表的数据量。
- 不能跨 MySQL 节点做表连接查询，只能通过接口方式解决
- 跨 MySQL 节点的事务，需要用分布式事务机制来实现

#### 水平切分

水平切分是按照某个字段的某种规则，把数据切分到多张数据表

- 水平切分可以把数据切分到多张数据表，可以起到缩表的作用
- 只有数据量很大的表，才需要使用水平切分
- 不同数据表的切分规则并不一致，要根据实际业务来确定
- 集群扩容较为麻烦，需要迁移大量的数据

#### 使用切分的注意事项

添加新的分片，硬件成本和时间成本很大，所以要慎重。可以对分片数据做冷热数据分离，把冷数据移出分片来缩表。
在项目逐步迭代升级的过程中，先是从单节点演化为水平切分的

### 数据库中间件

- 数据库中间件保存了水平切分的规则，直接可以切分和整合数据

#### 什么是读写分离？

- 数据库中间件把读写任务分别发送给不同节点执行，可以降低单一节点的负载

- PXC 集群不需要设置读写分离，做负载均衡即可

- Replication 集群主从节点功能明确，需要做读写分离

#### 读写分离的方案

- Replication 镜像不能陪在双向主从同步，所以只能使用一写三读

#### 虚拟逻辑库和关系表

- 因为 MyCat 并不存储数据，所以必须要配置可以使用的虚拟逻辑库和关系表

#### MyCat 实现垂直切分

- 垂直切分就是把数据表切分成独立的逻辑库

#### MyCat 实现水平切分

- MyCat 具有很多水平切分算法，用户可以随意定制切分规则

|  分片算法  |          适用场合          |      案例       |
| :--------: | :------------------------: | :-------------: |
|  主键求模  | 初始数据很多，但是增幅较慢 |    地图数据     |
|   枚举值   |        绝大多数场合        | 58 同城、饿了么 |
|  日期分片  |      按照日期查找数据      |    日志数据     |
| 自然月分片 |      按照日期查找数据      |    财务数据     |
| 冷数据分片 |        冷热数据分离        |    订单数据     |

#### 全局表

- 数据字典或者数据量不是很大的业务表，都可以定义成全局表
- 全局表的数据在每个分片中都是相同的

#### 配置全局表

- 配置全局表就是给虚拟表设置 type 等于 global

#### 全局表的 SQL 路由

- 查询语句，MyCat 会随机路由给一个分片执行
- INSERT、DELETE、UPDATE 语句会路由给每个分片去执行

#### 水平切分规则

- 主键求模切分

  - 主键求模切分可以把数据均由的切分到分片中

  - 这种切分规则适合初始数据量很大，但是数据增幅不大的场合

  - 数据不分类直接存储，以后维护的成本比较高，例如增添新分片

- 枚举值切分

  - 枚举值切分是根据固定字段的枚举值来切分数据。枚举值要提前规定好，必须是整数类型

  枚举值文件

  - 枚举值文件的序号从 0 开始，0 代表第一个分片，然后以此类推

#### 跨分片的表连接：父子表

- 跨分片的表连接需要在网络中传输大量的数据，所以查询语句，MyCat 不支持跨分片表连接

#### 父子表机制

- 两张表都是用了水平切分的数据表，要实现表连接查询，需要定义父子表关系

- 父表数据切分到什么分片，子表的数据会切分到同样的分片

#### 配置父子表

- 父表可以有切分规则，但是子表不能配置切分规则

#### 全局主键

- 使用数据库本地的主键自增长，会产生重复主键的记录

- 在数据库集群环境中，应该使用中间件来生成主键值

- MyCat 支持多种主键生成方式，其中最好的是 Zoopkeeper 方式
