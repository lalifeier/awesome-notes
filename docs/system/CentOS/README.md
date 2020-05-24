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

#### 参考:

- [https://developer.aliyun.com/mirror/centos](https://developer.aliyun.com/mirror/centos)

## 安装软件

- 常用依赖

```shell
yum install gcc glibc-headers gcc-c++
```

- 常用软件

```shell
yum install wget net-tools vim
```

- selinux 关闭

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
firewall-cmd --permanent --remove-service=https
#删除端口
firewall-cmd --permanent --remove-port=8080-8081/tcp

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

## 踩坑

::: warning
shell 脚本执行错误 \$'\r':command not found

存现这种错误是因为 编写的 shell 脚本是在 win 下编写的，每行结尾是\r\n 的 Unix 结果行是\n，所以在 Linux 下运行脚本 会任务\r 是一个字符，所以运行错误，需要把文件转换下
:::

```shell
yum install dos2unix
dos2unix 脚本名
```
