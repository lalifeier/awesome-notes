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

```

```
