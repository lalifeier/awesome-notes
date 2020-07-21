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

::: warning
User can only log in via localhost
:::

```shell
vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.2/ebin/rabbit.app
#修改loopback_users，删除<<"guest">>
{loopback_users, []},
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

#### 运行 RabbitMq

```shell
mkdir -p /home/docker/rabbitmq
cd /home/docker/rabbitmq

docker run -d --restart=always --hostname rabbitmq -p 5672:5672 -p 15672:15672 -v $PWD:/var/lib/rabbitmq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin --name rabbitmq rabbitmq:management

#mkdir -p /home/docker/rabbitmq/{conf,log,data}
#cd /home/docker/rabbitmq
#docker run -d --restart=always --hostname rabbitmq -p 5672:5672 -p 15672:15672 -v $PWD/conf:/etc/rabbitmq/rabbitmq.conf -v $PWD/log:/var/log/rabbitmq -v $PWD/data:/var/lib/rabbitmq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin --name rabbitmq rabbitmq:management
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

## 高级特性

### 消息如何保障 100% 的投递成功

#### 什么是生产端的可靠性投递

- 保障消息的成功发出
- 保障 MQ 节点的成功接收
- 发送端收到 MQ 节点(Broker)确认应答
- 完善的消息进行补偿机制

#### 生产端-可靠性投递

BAT/TMD 互联网大厂的解决方案：

- 消息落库，对消息状态进行打标
- 消息的延迟投递，做二次确定，回调检查

### 幂等性

#### 消费端-幂等性保障

在海量订单产生的业余高峰期，如何避免消息的重复消费问题？

- 消费端实现幂等性，就意味着，我们的消息永远不会消费多次，即使我们收到了多条一样的消息

业界主流的幂等性操作：

- 唯一 ID + 指纹码机制，利用数据库主键去重
  - SELECT COUNT(1) FROM T_ORFER WHERE ID = 唯一 ID + 指纹码
  - 好处：实现简单
  - 坏处：高并发下有数据库写入的性能瓶颈
  - 解决方案：根据 ID 进行分库分表进行算法路由
- 利用 Redis 的原子性去实现
  - 我们是否要进行数据落库，如果落库的话，关键解决问题是数据库和缓存如何做到原子性
    - 如果不进行落库，那么都存储到缓存中，如何设置定时同步的策略

### Confirm 确认消息

消息的确认，是指生产者投递消息后，如果 Broker 收到消息，则会给我们生产者一个应答

生产者进行应答，用来确定这条消息是否正常的发送到 Broker，这种方式也是消息的可靠性投递的核心保障

#### 如何实现 Confirm 确认消息

- 在 channel 上开启确认模式：channel.confirmSelect()
- 在 channel 上添加监听：addConfirmListener，监听成功和失败的返回结果，根据具体的结果对消息进行重新发送，或记录日志等后续处理

### Return 消息机制

- Return Listener 用于处理一些不可路由的消息
- 我们的消息生产者，通过指定一个 Exchange 和 Routingkey，把消息送达到某一个队列中去，然后我们的消费者监听队列，进行消费处理操作
- 但是在某些情况下，如果我们在发送消息的时候，当前的 exchange 不存在或者指定的路由 key 路由不到，这个时候如果我们需要监听这种不可达的消息，就要使用 Return Listener

在基础 API 中有一个关键的配置项

- Mandatory：如果为 true，则监听器会接收到路由不可达的消息，然后进行后续处理，如果为 false，那么 broker 端自动删除该消息

### 自定义消费者

```java
public class MyConsumer extends DefaultConsumer {

    public MyConsumer(Channel channel) {
        super(channel);
    }

    @Override
    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
    }
}
```

### 消费端限流

RabbitMQ 提供了一种 qos(服务质量保证)功能，即在非在自动确认消息的前提下，如果一定数目的消息(通过基于 consume 或者 channel 设置 Qos 的值)未被确认前，不进行消费新的消息

```java
void BasicQos(uint prefetchSize, ushort prefetchCount, bool global);
```

- prefetchSize：0
- prefetchCount：会告诉 RabbitMQ 不要同时给一个消费者推送对于个消息，即一旦有 N 个消息还没有 ack，则该 consumer 将 block 掉，直到有消息 ack
- global：true/false 是否将上面设置应用于 channel，简单点说，就是上面限制是 channel 级别的还是 consumer 级别
- prefetchSize 和 global 这两项，RabbitMQ 没有实现，暂且不研究 prefetch_count 在 no_ack=false 的情况下生效，即在自动应答的情况下这两个值是不生效的

### 消费端 ACK 与重回队列

#### 消费端 的手工 ACK 和 NACK

- 消费端进行消费的时候，如果由于业务异常我们可以进行日志的记录，然后进行补偿
- 如果由于服务器宕机等严重问题，那我们就需要手工进行 ACK 保障消费端消费成功

#### 消费端的重回队列

- 消费端重回队列是为了对没有处理成功的消息，把消息重新会递给 Broker
- 一般我们在实际应用中，都会关闭重回队列，也就是设置为 False

### TTL 队列/消息

- TTL 是 Time to Live 的缩写，也就是生存时间
- RabbitMQ 支持消息的过期时间，在消息发送时可以进行指定
- RabbitMQ 支持队列的过期时间，从消息入队列开始计算，只要超过了队列的超时时间配置，那么消息会自动的清除

### 死信队列

#### 死信队列：DLX，Dead-Letter-Exchange

利用 DLX，当消息在一个队列中变成死信(dead message)之后，他能被重新 publish 到另一个 Exchange，这个 Exchange 就是 DLX

#### 消息变成死信几种情况

- 消息被拒绝(basic.reject/basic.nack)并且 requeue=false
- 消息 TTL 过期
- 队列达到最大长度

#### 死信队列

- DLX 也是一个正常的 Exchange，和一般的 Exchange 没有区别，他能在任何的队列上被指定，实际上就是设置某个队列的属性
- 当这个队列中有死信时，RabbitMQ 就会自动的将这个消息重新发布到设置的 Exchange 上去，进而被路由到另一个队列
- 可以监听这个队列中消息做相应的处理，这个特性可以弥补 RabbitMQ3.0 以前支持的 immediate 参数的功能

#### 死信队列设置

首先要设置死信队列的 exchange 和 queue, 然后进行绑定

1. Exchange : dlx.exchange

2. Queue : dlx.queue

3. RoutingKey : #

然后正常声明交换机, 队列, 绑定, 只不过需要在队列加上一个扩展参数即可 : `arguments.put("x-dead-letter-exchange", "dlx.exchange");`

这样消息在过期，requeue，队列在达到最大长度时，消息就可以直接路由到死信队列

#### 死信队列解决的问题

1. 列信息因消费不及时大量积压，消费方服务先处理不及时会影响到队列的生产者，进而会影响到所有消费此 topic 的队列

2. 队列的消息超时后消失，生产者和消费者完全无感知，只能靠查落地存储的历史记录，很不方便同时业务无法再消费处理

## 集群架构模式

### 主备模式

- 实现 RabbitMQ 的高可用集群，一般在并发和数据量不高的情况下，这种模型非常的好用且简单。主备模式也称之为 Warren 模式

- 主备模式：一种 warren(兔子窝)的模式，是一个主/备方案(主节点如果挂了，从节点提供服务而已，activemq 利用 zookeeper 做主/备一样)

#### HaProxy 配置

```
listen  rabbitmq_cluster
bind 0.0.0.0:5672
#配置TCP模式
mode tcp
#简单的轮询
balance roundrobin
#主节点
server rabbitmq_1 172.18.0.2:5672 check inter 5000 rise 2 fall 2
#备用节点
server rabbitmq_2 172.18.0.3:5672 backup check inter 5000 rise 2 fall 2

#inter每隔5秒对RabbitMQ集群做健康检查，2次正确证明服务器可用，3次失败证明服务器不可用，并且配置主备机制
```

### 远程模式

- 远程模式可以实现双活的一种模式，简称 Shovel 模式，所谓 Shovel 就是我们可以把消息进行不同数据中心的复制工作，我们可以跨地域的让两个 RabbitMQ 集群互联

- 远程模式：远程通信和复制，所谓 Shovel 就是我们可以把消息进行不同数据中心的复制工作，我们可以跨地域的让两个 RabbitMQ 集群互联

#### Shovel 集群的配置

```
#启动RabbitMQ插件
rabbitmq-plugins enable amqp_client
rabbitmq-plugins enable rabbitmq_shovel
#创建rabbitmq.config文件
touch /etc/rabbitmq/rabbitmq.config
#最后我们需要源服务器和目的地服务器都使用相同的配置文件(rabbitmq.config)
```

### 镜像模式

- 集群模式非常经典的就是 Mirror 镜像，保证 100%数据不丢失，在实际工作中也是用的最多的。并且实现集群非常简单，一般互联网大厂都会构建这种镜像集群模式

- Mirror 镜像队列，目的是为了保证 RabbitMQ 数据的高可靠性解决方案，主要就是实现数据的同步，一般来讲是 2-3 个节点实现数据同步(对于 100%数据可靠性解决方案一般是 3 节点)

### 多活模式

- 这种模式也是实现异地数据复制的主流模式，因为 Shovel 模式配置比较复制，所以一般来说实现异地集群都是使用这种双活或者多活模型来实现的。这种模型依赖 RabbitMQ 的 federation 插件，可以实现持续的可靠的 AMQP 数据通信，多活模式在实际配置与应用非常简单

- RabbitMQ 部署架构采用双中心模式（多中心）在两套（或多套）数据中心各部署一套 RabbitMQ 集群，各中心的 RabbitMQ 服务需要为提供正常的消息业务外，中心之间还需要实现部分队列消息共享。

- federation 插件是一个不需要构建 Cluster，而在 Brokers 之间传输消息的高性能插件，federation 可以在 brokers 或者 cluster 之间传输消息，连接的双方可以使用不同的 users 或者 virtual host 双方也可以使用不同版本的 erlang 或者 RabbitMQ 版本。federation 插件可以使用 AMQP 协议作为通讯协议，可以接受不连续的传输。

- Federation Exchanges，可以看成 Downstream 从 Upstream 主动拉取消息，但并不是拉取所有消息，必须是在 Downstream.上已经明确定义 Bindings 关系的 Exchange,也就是有实际的物理 Queue 来接收消息，才会从 Upstream 拉取消息到 Downstream。使用 AMQP 协议实施代理间通信，Downstream 会将绑定关系组合在一起， 绑定/解除绑定命令将发送到 Upstream 交换机。因此，FederationExchange 只接收具有订阅的消息.

### 集群配置文件

#### 关键参数配置

参考：[http://www.rabbitmq.com/configure.html](http://www.rabbitmq.com/configure.html)

- tcp_listerners 设置 rabbimq 的监听端口，默认为[5672]
- disk_free_limit 磁盘低水位线，若磁盘容量低于指定值则停止接收数据，默认值为{mem_relative, 1.0},即与内存相关联 1：1，也可定制为多少 byte
- vm_memory_high_watermark，设置内存低水位线，若低于该水位线，则开启流控机制，默认值是 0.4，即内存总量的 40%
- hipe_compile 将部分 rabbimq 代码用 High Performance Erlang compiler 编译，可提升性能，该参数是实验性，若出现 erlang vm segfaults，应关掉
- force_fine_statistics， 该参数属于 rabbimq_management，若为 true 则进行精细化的统计，但会影响性能

#### 集群节点模式

- Disk 为磁盘存储模式
- Ram 为内存存储模式

### 延迟队列插件

1. 下载插件放到指定目录

[https://www.rabbitmq.com/community-plugins.html](https://www.rabbitmq.com/community-plugins.html)

```shell
cd /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.2/plugins
wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.8.0/rabbitmq_delayed_message_exchange-3.8.0.ez
```

2. 启动插件

```shell
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

3. 访问地址http://IP:15672/#/exchanges
