---
sidebar: auto
---

## 介绍

#### Nginx

## 环境安装

### 安装

- 添加 Centos7 Nginx yum 资源库

```shell
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

- 安装

```shell
yum install nginx
```

- 启动

```shell
systemctl start nginx
```

- 停止

```shell
systemctl stop nginx
```

- 重载

```shell
systemctl reload nginx
```

### Docker 安装 Nginx

#### 拉取镜像

```shell
docker pull nginx:latest
```

#### 运行 Nginx

```shell
mkdir -p /home/docker/nginx/{conf,logs,html}
cd /home/docker/nginx

docker run --name tmp-nginx-container -d nginx
docker cp tmp-nginx-container:/etc/nginx/nginx.conf $PWD/conf/nginx.conf
docker rm -f tmp-nginx-container

docker run -d --privileged=true --restart=always -p 80:80 -p 443:443 -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/logs:/var/log/nginx -v $PWD/html:/usr/share/nginx/html --name nginx nginx:latest
```

## 虚拟主机 /etc/nginx/conf.d
