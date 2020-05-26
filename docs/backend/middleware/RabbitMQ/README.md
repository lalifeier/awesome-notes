---
sidebar: auto
---

## 介绍

#### RabbitMQ 是一个开源的消息代理和队列服务器，用来通过普通协议在完全不同的应用之间共享数据，RabbitMQ 是使用 Erlang 语言来编写的，并且 RabbitMQ 是基于 AMQP 协议的。

## 环境安装

### Window

- 下载 Erlang https://www.erlang-solutions.com/resources/download.html
- 下载 RabbitMQ https://www.rabbitmq.com/download.html

```shell
# 安装服务
rabbitmq-service.bat install
# 关闭服务
rabbitmq-service.bat stop
# 卸载服务
rabbitmq-service.bat remove
# 激活 rabbitmq_management
rabbitmq-plugins enable rabbitmq_management
```

- 访问 web 管理界面

地址：http://localhost:15672
默认用户名：guest （只能 localhost 登陆）
默认密码：guest

### Centos

参考：[https://www.rabbitmq.com/which-erlang.html](https://www.rabbitmq.com/which-erlang.html)

- 安装 ErLang

```shell
wget https://github.com/rabbitmq/erlang-rpm/releases/download/v22.2.4/erlang-22.2.4-1.el7.x86_64.rpm
rpm -ivh erlang-22.2.4-1.el7.x86_64.rpm
```

- 安装 socat

```shell
wget http://repo.iotti.biz/CentOS/7/x86_64/socat-1.7.3.2-5.el7.lux.x86_64.rpm
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm

yum install socat
```

- 安装 RabbitMQ

```shell
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2-1.el7.noarch.rpm
rpm -ivh rabbitmq-server-3.8.2-1.el7.noarch.rpm
```

- 启动 RabbitMQ

```shell
systemctl start rabbitmq-server             # 启动RabbitMQ
systemctl enable rabbitmq-server            # 开机自启动RabbitMQ
systemctl status rabbitmq-server            # 查看状态

# 其他启动方式
rabbitmq-server                             # 启动 RabbitMQ服务
rabbitmq-server -detached                   # 后台启动 RabbitMQ服务
```

- 安装 web 管理页面插件(默认用户名密码 guest)

```shell
rabbitmq-plugins enable rabbitmq_management
```

### RabbitMQ 配置

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

### Docker 安装 RabbitMq

#### 拉取镜像

```shell
docker pull rabbitmq:management
```

#### 运行 MongoDB

```shell
mkdir -p /home/docker/rabbitmq
cd /home/docker/rabbitmq

docker run -d --restart=always --hostname rabbitmq -p 5672:5672 -p 15672:15672 -v $PWD:/var/lib/rabbitmq --name rabbitmq rabbitmq:management
```

## AMQP 核心概念

- Server：又称 Broker,接受客户端的连接，实现 AMQP 实体服务

- Connection：连接，应用程序与 Broker 的网络连接

- Channel：网络信道，几乎所有的操作都在 Channel 中进行，Channel 是进行消息读写的通道。客户端可建立多个 Channel，每个 Channel 代表一个会话任务。

- Message：消息，服务器和应用程序之间传送的数据，由 Properties 和 Body 组成。Properties 可以对消息进行修饰，比如消息的优先级、延迟等高级特性；Body 则就是消息体内容。

- Virtual host：虚拟地址，用于进行逻辑隔离，最上层的消息路由。一个 Virtual host 里面可以有若干个 Exchange 和 Queue，同一个 Virtual host 里面不能有相同名称的 Exchange 和 Queue

- Exchange：交换机，接收消息，根据路由键转发消息到绑定的队列

- Binding：Exchange 和 Queue 之间的虚拟连接，binding 中可以包含 routing key

- Routing key：一个路由规则，虚拟机可用它来确定如何路由一个特定消息

- Queue：也称为 Message Queue，消息队列，保存消息并将它们转发给消费者

## 使用

### 基本操作

```shell
# 关闭应用
rabbitmqctl stop_app
# 启动应用
rabbitmqctl start_app
# 节点状态
rabbitmqctl status
# 添加用户
rabbitmqctl add_user username password
# 列出所有用户
rabbitmqctl list_users
# 删除用户
rabbitmqctl delete_user username
# 清除用户权限
rabbitmqctl clear_permissions -p vhostpath username
# 列出用户权限
rabbitmqctl list_user_permissions username
# 修改密码
rabbitmqctl change_password username newpassword
# 设置用户权限
rabbitmqctl set_permissions -p vhostpath username ".*" ".*" ".*"

# 创建虚拟主机
rabbitmqctl add_vhost vhostpath
# 列出所有虚拟主机
rabbitmqctl list_vhosts
# 列出虚拟主机上所有权限
rabbitmqctl list_permissions -p vhostpath
# 删除虚拟主机
rabbitmqctl delete_vhost vhostpath

# 查看所有队列信息
rabbitmqctl list_queues
# 清除队列里的消息
rabbitmqctl -p vhostpath purge_queue blue
```

### 高级操作

```shell
# 移除所有数据，要在rabbitmqctl stop_app之后使用
rabbitmqctl reset
# 组成集群命令
rabbitmqctl join_cluster <clusternode> [--ram]
# 查看集群状态
rabbitmqctl cluster_status
# 修改集群节点的存储形式
rabbitmqctl change_cluster_node_type disc | ram
# 忘记节点 （摘除节点）
rabbitmqctl forget_cluster_node [--offline]
# 修改节点名称
rabbitmqctl rename_cluster_node oldnode1 newnode1 [oldnode2] [newnode2 ...]
```
