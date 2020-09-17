---
sidebar: auto
---

# MongoDB

#### MongoDB

## 开发环境

### 源码安装

```shell
# https://docs.mongodb.com/manual/administration/install-on-linux/
# https://www.mongodb.com/try/download/community
cd /usr/local
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.9.tgz
tar -zxvf mongodb-linux-x86_64-rhel70-4.2.9.tgz
mv mongodb-linux-x86_64-rhel70-4.2.9 mongodb
cd /usr/local/mongodb
mkdir -p /usr/local/mongodb/data/db
mkdir -p /usr/local/mongodb/log
touch log/mongod.log
```

### Mongo 配置

```shell
vim mongodb.conf
```

```shell
port = 27017
dbpath = /usr/local/mongodb/data/db
logpath = /usr/local/mongodb/log/mongod.log
fork = true
logappend = true
```

### 环境变量

```shell
vim /etc/profile
#添加以下内容
export MONGODB_HOME=/usr/local/mongodb
export PATH=$PATH:$MONGODB_HOME/bin
#生效配置
source /etc/profile
```

### 启动

```shell
mongod --dbpath /usr/local/mongodb/data/db --logpath /usr/local/mongodb/log/mongod.log --fork
mongod --config /usr/local/mongodb/mongodb.conf
mongo
```

### Mongo 开机启动

```shell
cat > /usr/lib/systemd/system/mongod.service <<-EOF
[Unit]
Description=MongoDB database server
After=network.target
After=syslog.target

[Service]
Type=oneshot
User=root
KillMode=process
ExecStart=/usr/local/mongodb/bin/mongod -f /usr/local/mongodb/mongodb.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
# 使服务自动运行
systemctl daemon-reload
systemctl enable mongod
# 启动服务
systemctl restart mongod
systemctl status mongod
```

### MongoDB Cloud

[MongoDB Cloud](https://www.mongodb.com/cloud)

### Docker 安装 MongoDB

#### 拉取镜像

```shell
docker pull mongo:latest
```

#### 运行 MongoDB

```shell
mkdir -p /home/docker/mongo/{configdb,db}
cd /home/docker/mongo

docker run -d --restart=always -p 27017:27017 -v $PWD/configdb:/data/configdb -v $PWD/db:/data/db --name mongo mongo --auth

#添加管理员账号
docker exec -it mongo mongo admin
#创建一个拥有最高权限 root 账号
db.createUser({ user: 'admin', pwd: '123456', roles: [{role: "root", db: "admin"}]});
```

### 可视化工具

- [Robo 3T](https://robomongo.org/download) 开源免费
- [Studio 3T](https://studio3t.com/download/) 商业付费

## 基本使用

### insert

- [db.collection.insert()](https://docs.mongodb.com/manual/reference/method/db.collection.insert/)

```shell
db.products.insert( { item: "card", qty: 15 } )
```

- [db.collection.insertOne()](https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/)

```shell
db.products.insertOne( { item: "card", qty: 15 } );
```

- [db.collection.insertMany()](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/)

```shell
db.products.insertMany( [
      { item: "card", qty: 15 },
      { item: "envelope", qty: 20 },
      { item: "stamps" , qty: 30 }
] );
```

### find

[Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/)

- [db.collection.find()](https://docs.mongodb.com/manual/reference/method/db.collection.find/)

```shell
db.bios.find( { _id: 5 } )
```

#### 查询条件对照表

[Comparison Query Operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/)

|   SQL   |       MQL       |
| :-----: | :-------------: |
|  a = 1  |     {a: 1}      |
| a <> 1  | {a: {\$ne: 1}}  |
|  a > 1  | {a: {\$gt: 1}}  |
| a >= 1  | {a: {\$gte: 1}} |
|  a < 1  | {a: {\$lt: 1}}  |
| a \<= 1 | {a: {\$lte: 1}} |

#### 查询逻辑对照表

[Logical Query Operators](https://docs.mongodb.com/manual/reference/operator/query-logical/)

[Evaluation Query Operators](https://docs.mongodb.com/manual/reference/operator/query-evaluation/)

|       SQL       |                   MQL                   |
| :-------------: | :-------------------------------------: |
| a = 1 AND b = 1 | {a: 1, b: 1}或{\$and: [{a: 1}, {b: 1}]} |
| a = 1 OR b = 1  |        {\$or: [{a: 1}, {b: 1}]}         |
|    a IS NULL    |         {a: {\$exists: false}}          |
| a IN (1, 2, 3)  |          {a: {\$in: [1,2,3]}}           |

#### 查询子文档

```shell
db.bios.find(
   {
     "name.first": "Yukihiro",
     "name.last": "Matsumoto"
   }
)
```

[Array Query Operators](https://docs.mongodb.com/manual/reference/operator/query-array/)

```shell
# $elemMatch (query)
db.survey.find(
   { results: { $elemMatch: { product: "xyz" } } }
)
```

### remove

[db.collection.remove()](https://docs.mongodb.com/manual/reference/method/db.collection.remove/index.html)

```shell
db.products.remove( { qty: { $gt: 20 } } )
```

[db.collection.drop()](https://docs.mongodb.com/manual/reference/method/db.collection.drop/)

```shell
#删除表
db.students.drop()
```

[db.dropDatabase()](https://docs.mongodb.com/manual/reference/method/db.dropDatabase/index.html)

```shell
#删除数据库
use temp
db.dropDatabase()
```

### update

[db.collection.update()](https://docs.mongodb.com/manual/reference/method/db.collection.update/)

```shell
db.books.update(
   { _id: 1 },
   {
     $inc: { stock: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)
```

[db.collection.updateOne()](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/)

[db.collection.updateMany()](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/)

## 聚合框架

[Aggregation](https://docs.mongodb.com/manual/aggregation/)

### Aggregation Pipeline

```shell
db.orders.aggregate([
   { $match: { status: "A" } },
   { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
])
```

[Aggregation Pipeline Stages](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

[Aggregation Pipeline Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/)

## 复制集

### 搭建复制集

1. 安装 MongoDB

2. 创建数据目录、日志目录和配置目录

```shell
mkdir -p /data/mongodb/rs0-0/data /data/mongodb/rs0-1/data /data/mongodb/rs0-2/data
mkdir -p /data/mongodb/rs0-0/log /data/mongodb/rs0-1/log /data/mongodb/rs0-2/log
mkdir -p /data/mongodb/conf
```

3. 配置文件

```shell
vim /data/mongodb/conf/rs0-0.conf
#添加以下内容
systemLog:
   destination: file
   path: /data/mongodb/rs0-0/log/mongod.log
   logAppend: true
storage:
   dbPath: /data/mongodb/rs0-0/data
   journal:
      enabled: true
processManagement:
   fork: true
replication:
   replSetName: rs0
net:
   bindIp: 0.0.0.0
   port: 27017


vim /data/mongodb/conf/rs0-1.conf
#添加以下内容
systemLog:
   destination: file
   path: /data/mongodb/rs0-1/log/mongod.log
   logAppend: true
storage:
   dbPath: /data/mongodb/rs0-1/data
   journal:
      enabled: true
processManagement:
   fork: true
replication:
   replSetName: rs0
net:
   bindIp: 0.0.0.0
   port: 27018


vim /data/mongodb/conf/rs0-2.conf
#添加以下内容
systemLog:
   destination: file
   path: /data/mongodb/rs0-2/log/mongod.log
   logAppend: true
storage:
   dbPath: /data/mongodb/rs0-2/data
   journal:
      enabled: true
processManagement:
   fork: true
replication:
   replSetName: rs0
net:
   bindIp: 0.0.0.0
   port: 27019
```

4. 启动副本集成员

```shell
mongod -f /data/mongodb/conf/rs0-0.conf
mongod -f /data/mongodb/conf/rs0-1.conf
mongod -f /data/mongodb/conf/rs0-2.conf
```

5. 查看 mongod 进程

```shell
ps aux | grep mongod
```

6. 配置复制集

```shell
#方法一
#hostname需要被解析
hostname -f
mongo --port 27017
rs.initiate()
rs.add("HOSTNAME:27018")
rs.add("HOSTNAME:27019")

#方法二
mongo --port 27017
rs.initiate({
  _id: "rs0",
  members: [
    {
     _id: 0,
     host: "127.0.0.1:27017"
    },
    {
     _id: 1,
     host: "127.0.0.1:27018"
    },
    {
     _id: 2,
     host: "127.0.0.1:27019"
    }
   ]
})
```

7. 显示当前复制集配置

```shell
rs.conf()
```

8. 检查复制集的状态

```shell
rs.status()
```

9. 允许从节点读

```shell
rs.slaveOk()
```

##

### Mongodump / Mongorestore

```shell
mongodump -h 127.0.0.1:27017 -d test -c test

mongorestore -h 127.0.0.1:27017 -d test -c test xxx.json
```
