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

- 卸载 nvm

```shell
rm -rf "$NVM_DIR"
#删除~/.bashrc中以下内容
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[[ -r $NVM_DIR/bash_completion ]] && \. $NVM_DIR/bash_completion
```

- 配置环境变量

```shell
vim ~/.zshrc
# 配置国内镜像
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

source ~/.zshrc
```

- 安装最新稳定版 node

```shell
nvm install stable
```

::: warning
sudo: nvm: command not found
:::

```shell
#方法一
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
#方法二
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
```

### 配置 npm 镜像

```shell
npm config set registry https://registry.npm.taobao.org
# 查看
npm config get registry
```

### NRM

```shell
#安装
npm install -g nrm
#查看可选源
nrm ls
#切换到taobao源
nrm use taobao
#查看源响应时间
nrm test npm
#增加定制源
nrm add 源名称 源网址
#删除源
nrm del 源名称
```
