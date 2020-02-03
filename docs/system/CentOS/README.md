---
sidebar: auto
---

## 介绍
#### Centos

## 替换默认源
- 备份
```shell
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
- 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/
```shell
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```
- 生成缓存
```shell
yum makecache
```

## 安装软件
- 常用依赖
```shell
yum install gcc glibc-headers gcc-c++
```
- 常用软件
```shell
yum install wget net-tools vim
```
- selinux关闭
```shell
#临时修改selinux
setenforce 0
#关闭selinux 修改为SELINUX=disable
vim /etc/selinux/config
```

## 防火墙
```shell
#安装
yum install firewalld
#启动
systemctl start firewalld
#停止
systemctl stop firewalld
#检查状态
systemctl status firewalld
#自启动
systemctl enable firewalld
#禁止自启动
systemctl disable firewalld

#开启服务
firewall-cmd --permanent --zone=public --add-service=https 
#开启端口
firewall-cmd --permanent --zone=public --add-port=8080-8081/tcp 
#删除服务
firewall-cmd --remove-service=https
#删除端口
firewall-cmd --remove-port=8080-8081/tcp

#查询服务的启动状态
firewall-cmd --query-service ssh
#加入端口
firewall-cmd --add-port=8080/tcp
#更新防火墙规则
firewall-cmd --reload 

#查看开启的端口
firewall-cmd --list-ports
#查看开启的服务
firewall-cmd --list-services
```