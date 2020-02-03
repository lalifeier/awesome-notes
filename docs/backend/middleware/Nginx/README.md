---
sidebar: auto
---

## 介绍
#### Nginx

## 环境安装
### 安装
- 添加Centos7 Nginx yum 资源库
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
## 虚拟主机 /etc/nginx/conf.d
