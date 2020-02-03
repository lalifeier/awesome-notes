---
sidebar: auto
---

## 介绍
#### MySQL

## 环境安装
### 安装
- 移除默认安装mariadb数据库
```shell
yum remove mariadb-libs.x86_64
```
- 下载Mysql源 https://dev.mysql.com/downloads/repo/yum/
```shell
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```
- 安装源
```shell
yum localinstall mysql57-community-release-el7-11.noarch.rpm
```
- 安装mysql服务
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
- 连接mysql
```shell
mysql -uroot -p
```
- 修改密码
```shell
SET password = password('123456');
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
SET GLOBAL validate_password_policy=0;
SET GLOBAL validate_password_length=1;
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

### 开启Genelog
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

### 忘记root密码怎么办
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
