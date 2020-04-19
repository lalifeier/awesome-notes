---
sidebar: auto
---

## 介绍

#### Ubuntu

## 替换默认源

- 备份

```shell
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

- 编辑文件 sources.list

```shell
vi /etc/apt/sources.list
```

```shell
deb http://mirrors.163.com/ubuntu/ wily main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ wily-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ wily-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ wily-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ wily-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ wily main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ wily-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ wily-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ wily-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ wily-backports main restricted universe multiverse
```

- 清除原先的配置并更新

```shell
apt-get clean
apt-get update
apt-get upgrade
```

#### 参考:

- [https://mirrors.163.com/.help/ubuntu.html](https://mirrors.163.com/.help/ubuntu.html)

- [https://developer.aliyun.com/mirror/ubuntu](https://developer.aliyun.com/mirror/ubuntu)

## 安装软件

- 常用依赖

* 常用软件

## 防火墙
