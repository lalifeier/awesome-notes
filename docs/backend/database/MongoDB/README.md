---
sidebar: auto
---

## 介绍

#### MongoDB

## 环境安装

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
