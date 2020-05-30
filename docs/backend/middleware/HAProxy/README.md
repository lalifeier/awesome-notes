---
sidebar: auto
---

## 介绍

#### HAProxy

## 环境安装

### yum 安装

```shell
yum install haproxy
#配置 HAProxy
vim /etc/haproxy/haproxy.cfg
#启动 HAProxy
haproxy -f /etc/haproxy/haproxy.cfg

systemctl start haproxy.service
#停止 HAProxy
systemctl stop haproxy.service
```

### 源码安装

1. 下载并解压

```shell
#安装依赖
yum install openssl openssl-devel systemd-devel
#https://www.haproxy.org （国内无法打开）
#http://pkgs.fedoraproject.org/repo/pkgs/haproxy/
wget https://src.fedoraproject.org/repo/pkgs/haproxy/haproxy-2.1.4.tar.gz/sha512/fd029ac1ec877fa89a9410944439b66795b1392b6c8416aaa7978943170530c3826ba50ea706366f3f7785b7cffed58497cb362fc2480dd6920a99af4f920d98/haproxy-2.1.4.tar.gz
tar -zxvf haproxy-2.1.4.tar.gz -C /usr/local
```

2. 编译并安装

```shell
cd /usr/local/haproxy-2.1.4
uname -r
#开启https USE_OPENSSL=1
#开启haproxy进程与CPU核心绑定 USE_CPU_AFFINITY=1
#支持使用 -Ws参数（systemd-aware master-worker 模式）启动Haproxy USE_SYSTEMD=1
make ARCH=x86_64 TARGET=linux-glibc USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_SYSTEMD=1 USE_CPU_AFFINITY=1 PREFIX=/usr/local/haproxy
make install PREFIX=/usr/local/haproxy
cp haproxy /usr/sbin/
```

::: warning
HAProxy2.0 版本后 移除了 TARGET=linux2628

```
Target 'linux2628' was removed from HAProxy 2.0 due to being irrelevant and
often wrong. Please use 'linux-glibc' instead or define your custom target
by checking available options using 'make help TARGET=<your-target>'
```

:::

PREFIX 为指定的安装路径，TARGET 则根据当前操作系统内核版本指定

- linux22 for Linux 2.2
- linux24 for Linux 2.4 and above (default)
- linux24e for Linux 2.4 with support for a working epoll (> 0.21)
- linux26 for Linux 2.6 and above
- linux2628 for Linux 2.6.28, 3.x, and above (enables splice and tproxy)

### 配置

1. 配置用户

```shell
groupadd haproxy
useradd -g haproxy haproxy -s /sbin/nologin
```

2. 配置文件

```shell
mkdir /etc/haproxy
mkdir /etc/haproxy/conf
cat /etc/haproxy/haproxy.cfg


```

3. 注册到系统服务

```shell
vim /usr/lib/systemd/system/haproxy.service

[Unit]
Description=HAProxy Load Balancer
After=syslog.target network.target

[Service]
ExecStartPre=/usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg -f /etc/haproxy/conf -c -q
ExecStart=/usr/sbin/haproxy -Ws -f /etc/haproxy/haproxy.cfg -f /etc/haproxy/conf -p /run/haproxy.pid
ExecReload=/bin/kill -USR2 $MAINPID

[Install]
WantedBy=multi-user.target
```

4. 启动 haproxy 服务

```shell
systemctl daemon-reload
systemctl start haproxy
```

### KeepAlived

1. 下载并解压

```shell
#安装依赖
yum install openssl openssl-devel
#下载
wget https://www.keepalived.org/software/keepalived-2.0.20.tar.gz
tar -zxvf keepalived-2.0.20.tar.gz -C /usr/local/
```

2. 编译并安装

```shell
cd /usr/local/keepalived-2.0.20
./configure --prefix=/usr/local/keepalived
make && make install
cp /usr/local/keepalived/sbin/keepalived /usr/sbin/
```

3. 启动 KeepAlived 服务

```shell
mkdir /etc/keepalived
cp /usr/local/keepalived/etc/keepalived/keepalived.conf /etc/keepalived/
#cp /usr/local/keepalived-2.0.20/keepalived/keepalived.service /usr/lib/systemd/system/

#systemctl daemon-reload
systemctl start keepalived
```

## 概念

### Haproxy

HAProxy 是一款提供高可用性、负载均衡以及基于 TCP (第四层)和 HTTP
(第七层)应用的代理软件,支持虚拟主机，它是免费、快速并且可靠的一种解决
方案。 HAProxy 特别适用于那些负载特大的 web 站点，这些站点通常又需要会
话保持或七层处理。HAProxy 运行在时下的硬件上，完全可以支持数以万计的
并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中
同时可以保护你的 web 服务器不被暴露到网络上

#### HAProxy 借助于 OS 上几种常见的技术来实现性能最大化

- 单进程、事件驱动模型显著降低了.上下文切换的开销及内存占用
- 在任何可用的情况下，单缓冲(single buffering)机制能以不复制任何数据的方式完成读写操作，这会节约大量的 CPU 时钟周期及内存带宽
- 借助于 Linux 2.6 (>= 2.6.27.19). 上的 splice()系统调用，HAProxy 可以实现零复制转发(Zero-copy forwarding),在 Linux 3.5 及以上的 OS 中还可以实现心零复制启动(zero-starting)
- 内存分配器在固定大小的内存池中可实现即时内存分配，这能够显著减少创 建一个会话的时长
- 树型存储:侧重于使用作者多年前开发的弹性二叉树，实现了以 O(log(N))的低开销来保持计时器命令、保持运行队列命令及管理轮询及最少连接队列

### keepAlive

KeepAlived 软件主要是通过 VRRP 协议实现高可用功能的。

VRRP 是 Virtual Router RedundancyProtocol(虚拟路由器冗余协议)的缩写,VRRP 出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行所以，Keepalived 一方面具有配置管理 LVS 的功能，同时还具有对 LVS 下面节点进行健康检查的功能，另一方面也可实现系统网络服务的高可用功能

#### keepAlive 的功能

- 管理 LVS 负载均衡软件
- 实现 LVS 集群节点的健康检查中
- 作为系统网络服务的高可用性(failover)

#### keepAlive 高可用原理

Keepalived 高可用服务对之间的故障切换转移，是通过 VRRP (Virtual RouterRedundancy Protocol ,虚拟路由器冗余协议)来实现的。在 Keepalived 服务正常工作时，主 Master 节点会不断地向备节点发送( 多播的方式)心跳消息，用以告诉备 Backup 节点自己还活看，当主 Master 节点发生故障时，就无法发送心跳消息，备节点也就因此无法继续检测到来自主 Master 节点的心跳了，于是调用自身的接管程序，接管主 Master 节点的 IP 资源及服务。而当主 Master 节点恢复时备 Backup 节点又会释放主节点故障时自身接管的 IP 资源及服务，恢复到原来的备用角色

## 搭建 RabbitMQ 高可用集群

#### 部署情况

在 rabbitmq-node1、 rabbitmq-node2、 rabbitmq-node3 节点[安装 RabbitMQ](/backend/middleware/RabbitMQ/#centos)

修改三个节点（rabbitmq_node1、rabbitmq_node2、rabbitmq_node3）主机名，然后修改 hosts 配置文件

```shell
vim /etc/hosts
192.168.123.36 rabbitmq-node1
192.168.123.162 rabbitmq-node2
192.168.123.104 rabbitmq-node3
```

|    服务器 IP    |        hostname        |      节点说明      | 端口 |                    地址                    |
| :-------------: | :--------------------: | :----------------: | :--: | :----------------------------------------: |
| 192.168.123.36  |     rabbitmq-node1     |  rabbitmq msater   | 5672 |        http://192.168.123.36:15672         |
| 192.168.123.162 |     rabbitmq-node2     |   rabbitmq slave   | 5672 |        http://192.168.123.162:15672        |
| 192.168.123.104 |     rabbitmq-node3     |   rabbitmq slave   | 5672 |        http://192.168.123.104:15672        |
| 192.168.123.11  | haproxy-keeplive-node1 | haproxy + keeplive | 8100 | http://192.168.123.11:8100/rabbitmq-stats  |
| 192.168.123.220 | haproxy-keeplive-node2 | haproxy + keeplive | 8100 | http://192.168.123.220:8100/rabbitmq-stats |

### RabbitMQ 集群搭建

1. 拷贝 cookie

将 rabbitmq-node1 上的 .erlang.cookie 文件拷贝到其他两台主机上。该 cookie 文件相当于密钥令牌，集群中的 RabbitMQ 节点需要通过交换密钥令牌以获得相互认证，因此处于同一集群的所有节点需要具有相同的密钥令牌，否则在搭建过程中会出现 Authentication Fail 错误

```shell
#备份rabbitmq_node2和rabbitmq_node3原有cookie文件
cp /var/lib/rabbitmq/.erlang.cookie /var/lib/rabbitmq/.erlang.cookie.bak
#在复制的时候需要临时修改cookie文件的权限
#chmod 777 /var/lib/rabbitmq/.erlang.cookie
#在rabbitmq_node1上执行
scp /var/lib/rabbitmq/.erlang.cookie 192.168.123.162:/var/lib/rabbitmq/
scp /var/lib/rabbitmq/.erlang.cookie 192.168.123.104:/var/lib/rabbitmq/
#拷贝完毕后再把权限修改回来
#chmod 400 /var/lib/rabbitmq/.erlang.cookie
```

2. 启动服务

同时启动 Erlang 虚拟机和 RabbitMQ 应用服务。`rabbitmqctl start_app` 只会启动 RabbitMQ 应用服务， `rabbitmqctl stop_app` 只会停止 RabbitMQ 应用服务

```shell
rabbitmq-server start -detached
```

3. 集群搭建

RabbitMQ 集群的搭建需要选择其中任意一个节点为基准，将其它节点逐步加入。这里我们以 rabbitmq-node1 为基准节点，将 rabbitmq-node2 和 rabbitmq-node3 加入集群

在 rabbitmq-node2 和 rabbitmq-node3 上执行以下命令

```shell
rabbitmqctl stop_app
rabbitmqctl reset
#默认是磁盘节点，如果是内存节点的话，需要加--ram参数
#rabbitmqctl join_cluster --ram rabbit@node
rabbitmqctl join_cluster rabbit@rabbitmq-node1
rabbitmqctl start_app
```

如果节点以磁盘节点的形式加入，则需要先使用 reset 命令进行重置，然后才能加入现有群集，重置节点会删除该节点上存在的所有的历史资源和数据。采用内存节点的形式加入时可以略过 reset 这一步，因为内存上的数据本身就不是持久化的

4. 集群操作

```shell
#查看集群状态
rabbitmqctl cluster_status
#移除集群节点
rabbitmqctl forget_cluster_node rabbit@rabbitmq-node2
#修改集群名称
rabbitmqctl set_cluster_name rabbitmq_cluster1
#更改节点类型 磁盘节点和内存节点 集群中必须至少有一个磁盘节点，否则队列元数据无法写入到集群中，当磁盘节点宕掉时，集群将无法写入新的队列元数据信息
rabbitmqctl change_cluster_node_type disc | ram
```

### 配置镜像队列

```shell
#在任意一个节点上执行
rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}'
```

我们指定了 ha-mode 的值为 all ，代表消息会被同步到所有节点的相同队列中。这里我们之所以这样配置，因为我们本身只有三个节点，因此复制操作的性能开销比较小。如果你的集群有很多节点，那么此时复制的性能开销就比较大，此时需要选择合适的复制系数。通常可以遵循过半写原则，即对于一个节点数为 n 的集群，只需要同步到 n/2+1 个节点上即可。此时需要同时修改镜像策略为 exactly，并指定复制系数 ha-params
，示例如下：

```shell
rabbitmqctl set_policy ha-two "^" '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```

除此之外，RabbitMQ 还支持使用正则表达式来过滤需要进行镜像操作的队列，示例如下：

```shell
rabbitmqctl set_policy ha-all "^ha\." '{"ha-mode":"all"}'
```

此时只会对 ha 开头的队列进行镜像。更多镜像队列的配置说明，可以参考官方文档[https://www.rabbitmq.com/ha.html](https://www.rabbitmq.com/ha.html)

### HAProxy 环境搭建

在 haproxy-keeplive-node1、haproxy-keeplive-node2 节点[安装 Haproxy](/backend/middleware/HAProxy/#源码安装)

#### 配置

```
vim /etc/haproxy/haproxy.cfg

# 全局配置
global
    # 日志输出配置、所有日志都记录在本机，通过 local0 进行输出
    log 127.0.0.1 local0 info
    # 最大连接数
    maxconn 4096
    # 改变当前的工作目录
    chroot /usr/local/haproxy
    # 以指定的 user 运行 haproxy 进程
    user haproxy
    # 以指定的 group 运行 haproxy 进程
    group haproxy
    # 以守护进行的方式运行
    daemon
    # 当前进程的 pid 文件存放位置
    pidfile /var/run/haproxy.pid

# 默认配置
defaults
    # 应用全局的日志配置
    log global
    # 使用4层代理模式，7层代理模式则为"http"
    mode tcp
    # 日志类别
    option tcplog
    # 不记录健康检查的日志信息
    option dontlognull
    # 3次失败则认为服务不可用
    retries 3
    # 每个进程可用的最大连接数
    maxconn 2000
    # 连接超时
    timeout connect 5s
    # 客户端超时
    timeout client 120s
    # 服务端超时
    timeout server 120s

# 绑定配置
listen rabbitmq_cluster
    bind 0.0.0.0:5672
    # 配置TCP模式
    mode tcp
    # 采用加权轮询的机制进行负载均衡
    balance roundrobin
    # RabbitMQ 集群节点配置
    server rabbitmq-node1 192.168.123.36:5672 check inter 5000 rise 2 fall 2 weight 1
   	server rabbitmq-node2 192.168.123.162:5672 check inter 5000 rise 2 fall 2 weight 1
   	server rabbitmq-node3 192.168.123.104:5672 check inter 5000 rise 2 fall 2 weight 1

# 配置监控页面
listen monitor
    bind :8100
    mode http
    option httplog
    stats enable
    stats uri /rabbitmq-stats
    stats refresh 5s
```

#### 启动服务

```shell
systemctl start haproxy
```

### KeepAlived 环境搭建

#### 在 haproxy-keeplive-node1、haproxy-keeplive-node2 节点[安装 KeepAlived](/backend/middleware/HAProxy/#keepalived)

#### 配置

修改 haproxy-keeplive-node1 节点上 keepalived.conf 配置文件

```shell
vim /etc/keepalived/keepalived.conf

global_defs {
   # 路由id,主备节点不能相同
   router_id node1
}

# 自定义监控脚本
vrrp_script chk_haproxy {
    # 脚本位置
    script "/etc/keepalived/haproxy_check.sh"
    # 脚本执行的时间间隔
    interval 5
    weight -20
}

vrrp_instance VI_1 {
    # Keepalived的角色，MASTER 表示主节点，BACKUP 表示备份节点
    state MASTER
    # 指定监测的网卡，可以使用 ifconfig 进行查看
    interface ens33
    # 虚拟路由的id，主备节点需要设置为相同
    virtual_router_id 1
    # 优先级，主节点的优先级需要设置比备份节点高
    priority 100
    # 设置主备之间的检查时间，单位为秒
    advert_int 1
    # 定义验证类型和密码
    authentication {
        auth_type PASS
        auth_pass 123456
    }

    # 调用上面自定义的监控脚本
    track_script {
        chk_haproxy
    }

    virtual_ipaddress {
        # 虚拟IP地址，可以设置多个
        192.168.0.123
    }
}
```

以上配置定义了 haproxy-keeplive-node1 上的 Keepalived 节点为 MASTER 节点，并设置对外提供服务的虚拟 IP 为 192.168.0.123。此外最主要的是定义了通过 haproxy_check.sh 来对 HAProxy 进行监控

```shell
vim /etc/keepalived/haproxy_check.sh

#!/bin/bash

# 判断haproxy是否已经启动
if [ `ps -C haproxy --no-header |wc -l` -eq 0 ] ; then
    #如果没有启动，则启动
    systemctl start haproxy

    #睡眠3秒以便haproxy完全启动
    sleep 3

    #如果haproxy还是没有启动，此时需要将本机的keepalived服务停掉，以便让VIP自动漂移到另外一台haproxy
    if [ `ps -C haproxy --no-header |wc -l` -eq 0 ] ; then
        systemctl stop keepalived
    fi
fi

#赋予执行权限
chmod +x /etc/keepalived/haproxy_check.sh
```

这个脚本主要用于判断 HAProxy 服务是否正常，如果不正常且无法启动，此时就需要将本机 Keepalived 关闭，从而让虚拟 IP 漂移到备份节点。备份节点的配置与主节点基本相同，但是需要修改其 state 为 BACKUP；同时其优先级 priority 需要比主节点低

修改 haproxy-keeplive-node2 节点上 keepalived.conf 配置文件

```shell
vim /etc/keepalived/keepalived.conf

global_defs {
   # 路由id,主备节点不能相同
   router_id node2

}

vrrp_script chk_haproxy {
    script "/etc/keepalived/haproxy_check.sh"
    interval 5
    weight -20
}

vrrp_instance VI_1 {
    # BACKUP 表示备份节点
    state BACKUP
    interface ens33
    virtual_router_id 1
    # 优先级，备份节点要比主节点低
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 123456
    }

    track_script {
        chk_haproxy
    }

    virtual_ipaddress {
        192.168.0.123
    }
}
```

#### 启动服务

```shell
systemctl start  keepalived
```

::: warning
SECURITY VIOLATION - scripts are being executed but script_security not enabled
:::

确认脚本可以手动执行，是否有执行权限
