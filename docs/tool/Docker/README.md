---
sidebar: auto
---

## 介绍

#### Docker

## 基本概念

### Docker 镜像

Docker 的镜像文件，相当于是一个只读层，不能往里面写入数据。我们可以通过编写 dockerfile 文件，定义需要安装的程序，比如说 MySQL、Redis、JDK、Node.js 等等，然后执行这个 dockerfile 文件，创建出镜像文件。

手写 dockerfile 还是比较麻烦的，所以我们可以在 Docker 的镜像仓库里面寻找别人已经创建好的镜像，比如说你想部署 Java 程序，那么就在线下载 Java 镜像即可，非常简单。

毕竟 Docker 镜像是只读层，如果我们想要往里面部署层序应该怎么办呢？这个很简单，我们可以给镜像创建一个容器，容器是可读可写的，我们把程序部署在容器里就行了。

### Docker 容器

我们说的在 Docker 虚拟机中创建实例，指的就是容器。因为镜像的内容是只读的，想要部署程序，我们需要创建出容器实例，容器的内容是可以读写的，可以用来部署程序。

而且容器之间是完全隔离的，我们不用担心一个容器中部署程序，会影响到另一个容器。就比如说我们在 CentOS 上直接安装 MySQL 8.0，它跟 Percona Toolkit 有冲突，跟 Sysbench 也有冲突，所以我们做在线修改表结构，以及做压力测试的时候，都是挑选新的虚拟机实例来安装这些程序，访问 MySQL 的。如果用上了 Docker，我可以在 A 容器里安装 MySQL，在 B 容器跑压力测试，根本不会有冲突。

再有，必须先有镜像，才能创建出容器，镜像和容器之间是关联的关系。而且一个镜像可以创建出多个容器，像是 SaaS 云计算，运营商可以把进销存系统打成镜像。有企业购买进销存系统，那么运营商就给客户创建一个容器，客户的进销存数据保存在容器 A 里面。再有客户购买进销存系统，运营商就创建容器 B，以此类推。云计算服务商就是这么卖软件的。

## 环境安装

### 安装

- 卸载旧版本

```shell
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

- 安装必要的一些系统工具

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

- 添加软件源信息

```shell
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 官方源
#yum-config-manager \
#    --add-repo \
#    https://download.docker.com/linux/centos/docker-ce.repo
```

- 更新并安装 Docker-CE

```shell
yum makecache fast
yum install docker-ce
```

- 启动

```shell
systemctl start docker
```

- 开机自启

```shell
systemctl enable docker
```

- 建立 docker 用户组

```shell
groupadd docker
usermod -aG docker your-user
```

#### 参考:

- [https://developer.aliyun.com/mirror/docker-ce](https://developer.aliyun.com/mirror/docker-ce)

### 脚本自动安装

```shell
curl -sSL https://get.daocloud.io/docker | sh

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh --mirror Aliyun
```

#### 参考:

- [https://get.daocloud.io/](https://get.daocloud.io/)

### 镜像加速器

```shell
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

#### 参考:

- [https://www.daocloud.io/mirror#accelerator-doc](https://www.daocloud.io/mirror#accelerator-doc)

```shell
vim /etc/docker/daemon.json
```

|     镜像加速器      |            镜像加速器地址            |    专属加速器    |       其它加速        |
| :-----------------: | :----------------------------------: | :--------------: | :-------------------: |
| Docker 中国官方镜像 |    https://registry.docker-cn.com    |                  |      Docker Hub       |
|   DaoCloud 镜像站   |    http://f1361db2.m.daocloud.io     | 可登录，系统分配 |      Docker Hub       |
|   Azure 中国镜像    |      https://dockerhub.azk8s.cn      |                  | Docker Hub、GCR、Quay |
|     科大镜像站      |  https://docker.mirrors.ustc.edu.cn  |                  | Docker Hub、GCR、Quay |
|       阿里云        | https://1nj0zren.mirror.aliyuncs.com | 需登录，系统分配 |      Docker Hub       |
|       七牛云        |     https://reg-mirror.qiniu.com     |                  | Docker Hub、GCR、Quay |
|       网易云        |     https://hub-mirror.c.163.com     |                  |      Docker Hub       |
|       腾讯云        |  https://mirror.ccs.tencentyun.com   |                  |      Docker Hub       |

## 使用

### 显示 Docker 系统信息

```shell
docker info
```

### 镜像管理

```shell
#搜索镜像
docker search 关键字
#下载镜像
docker pull 镜像名字
#查看镜像
docker images
#重命名镜像
docker tag 旧镜像 新镜像
#删除镜像
docker rmi 镜像名字
#导出镜像
docker save -o 压缩文件路径 镜像名字
#导入镜像
docker load < 压缩文件路径
#镜像⼤⼩
docker system df
#查看指定镜像的创建历史
docker history 镜像名字
#迁移镜像 从⼀个机器将镜像迁移到另⼀个机器，并且带进度条
docker save <镜像名> | bzip2 | pv | ssh <⽤户名>@<主机名> 'cat | docker load'
```

### 创建容器

```shell
#创建普通容器
docker run -it --name 别名 镜像名字 程序名字
#创建含有端口映射的容器
docker run -it --name 别名 -p 宿主机端口:容器端口 镜像名字 程序名字
#创建含有挂载目录的容器
docker run -it --name 别名 -v 宿主机目录:容器目录 --privileged 镜像名字 程序名字

-it 启动容器开启交互界面
-p  小写p表示docker会选择一个具体的宿主机端口映射到容器内部开放的网络端口上。
-P  大写P表示docker会随机选择一个宿主机端口映射到容器内部开放的网络端口上。
--privileged 使用该参数，container内的root拥有真正的root权限。否则，container内的root只是外部的一个普通用户权限
```

### 操作容器状态

```shell
#查看容器列表
docker ps ‐a
docker container ls --all
#查看容器信息
docker inspect 容器
#删除容器
docker rm 容器
#暂停容器
docker pasue 容器
#恢复容器
docker unpause 容器
#停止容器
docker stop 容器
#启动容器
docker start -i 容器
#查看容器日志
docker logs 容器 -f
#检查容器里文件结构的更改
docker diff 容器
#从容器创建一个新的镜像
docker commit -a "提交人信息" -m "说明信息" 容器  仓库名称:标签
#删除全部容器
docker rm -f $(docker ps -aq)
#设置容器自动启动
docker update --restart=always 容器
```

### 数据卷管理

```shell
#数据卷列表
docker volume ls
#创建数据卷
docker volume create 数据卷名称
#删除数据卷
docker volume rm 数据卷名称
#清除没有挂载的数据卷
docker volume prune
#查看数据卷
docker volume inspect 数据卷名称
```

### 网络管理

```shell
#查看网络信息
docker network ls
docker network create ‐‐subnet=网段 网络名称
docker network rm 网络名称
```

### Dockerfile

#### 参考：[https://docs.docker.com/develop/develop-images/dockerfile_best-practices/](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

```shell
#使用 Dockerfile 定制镜像
mkdir mynginx
cd mynginx
touch
#文件内添加以下内容
FROM nginx
RUN echo '<h1>hello world</h1>' > /usr/share/nginx/html/index.html
#构建镜像 -f ../Dockerfile 参数指定某个⽂件作为 Dockerfile
docker build -t nginx:v3 .
```

- FROM：定制的镜像都是基于 FROM 的镜像，这里的 nginx 就是定制需要的基础镜像。后续的操作都是基于 nginx。

- RUN：用于执行后面跟着的命令行命令。

- COPY：复制指令，从上下文目录中复制文件或者目录到容器里指定路径

. 是上下文路径。上下文路径，是指 docker 在构建镜像，有时候想要使用到本机的文件（比如复制），docker build 命令得知这个路径后，会将路径下的所有内容打包。

#### Docker 还存在⼀个特殊的镜像，名为 scratch 。这个镜像是虚拟的概念，并不实际存在，它表示⼀个空⽩的镜像。

```shell
FROM scratch
...
```

::: warning
Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大

Union FS 是有最⼤层数限制的，⽐如 AUFS，曾经是最⼤不得超过 42 层，现在是不得超过 127 层。
:::

```shell
FROM debian:jessie
RUN apt-get update
RUN apt-get install -y gcc libc6-dev make
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
#以上执行会创建7层镜像。可简化为以下格式：
FROM debian:jessie
RUN buildDeps='gcc libc6-dev make' \
&& apt-get update \
&& apt-get install -y $buildDeps \
&& wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz" \
&& mkdir -p /usr/src/redis \
&& tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
&& make -C /usr/src/redis \
&& make -C /usr/src/redis install \
&& rm -rf /var/lib/apt/lists/* \
&& rm redis.tar.gz \
&& rm -r /usr/src/redis \
&& apt-get purge -y --auto-remove $buildDeps
#以 && 符号连接命令，这样执行后，只会创建 1 层镜像
#Dockerfile ⽀持 Shell 类的⾏尾添加 \ 的命令换⾏⽅式，以及⾏⾸ # 进⾏注释的格式。
```

### 私有镜像仓库

#### Docker Hub

```shell
#在 https://cloud.docker.com 免费注册⼀个 Docker 账号
#登录
docker login
#注销
docker logout
#拉取镜像
docker search
docker pull
#推送镜像
docker tag 镜像名:标签 username/镜像名:标签
docker push
```

#### 私有仓库

docker-registry 是官⽅提供的⼯具，可以⽤于构建私有的镜像仓库。

```shell
#安装官⽅ registry 镜像
#默认情况下，仓库会被创建在容器的 /var/lib/registry ⽬录下
docker run -d -p 5000:5000 --restart=always --name registry registry
#上传镜像
docker tag ubuntu:latest 127.0.0.1:5000/ubuntu:latest
docker push 127.0.0.1:5000/ubuntu:latest
#⽤ curl 查看仓库中的镜像
curl 127.0.0.1:5000/v2/_catalog
#搜索镜像
#拉取镜像
docker pull 127.0.0.1:5000/ubuntu:latest
```

::: warning
如果你不想使⽤ 127.0.0.1:5000 作为仓库地址，⽐如想让本⽹段的其他主机也能把镜像推送到私有仓
库。你就得把例如 192.168.199.100:5000 这样的内⽹地址作为私有仓库地址，这时你会发现⽆法成功
推送镜像。
这是因为 Docker 默认不允许⾮ HTTPS ⽅式推送镜像。我们可以通过 Docker 的配置选项来取消这个
限制。
:::

```shell
vim /etc/docker/daemon.json
{
    "registry-mirror": [
        "https://registry.docker-cn.com"
    ],
    "insecure-registries": [
        "192.168.199.100:5000"
    ]
}
```

::: warning
避免 VM 虚拟机挂起恢复之后，Docker 虚拟机断网
:::

```shell
vi /etc/sysctl.conf
#文件中添加 net.ipv4.ip_forward=1 这个配置
#重启网络服务
systemctl  restart network
```

## Docker 三架马车

### Docker Compose

#### 介绍

Docker Compose 是 Docker 官⽅编排（Orchestration）项⽬之⼀，负责快速的部署分布式应⽤。其代
码⽬前在https://github.com/docker/compose上开源。Compose 定位是 「定义和运⾏多个 Docker 容
器的应⽤（Defining and running multi-container Docker applications）」，其前身是开源项⽬ Fig 。

在⽇常⼯作中，经常会碰到需要多个容器相互配合来完成某项任务的情况。例如要实现⼀个 Web 项
⽬，除了 Web 服务容器本身，往往还需要再加上后端的数据库服务容器或者缓存服务容器，甚⾄还包
括负载均衡容器等。Compose 恰好满⾜了这样的需求。它允许⽤户通过⼀个单独的 dockercompose.yml 模板⽂件（YAML 格式）来定义⼀组相关联的应⽤容器为⼀个项⽬（project）。

Compose 中有两个重要的概念：

服务 (service)：⼀个应⽤的容器，实际上可以包括若⼲运⾏相同镜像的容器实例。

项⽬ (project)：由⼀组关联的应⽤容器组成的⼀个完整业务单元，在 docker-compose.yml ⽂件中
定义。

Compose 的默认管理对象是项⽬，通过⼦命令对项⽬中的⼀组容器进⾏便捷地⽣命周期管理。

Compose 项⽬由 Python 编写，实现上调⽤了 Docker 服务提供的 API 来对容器进⾏管理。所以只要
所操作的平台⽀持 Docker API，就可以在其上利⽤ Compose 来进⾏编排管理。

#### 安装与卸载

- ⼆进制安装与卸载

```shell
#安装
curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
#卸载
rm /usr/local/bin/docker-compose
```

#### 参考: [https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

- PIP 安装与卸载

```shell
#安装
pip install -U docker-compose
#bash 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.8.0/contrib/completion/bash/d
ocker-compose > /etc/bash_completion.d/docker-compose
#卸载
pip uninstall docker-compose
```

- 容器中执⾏

```shell
curl -L https://github.com/docker/compose/releases/download/1.25.5/run.sh > /usr/local/bi
n/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### 查看 docker-compose 版本

```shell
docker-compose --version
```

#### 使用

```shell
mkdir composetest
cd composetest
#创建   app.py 文件
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
#创建  requirements.txt 文件
flask
redis
#创建 Dockerfile 文件
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run"]
#创建 docker-compose.yml文件
# yaml 配置
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis:alpine"
#运行 compose 项目
docker-compose up -d
#重启 compose 项目
docker-compose restart
#删除 compose 项目
docker-compose down
#构建 compose 项目
docker-compose build
```

### Docker Machine

#### 介绍

Docker Machine 是 Docker 官⽅编排（Orchestration）项⽬之⼀，负责在多种平台上快速安装 Docker
环境。

Docker Machine 项⽬基于 Go 语⾔实现，⽬前在 Github 上进⾏维护。

Docker Machine 是 Docker 官⽅提供的⼀个⼯具，它可以帮助我们在远程的机器上安装 Docker，或者
在虚拟机 host 上直接安装虚拟机并在虚拟机中安装 Docker。我们还可以通过 docker-machine 命令来
管理这些虚拟机和 Docker。

#### 安装

```shell
curl -L https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine
```

#### 参考: [https://github.com/docker/machine/releases](https://github.com/docker/machine/releases)

#### 查看 docker-machine 版本

```shell
docker-machine -v
```

#### 使用

```shell
#列出可用的机器
docker-machine ls
#显示连接主机的配置
docker-machine config
#创建机器
docker-machine create -d virtualbox test
#显示连接到某个主机需要的环境变量
docker-machine env test
#查看机器的 ip
docker-machine ip test
#停止机器
docker-machine stop test
#启动机器
docker-machine start test
#进入机器
docker-machine ssh test
#移除机器
docker-machine rm test
```

::: warning
Error with pre-create check: "VBoxManage not found. Make sure VirtualBox is installed and VBoxManage is in the path"
:::

- yum 安装 VirtualBox

```shell
#导入epel安装源
yum install epel-release
#添加VirtualBox安装源
cd /etc/yum.repos.d/
wget http://download.virtualbox.org/virtualbox/rpm/rhel/virtualbox.repo
#安装相关依赖包
yum update
yum install binutils qt gcc make patch libgomp glibc-headers glibc-devel kernel-headers kernel-devel dkms
#安装VirtualBox
yum install VirtualBox-5.2
#构建内核模块并启动VirtualBox
sudo /sbin/vboxconfig
```

- 源码安装 VirtualBox [https://www.virtualbox.org/wiki/Linux_Downloads](https://www.virtualbox.org/wiki/Linux_Downloads)

```shell
#添加公钥
wget https://www.virtualbox.org/download/oracle_vbox.asc
rpm --import oracle_vbox.asc
#安装vitualbox
wget https://download.virtualbox.org/virtualbox/5.2.40/VirtualBox-5.2-5.2.40_137108_el7-1.x86_64.rpm
yum localinstall VirtualBox-5.2-5.2.40_137108_el7-1.x86_64.rpm
```

::: warning
Error with pre-create check: "We support Virtualbox starting with version 5. Your VirtualBox install is \"WARNING: The vboxdrv kernel module is not loaded. Either there is no module\\n available for the current kernel (3.10.0-1062.el7.x86_64) or it failed to\\n load. Please recompile the kernel module and install it by\\n\\n sudo /sbin/vboxconfig\\n\\n You will not be able to start VMs until this problem is fixed.\\n5.2.40r137108\". Please upgrade at https://www.virtualbox.org
:::

```shell
yum install kernel-headers-$(uname -r) kernel-devel-$(uname -r)
#查看系统上所有可用的内核
awk -F \' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
#切换内核版本
grub2-set-default 0
#重启
reboot
sudo /sbin/vboxconfig
```

### Docker Swarm

#### 介绍

Swarm 是使⽤ SwarmKit 构建的 Docker 引擎内置（原⽣）的集群管理和编排⼯具。 Docker Swarm 是
Docker 官⽅三剑客项⽬之⼀，提供 Docker 容器集群服务，是 Docker 官⽅对容器云⽣态进⾏⽀持的
核⼼⽅案。

使⽤它，⽤户可以将多个 Docker 主机封装为单个⼤型的虚拟 Docker 主机，快速打造⼀套容器云平
台。Swarm mode 内置 kv 存储功能，提供了众多的新特性，⽐如：具有容错能⼒的去中⼼化设计、内
置服务发现、负载均衡、路由⽹格、动态伸缩、滚动更新、安全传输等。使得 Docker 原⽣的 Swarm
集群具备与 Mesos 、 Kubernetes 竞争的实⼒。

#### 使用

```shell
#初始化集群
docker-machine create -d virtualbox manager
docker-machine env manager
eval $(docker-machine env manager)

docker-machine ls

docker-machine ssh manager
docker swarm init --advertise-addr 192.168.99.100
#增加⼯作节点
docker-machine create -d virtualbox worker1
docker-machine ssh worker1
docker swarm join --token SWMTKN-1-5j2023jo6yn493n00b0iecuevsg4poh6l3o0fplcghud6udibo-8o35q16ax1tf46xwf1d1fhx5g 192.168.99.100:2377
docker-machine create -d virtualbox worker2
docker-machine ssh worker2
docker swarm join --token SWMTKN-1-5j2023jo6yn493n00b0iecuevsg4poh6l3o0fplcghud6udibo-8o35q16ax1tf46xwf1d1fhx5g 192.168.99.100:2377
#查看集群
docker node ls
docker service ls
docker-machine ls
#安装nginx服务
docker service create --replicas 3 -p 80:80 --name nginx nginx:latest
#查看某个服务的⽇志
docker service logs nginx
#从 Swarm 集群移除某个服务
docker service rm nginx
```

#### 部署 WordPress

```shell
#docker-compose.yml 其中constraints: [node.role == manager]是调度策略
version: '3'

services:
  wordpress:
    image: wordpress
    ports:
      - 80:80
    networks:
      - overlay
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
    deploy:
      mode: replicated
      replicas: 3

  db:
    image: mysql
    networks:
      - overlay
    volumes:
      - db-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    deploy:
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]

volumes:
  db-data:
networks:
  overlay:

#部署服务
docker stack deploy -c docker-compose.yml wordpress
#查看服务
docker service ls
docker stack ls
#移除服务 该命令不会移除服务所使⽤的 数据卷 ，如果你想移除数据卷请使⽤ docker volume rm
docker stack down wordpress
```

## 图形化管理和监控工具

### Portainer

#### 参考：[https://www.portainer.io/](https://www.portainer.io/)

Portainer（基于 Go）是⼀个轻量级的管理界⾯，可让您轻松管理 Docker 主机或 Swarm 集群。

Portainer 的使⽤意图是简单部署。它包含可以在任何 Docker 引擎上运⾏的单个容器（Docker for
Linux 和 Docker for Windows）。

Portainer 允许您管理 Docker 容器、image、volume、network 等。 它与独⽴的 Docker 引擎和
Docker Swarm 兼容。

#### 安装 Portainer

```shell
docker volume create portainer_data
docker run -d -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

```shell
#拉取portainer镜像
docker pull portainer/portainer
#开放 Docker 网络管理端口
vim /etc/sysconfig/docker
#在配置文件结尾添加开放 Docker2375 端口的参数
OPTIONS='-Htcp://0.0.0.0:2375 -H unix:///var/run/docker.sock'
#启动 Portainer 容器
docker run -d --restart=always -p 9000:9000 portainer/portainer -H tcp://192.168.123.36:2375
```

::: warning
需要开放 2375 和 9000 端口
:::

```shell
firewall-cmd --permanent --add-port=2375/tcp
firewall-cmd --permanent --add-port=9000/tcp
firewall-cmd --reload
```

#### 访问 http://192.168.123.36:9000

### Rancher

#### 参考：[https://rancher.com/](https://rancher.com/)

Rancher 是⼀个开源的企业级容器管理平台。通过 Rancher ，企业不必⾃⼰使⽤⼀系列的开源软件去
从头搭建容器服务平台。 Rancher 提供了在⽣产环境中使⽤管理 Docker 和 Kubernetes 的全栈化容器
部署与管理平台。

### cAdvisor

#### 参考：[https://github.com/google/cadvisor](https://github.com/google/cadvisor)

cAdvisor 是 Google 开发的容器监控⼯具。

监控 Docker Host cAdvisor 会显示当前 host 的资源使⽤情况，包括 CPU、内存、⽹络、⽂件系
统等。

监控容器 点击 Docker Containers 链接，显示容器列表。点击某个容器，⽐如 sysdig，进⼊该容
器的监控⻚⾯。

以上就是 cAdvisor 的主要功能，总结起来主要两点：展示 Host 和容器两个层次的监控数据。展示历史变化数据。

由于 cAdvisor 提供的操作界⾯略显简陋，⽽且需要在不同⻚⾯之间跳转，并且只能监控⼀个 host，
这不免会让⼈质疑它的实⽤性。但 cAdvisor 的⼀个亮点是它可以将监控到的数据导出给第三⽅⼯具，
由这些⼯具进⼀步加⼯处理。

我们可以把 cAdvisor 定位为⼀个监控数据收集器，收集和导出数据是它的强项，⽽⾮展示数据。
cAdvisor ⽀持很多第三⽅⼯具。

#### 安装 cAdvisor

```shell
docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  google/cadvisor:latest
```

#### 访问 http://192.168.123.36:8080/containers/

#### cAdvisor 还提供了⼀个 Rest API：https://github.com/google/cadvisor/blob/master/docs/api.md cAdvisor 通过该 REST API 暴露监控数据，格式如下：

```shell
http://<hostname>:<port>/api/<version>/<request>
```

## 多阶段构建

Docker 17.05 版本以后，官⽅就提供了⼀
个新的特性： Multi-stage builds （多阶段构建）。 使⽤多阶段构建，你可以在⼀个 Dockerfile
中使⽤多个 FROM 语句。每个 FROM 指令都可以使⽤不同的基础镜像，并表示开始⼀个新的构建阶
段。你可以很⽅便的将⼀个阶段的⽂件复制到另外⼀个阶段，在最终的镜像中保留下你需要的内容即
可。

```shell
#Dockerfile
FROM golang AS build-env
ADD . /go/src/app
WORKDIR /go/src/app
RUN go get -u -v github.com/kardianos/govendor
RUN govendor sync
RUN GOOS=linux GOARCH=386 go build -v -o /go/src/app/app-server

FROM alpine
RUN apk add -U tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY --from=build-env /go/src/app/app-server /usr/local/bin/app-server
EXPOSE 8080
CMD [ "app-server" ]

#构建
docker build -t lalifeier/docker-multi-stage-demo:latest .
#测试
docker run --rm -p 8080:8080 lalifeier/docker-multi-stage-demo:latest
```

## Swarm 集群

#### 参考: [https://docs.docker.com/engine/swarm](https://docs.docker.com/engine/swarm)

#### 创建 Swarm 集群

```shell
#创建Swarm集群（该节点自动变成管理节点）
docker swarm init
--listen-addr ip:port 管理者节点
--advertise-addr ip 广播地址
```

::: warning
需要在 manager 机器开放 2377 端口，否则会出现如下错误

Error response from daemon: rpc error: code = 14 desc = grpc: the connection is unavailable

Error response from daemon: can't initialize raft node: rpc error: code = 2 desc = could not connect to prospective new cluster member using its advertised address: rpc error: code = 14 desc = grpc: the connection is unavailable
:::

```shell
firewall-cmd --zone=public --add-port=2377/tcp --permanent
firewall-cmd --reload
```

#### 加入 Swarm 集群

```shell
docker swarm join-token manager
docker swarm join-token worker
```

在 manager 和 worker 机器分别执行相应的 docker swarm join --token

#### 查看 Swarm 集群节点

```shell
docker node ls
```

#### 退出 Swarm 集群

- 主动退出

```shell
# Manager退出集群必须要使用-f参数
docker swarm leave -f
```

- 被动退出

```shell
# Manager节点必须先降级成Worker节点,然后再去删除
# Manager节点降级为Worker节点
docker node demote 节点ID
# 删除停止或离开的Worker节点
docker node rm 节点ID -f
```

#### Swarm 虚拟网络

```shell
#查看虚拟网络
docker network ls
#创建虚拟网络
docker network create -d overlay --attachable 虚拟网络名称
#删除虚拟网络（先删除该网络上部署的容器）
docker network rm 虚拟网络名称
```

Swarm 虚拟网络使用三个端口，所以必须要在防火墙上面开启 2377、7946、4789 端口

```shell
firewall-cmd --zone=public --add-port=2377/tcp --permanent
firewall-cmd --zone=public --add-port=7946/tcp --permanent
firewall-cmd --zone=public --add-port=7946/udp --permanent
firewall-cmd --zone=public --add-port=4789/tcp --permanent
firewall-cmd --zone=public --add-port=4789/udp --permanent
firewall-cmd --reload
```

开启防火墙端口之后，必须要重新启动 Docker 服务

```shell
systemctl  restart network
```

#### 退出 Swarm 集群

## PXC 集群

- Pecona XtraDB Cluster 是业界主流的 MySQL 集群方案
- PXC 集群的数据同步具有强一致性的特点
- PXC 集群只支持 InnoDB 引擎
- PXC 集群中 MySQL 节点的数量最好不要超过 15 个，集群规模越大，读写速度越慢

#### 下载 PXC 镜像

因为 PXC 镜像更新频率很高，新版本的镜像稳定性有待检验，推荐安装最稳定的 5.7.21 版本

```shell
# 拉取镜像
docker pull percona/percona-xtradb-cluster
docker pull percona/percona-xtradb-cluster:5.7.21
# 镜像重命名
docker tag percona/percona-xtradb-cluster pxc
docker rmi percona/percona-xtradb-cluster
```

#### 创建主节点容器

- 第一个启动的 PXC 节点是主节点，它要初始化 PXC 集群
- PXC 启动之后，就没有主节点的角色了
- PXC 集群中任何节点都是可以读写数据

```shell
docker run -d --restart=always -p 9001:3306 -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 -v pnv1:/var/lib/mysql --privileged --name=pn1 --net=swarm_mysql pxc
```

创建主节点之后，稍等一会儿，才能连接

#### 创建从节点容器

必须主节点可以访问了，才能创建从节点，否则会闪退

```shell
docker run -d --restart=always -p 9001:3306 -e MYSQL_ROOT_PASSWORD=123456 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=123456 -e CLUSTER_JOIN=pn1 -v pnv2:/var/lib/mysql --privileged --name=pn2 --net=swarm_mysql pxc
```

::: warning
解决虚拟机重启后 Percona XtraDB Cluster(PXC)容器无法正常启动

docker logs node1

[ERROR] WSREP: It may not be safe to bootstrap the cluster from this node. It was not the last one to leave the cluster and may not contain all the updates. To force cluster bootstrap with this node, edit the grastate.dat file manually and set safe_to_bootstrap to 1
:::

```shell
#查看node1挂载点的文件地址
docker volume inspect v1
#进入/var/lib/docker/volumes/v1/_data目录下
cd /var/lib/docker/volumes/v1/_data
#编辑文件grastate.dat
vim grastate.dat
#修改safe_to_bootstrap的值置为1
# GALERA saved state
version: 2.1
uuid:    1fdc4f95-9625-11e9-9a33-a20935d979f9
seqno:   -1
safe_to_bootstrap: 1
```

#### PXC 容器闪退的解决办法

- 主节点无法启动

  - PXC 启动之后，所有节点的 safe_to_bootstrap 都是 0
  - 如果所有 PXC 节点同时意外关闭，所有节点 safe_to_bootstrap 都是 0.所以主节点无法启动

    - 修改/var/lib/mysql/grastate.dat 文件，把 safe_to_bootstrap 参数改成 1，然后就能启动了

  - 如果 PXC 集群正在运行，宕机的主节点不能按照主节点启动

    - 删除容器，检查 safe_to_bootstrap 是否为 0
    - 以从节点方式创建容器，加入集群

- 从节点闪退的原因

  - 如果主节点没有完全启动成功，从节点就会闪退

  - PXC 最后退出的节点要最先启动，而且要按照主节点启动

    - 修改 grastate.dat 文件，把 safe_to_bootstrap 参数改成 0
    - safe_to_bootstrap 等于 1，代表该节点是最后退出的节点，需要按照主节点启动

## Replication 集群

- Replication 集群是 MySQL 自带的数据同步机制
- MySQL 通过读取、执行另一个 MySQL 的 bin_log 日志，实现数据同步
- Replication 集群中，数据同步是单向的，从主节点(Master)同步到从节点(Slave)

#### 下载 Replication 镜像

```shell
# 拉取镜像
docker pull mishamx/mysql
# 镜像重命名
docker tag mishamx/mysql rep
docker rmi mishamx/mysql
```

#### 创建主节点容器

```shell
docker run -d --restart=always -p 9003:3306 --name rn1 -e MYSQL_MASTER_PORT=3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_REPLICATION_USER=backup -e MYSQL_REPLICATION_PASSWORD=backup123 -v rnv1:/var/lib/mysql --privileged --net=swarm_mysql rep
```

#### 创建从节点容器

```shell
docker run -d --restart=always -p 9003:3306 --name rn2 -e MYSQL_MASTER_HOST=rn1 -e MYSQL_MASTER_PORT=3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_REPLICATION_USER=backup -e MYSQL_REPLICATION_PASSWORD=backup123 -v rnv2:/var/lib/mysql --privileged --net=swarm_mysql rep
```

#### Replication 集群注意事项

- 主节点关闭，从节点依然可以使用，主从同步机制失效
- 不启动主节点，从节点也能启动，主从同步失效

## MyCat

- MyCat 是基于 Java 语言的开源数据库中间件产品，具有跨平台性
- 相较于其他中间件产品，MyCat 的切分规则最多，功能最全
- 数据库中间件产品并不会频繁更新升级，MyCat 功能非常成熟

#### 参考: [http://mycat.io](http://mycat.io)

#### 安装 JDK 镜像

```shell
docker pull adoptopenjdk/openjdk8
docker tag adoptopenjdk/openjdk8 openjdk8
docker rmi adoptopenjdk/openjdk8
```

#### 创建 Java 容器，在数据卷放入 MyCat

```shell
docker run -d --restart=always -it --name mycat1 -v mycat1:/root/server --privileged --net=host  openjdk8
```

#### 开启端口

```shell
firewall-cmd --permanent --zone=public --add-port=8066/tcp
firewall-cmd --permanent --zone=public --add-port=9066/tcp
firewall-cmd --reload
```

#### 安装 MyCat

```shell
docker volume inspect mycat1
cd /var/lib/docker/volumes/mycat1/_data
wget http://dl.mycat.io/1.6.7.4/Mycat-server-1.6.7.4-release/Mycat-server-1.6.7.4-release-20200105164103-linux.tar.gz
tar -xvf Mycat-server-1.6.7.4-release-20200105164103-linux.tar.gz

docker exec -it mycat1 bash
cd /root/server/mycat
```

#### MyCat 到底是什么?

- MyCat 是 MySQL 数据库中间件产品，运行的时候会把自己虚拟成数据库，包括虚拟的逻辑库和数据表

#### MyCat 主要的配置文件

- server.xml Mycat 服务器参数调整和用户授权的配置文件
- schema.xml 逻辑库定义和表以及分片定义的配置文件
- rule.xml 分片规则的配置文件

#### 配置 server.xml 文件

可以配置端口号、账号信息、全局主键方式等等

```xml
<user name="admin" defaultAccount="true">
    <property name="password">123456</property>
    <property name="schemas">neti</property>
</user>
```

#### 配置 PXC 集群负载均衡

- 修改 schema.xml 文件，加入 PXC 集群负载均衡的内容

```xml
<dataHost name="pxc1" maxCon="1000" minCon="10" balance="0"
            writeType="1" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
    <heartbeat>select user()</heartbeat>
    <writeHost host="p1w1" url="192.168.123.36:9001" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p1w2" url="192.168.123.162:9001" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p1w3" url="192.168.123.104:9001" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p1w4" url="192.168.123.11:9001" user="root"
                password="123456">
    </writeHost>
</dataHost>

<dataHost name="pxc2" maxCon="1000" minCon="10" balance="0"
            writeType="1" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
    <heartbeat>select user()</heartbeat>
    <writeHost host="p2w1" url="192.168.123.36:9002" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p2w2" url="192.168.123.162:9002" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p2w3" url="192.168.123.104:9002" user="root"
                password="123456">
    </writeHost>
    <writeHost host="p2w4" url="192.168.123.11:9002" user="root"
                password="123456">
    </writeHost>
</dataHost>
```

#### 配置 Replication 集群读写分离

- 修改 schema.xml 文件，加入 读写分离的配置

```xml
<dataHost name="rep1" maxCon="1000" minCon="10" balance="3"
            writeType="1" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
    <heartbeat>select user()</heartbeat>
    <writeHost host="r1w1" url="192.168.123.36:9003" user="root"
                password="123456">
        <readHost host="r1r1" url="192.168.123.162:9003" user="root"
                                password="123456">
        </readHost>
        <readHost host="r1r2" url="192.168.123.104:9003" user="root"
                    password="123456">
        </readHost>
        <readHost host="r1r3" url="192.168.123.11:9003" user="root"
                    password="123456">
        </readHost>
    </writeHost>
</dataHost>

<dataHost name="rep2" maxCon="1000" minCon="10" balance="3"
                        writeType="1" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="r2w1" url="192.168.123.36:9004" user="root"
                            password="123456">
                <readHost host="r2r1" url="192.168.123.162:9004" user="root"
                            password="123456">
                </readHost>
                <readHost host="r2r2" url="192.168.123.104:9004" user="root"
                            password="123456">
                </readHost>
                <readHost host="r2r3" url="192.168.123.11:9004" user="root"
                            password="123456">
                </readHost>
        </writeHost>
</dataHost>
```

#### 配置虚拟库和虚拟表

修改 schema.xml 文件

- dataNode 标签可以设置使用的真实逻辑库

```xml
<dataNode name="dn1" dataHost="pxc1" database="neti" />
<dataNode name="dn2" dataHost="pxc2" database="neti" />
<dataNode name="dn3" dataHost="rep1" database="neti" />
<dataNode name="dn4" dataHost="rep2" database="neti" />
<dataNode name="tdn1" dataHost="pxc1" database="t1" />
<dataNode name="tdn2" dataHost="pxc2" database="t1" />
<dataNode name="tdn3" dataHost="rep1" database="t2" />
<dataNode name="tdn4" dataHost="rep2" database="t2"  />
```

- schema 标签可以设置虚拟逻辑库，table 标签可以设置虚拟关系表

```xml
<schema name="neti" checkSQLschema="false" sqlMaxLimit="100">
        <table name="teacher" dataNode="dn1,dn2" type="global" />
</schema>
<schema name="t1" checkSQLschema="false" sqlMaxLimit="100">
        <table name="teacher" dataNode="tdn1,tdn2" type="global" />
</schema>
<schema name="t2" checkSQLschema="false" sqlMaxLimit="100">
        <table name="teacher" dataNode="tdn3,tdn4" type="global" />
        <table name="student" dataNode="tdn3,tdn4" type="mod-long" />
</schema>
```

修改 server.xml 文件

```xml
<user name="admin" defaultAccount="true">
        <property name="password">123456</property>
        <property name="schemas">neti,t1,t2</property>
        <!--<property name="defaultSchema">neti</property>-->
        <!--No MyCAT Database selected 错误前会尝试使用该schema作为schema，不设置则为null,报错 -->
</user>
```

#### 修改 mod-long 算法

- MyCat 默认的 mod-long 是按照三个分片切片数据，所以我们要求改这个默认值

修改 rule.xml 文件中的 mod-long 分片数量

```xml
<function name="mod-long" class="io.mycat.route.function.PartitionByMod">
        <!-- how many data nodes -->
        <property name="count">2</property>
</function>
```

#### MyCat 日志文件

- MyCat 日志文件主要有 wrapper.log 和 mycat.log,存放在 logs 目录

```shell
docker exec -it mycat1 bash
cd /root/server/mycat
```

#### 启动 MyCat

```shell
docker exec -it mycat1 bash
cd /root/server/mycat/bin
#为 MyCat/bin 目录中所有 sh 命令设置最高权限
chmod -R 777 ./*.sh
#启动 MyCat程序
./mycat start
```

## Haproxy

#### 安装 Haproxy 镜像

```shell
docker pull haproxy
```

#### 创建 Haproxy 配置文件

#### 参考: [https://zhang.ge/5125.html](https://zhang.ge/5125.html)

```shell
# 启动容器时使用目录映射技术使容器读取该配置文件
vim /home/soft/haproxy/haproxy.cfg
```

```shell
global
	#工作目录
	chroot /usr/local/etc/haproxy
	#日志文件，使用rsyslog服务中local5日志设备（/var/log/local5），等级info
	log 127.0.0.1 local5 info
	#守护进程运行
	daemon

defaults
	log	global
	mode	http
	#日志格式
	option	httplog
	#日志中不记录负载均衡的心跳检测记录
	option	dontlognull
    #连接超时（毫秒）
	timeout connect 5000
    #客户端超时（毫秒）
	timeout client  50000
	#服务器超时（毫秒）
    timeout server  50000

#监控界面
listen  admin_stats
	#监控界面的访问的IP和端口
	bind  0.0.0.0:8888
	#访问协议
    mode        http
	#URI相对地址
    stats uri   /dbs
	#统计报告格式
    stats realm     Global\ statistics
	#登陆帐户信息
    stats auth  admin:123456
#数据库负载均衡
listen  proxy-mysql
	#访问的IP和端口
	bind  0.0.0.0:3306
    #网络协议
	mode  tcp
	#负载均衡算法（轮询算法）
	#轮询算法：roundrobin
	#权重算法：static-rr
	#最少连接算法：leastconn
	#请求源IP算法：source
    balance  roundrobin
	#日志格式
    option  tcplog
	#在MySQL中创建一个没有权限的haproxy用户，密码为空。Haproxy使用这个账户对MySQL数据库心跳检测
    option  mysql-check user haproxy
    server  MySQL_1 172.18.0.2:3306 check weight 1 maxconn 2000
    server  MySQL_2 172.18.0.3:3306 check weight 1 maxconn 2000
	server  MySQL_3 172.18.0.4:3306 check weight 1 maxconn 2000
	server  MySQL_4 172.18.0.5:3306 check weight 1 maxconn 2000
	server  MySQL_5 172.18.0.6:3306 check weight 1 maxconn 2000
	#使用keepalive检测死链
    option  tcpka
```

#### 在数据库集群中创建空密码、无权限用户 haproxy，来供 Haproxy 对 MySQL 数据库进行心跳检测

```shell
create user 'haproxy'@'%' identified by '';
```

#### 创建两个 Haproxy 容器

```shell
#创建第1个Haproxy负载均衡服务器
docker run -it -d --restart=always -p 4001:8888 -p 4002:3306 -v /home/soft/haproxy:/usr/local/etc/haproxy --name h1 --privileged --net=net1 --ip 172.18.0.7 haproxy
#进入h1容器，启动Haproxy
docker exec -it h1 bash
haproxy -f /usr/local/etc/haproxy/haproxy.cfg
#创建第2个Haproxy负载均衡服务器
docker run -it -d --restart=always -p 4003:8888 -p 4004:3306 -v /home/soft/haproxy:/usr/local/etc/haproxy --name h2 --privileged --net=net1 --ip 172.18.0.8 haproxy
#进入h2容器，启动Haproxy
docker exec -it h2 bash
haproxy -f /usr/local/etc/haproxy/haproxy.cfg
```

#### 在浏览器中打开 Haproxy 监控界面，端口 4001，在配置文件中定义有用户名 admin，密码 123456。我这边访问的是http://192.168.123.130:4001/dbs，并且要使用用户名密码进行登录

## Keepalived

Docker 中创建两个 Haproxy，并通过 Keepalived 抢占 Docker 内地虚拟 IP

Docker 内的虚拟 IP 不能被外网，所以需要借助宿主机 Keepalived 映射成外网可以访问地虚拟 IP

#### 进入 h1 容器,安装 Keepalived

```shell
docker exec -it h1 bash
apt-get update
apt-get install keepalived
```

#### 编辑 Keepalived 配置文件

```shell
vim /etc/keepalived/keepalived.conf
```

```shell
vrrp_instance  VI_1 {
    state  MASTER # Keepalived的身份（MASTER主服务要抢占IP，BACKUP备服务器不会抢占IP）。
    interface  eth0 # docker网卡设备，虚拟IP所在
    virtual_router_id  51 # 虚拟路由标识，MASTER和BACKUP的虚拟路由标识必须一致。从0～255
    priority  100 # MASTER权重要高于BACKUP数字越大优先级越高
    advert_int  1 # MASTER和BACKUP节点同步检查的时间间隔，单位为秒，主备之间必须一致
    authentication { # 主从服务器验证方式。主备必须使用相同的密码才能正常通信
        auth_type  PASS
        auth_pass  123456
    }
    virtual_ipaddress { # 虚拟IP。可以设置多个虚拟IP地址，每行一个
        172.18.0.201
    }
}
```

#### 启动 Keepalived

```shell
service keepalived start
```

#### 宿主机执行 ping 命令

```shell
ping 172.18.0.201
```

#### 进入 h2 容器,安装 Keepalived

```shell
docker exec -it h2 bash
apt-get update
apt-get install keepalived
```

#### 编辑 Keepalived 配置文件

```shell
vim /etc/keepalived/keepalived.conf
```

```shell
 vrrp_instance  VI_1 {
    state  MASTER
    interface  eth0
    virtual_router_id  51
    priority  100
    advert_int  1
    authentication {
        auth_type  PASS
        auth_pass  123456
    }
    virtual_ipaddress {
        172.18.0.201
    }
}
```

#### 启动 Keepalived

```shell
service keepalived start
```

#### 宿主机执行 ping 命令

```shell
ping 172.18.0.201
```

#### 实现外网访问虚拟 IP

- 宿主机执行安装 Keepalived

```shell
yum install keepalived
```

- 编辑 Keepalived 配置文件

```shell
vi /etc/keepalived/keepalived.conf
```

```shell
 vrrp_instance VI_1 {
    state MASTER
    #这里是宿主机的网卡，可以通过ip a查看当前自己电脑上用的网卡名是哪个
    interface ens33
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        #这里是指定的一个宿主机上的虚拟ip，一定要和宿主机网卡在同一个网段，
        192.168.123.150
    }
}
​
#接受监听数据来源的端口，网页入口使用
virtual_server 192.168.123.150 8888 {
    delay_loop 3
    lb_algo rr
    lb_kind NAT
    persistence_timeout 50
    protocol TCP
​    #把接受到的数据转发给docker服务的网段及端口，由于是发给docker服务，所以和docker服务数据要一致
    real_server 172.18.0.201 8888 {
        weight 1
    }
}
​
#接受数据库数据端口，宿主机数据库端口是3306，所以这里也要和宿主机数据接受端口一致
virtual_server 192.168.123.150 3306 {
    delay_loop 3
    lb_algo rr
    lb_kind NAT
    persistence_timeout 50
    protocol TCP
​    #同理转发数据库给服务的端口和ip要求和docker服务中的数据一致
    real_server 172.18.0.201 3306 {
        weight 1
    }
}
```

- 启动 Keepalived

```shell
service keepalived start
```
