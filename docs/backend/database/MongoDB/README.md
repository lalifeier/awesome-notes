---
sidebar: auto
---

# MongoDB

#### MongoDB

## 开发环境

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
