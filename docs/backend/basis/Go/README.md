---
sidebar: auto
---

## 介绍

#### Go

## 环境安装

### 源码安装

- 安装依赖

```shell
yum install gcc gcc-c++ libxml2 libxml2-devel autoconf
```

- 安装 Go

```shell
wget https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz
tar zxvf go1.14.2.linux-amd64.tar.gz -C /usr/local/
```

- 环境变量

```shell
vim /etc/profile
#添加以下内容
export GOROOT=/usr/local/go
export GOPATH=/home/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
#生效配置
source /etc/profile
```

- GO111MODULE

这个环境变量主要是 Go modules 的开关，主要有以下参数：

- auto：只在项目包含了 go.mod 文件时启用 Go modules，在 Go 1.13 中仍然是默认值

- on：启用 Go modules，推荐设置，未来版本中的默认值，让 GOPATH 从此成为历史

- off：禁用 Go modules

#### 参考: [https://github.com/golang/go/issues/31857](https://github.com/golang/go/issues/31857)

```shell
go env -w GO111MODULE=on
```

- GOPROXY

这个环境变量主要是用于设置 Go 模块代理

- 用于使 Go 在后续拉取模块版本时能够脱离传统的 VCS 方式从镜像站点快速拉取

```shell
go env -w GOPROXY=https://goproxy.cn,direct
```

#### 参考:

- [https://golang.org/dl/](https://golang.org/dl/)
- [https://golang.google.cn/dl/](https://golang.google.cn/dl/)