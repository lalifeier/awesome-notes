---
sidebar: auto
---

## 介绍
#### RabbitMQ

## 环境安装
### 安装
- 安装ErLang
```shell
wget https://github.com/rabbitmq/erlang-rpm/releases/download/v22.2.4/erlang-22.2.4-1.el7.x86_64.rpm
rpm -ivh erlang-22.2.4-1.el7.x86_64.rpm
``` 
- 安装socat
```shell
yum install socat
```
- 安装RabbitMQ
```shell
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2-1.el7.noarch.rpm
rpm -ivh rabbitmq-server-3.8.2-1.el7.noarch.rpm
```
- 启动RabbitMQ
```shell
systemctl start rabbitmq-server             # 启动RabbitMQ
systemctl enable rabbitmq-server            # 开机自启动RabbitMQ
systemctl status rabbitmq-server            # 查看状态

# 其他启动方式
rabbitmq-server                             # 启动 RabbitMQ服务
rabbitmqctl stop                            # 停止RabbitMQ服务
rabbitmqctl start_app                       # 启动application
rabbitmqctl stop_app                        # 停止application
rabbitmq-server -detached                   # 后台启动 RabbitMQ服务
```
- 安装web管理页面插件(默认用户名密码guest)
```shell
rabbitmq-plugins enable rabbitmq_management
```
### RabbitMQ配置
- 添加用户并授权
```shell
#添加用户
rabbitmqctl add_user admin 123456

#设置用户角色
rabbitmqctl set_user_tags admin administrator

#tag（administrator，monitoring，policymaker，management）

#设置用户权限(接受来自所有Host的所有操作)
rabbitmqctl  set_permissions -p "/" admin '.*' '.*' '.*'  

#查看用户权限
rabbitmqctl list_user_permissions admin
```
- 删除用户
```shell
rabbitmqctl delete_user 用户名
```
- 修改密码
```shell
rabbitmqctl add_user 用户名 密码
```
- 查看当前用户列表
```
rabbitmqctl list_users
```
- 配置用户远程访问
```shell
#修改配置文件
vim /etc/rabbitmq/rabbitmq.config 

#保存以下内容
[
{rabbit, [{tcp_listeners, [5672]}, {loopback_users, ["admin"]}]}
].
```
- 开放端口
```shell
#开放端口
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --add-port=15672/tcp --permanent

#重新加载防火墙配置
firewall-cmd --reload
```