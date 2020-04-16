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

- 下载 Mysql 源 https://dev.mysql.com/downloads/repo/yum/

```shell
#Mysql5.7
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
#Mysql8.0
wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
```

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
- 参考 https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-caching-sha2-password

::: warning
出现报错 Public Key Retrieval is not allowed
:::

- 连接后面添加 allowPublicKeyRetrieval=true
- 参考 https://mysqlconnector.net/connection-options/

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
