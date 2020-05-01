---
sidebar: auto
---

## 介绍

#### Node

## 环境安装

### 使用 nvm 安装

参考: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- 安装 nvm

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

- 配置环境变量

```shell
vim ~/.zshrc
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# 配置国内镜像
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

source ~/.zshrc
```

- 安装最新稳定版 node

```shell
nvm install stable
```

### 配置 npm 镜像

```shell
npm config set registry https://registry.npm.taobao.org
# 查看
npm config get registry
```
