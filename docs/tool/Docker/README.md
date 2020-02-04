---
sidebar: auto
---

## 介绍
#### Docker

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
- 更新并安装Docker-CE
```shell
yum makecache fast
yum install docker-ce
```                 
- 启动
```shell
systemctl start docker
```
- 建立docker用户组
```shell
groupadd docker
usermod -aG docker your-user
```
#### 参考:
- [https://developer.aliyun.com/mirror/docker-ce](https://developer.aliyun.com/mirror/docker-ce)

### 脚本自动安装
```shell
curl -sSL https://get.daocloud.io/docker | sh
sudo sh get-docker.sh --mirror Aliyun
```
#### 参考:
- [https://get.daocloud.io/](https://get.daocloud.io/)

### 镜像
```shell
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

#### 参考:
- [https://www.daocloud.io/mirror#accelerator-doc](https://www.daocloud.io/mirror#accelerator-doc)