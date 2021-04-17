---
sidebar: auto
---

## 介绍

#### Git

## 环境安装

### Git 安装

```shell
yum install git
```

### 配置 Git 环境

```
vim ~/.gitconfig

git config --global user.name "lalifeier"
git config --global user.email "lalifeier@gmail.com"

git config --global github.user lalifeier
git config --global github.token "token"


git config --global --add url."git@github.com:".insteadOf "https://github.com/"

git config --global --add url."git@gitlab.com:".insteadOf "https://gitlab.com/"
```

### 生成 ssh 密钥

```
ssh-keygen -C "邮箱" -t rsa
```

### 登录 GitHub 生成的公钥

```
cd ~/.ssh
cat id_rsa.pub
```

### 测试连接

```
ssh -T git@github.com
```

### Git 命令自动补全

- 下载源码

```shell
git clone https://github.com/git/git.git
```

- 复制 git-completion.bash 文件

```shell
cd git
cp contrib/completion/git-completion.bash /etc/bash_completion.d/
```

- 加载 bash 脚本

```shell
source /etc/bash_completion.d/git-completion.bash
```

- 自动加载脚本，编辑.bash_profile

```shell
vim ~/.bash_profile
```

- 在文件结尾处添加如下代码

```shell
if [ -f /etc/bash_completion.d/git-completion.bash ]; then
  source /etc/bash_completion.d/git-completion.bash
fi
```

::: warning
无法使用自动补全，下载对应 git 版本 git-completion.bash 文件
:::

```shell
curl https://raw.githubusercontent.com/git/git/v1.8.3.1/contrib/completion/git-completion.bash -o /etc/bash_completion.d/git-completion.bash
```

## GitHub Pages

### 手动推送更新

#### 在项目目录下创建 deploy.sh 文件

```sh
#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
# npm run build

npm install -g yarn
yarn build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# git push -f git@github.com:lalifeier/admin-pro.git master:gh-pages

cd -
```

### Travis CI

```shell
# 安装 Travis CLI 客户端
gem install travis && travis --login
# 生成一个拥有“repo”权限的 GitHub 访问令牌
# 授予 Travis 访问仓库的权限
travis set GITHUB_TOKEN=xxx
```

#### 在项目目录下创建 .travis.yml 文件

```yml
branches:
  only:
    - master

language: node_js
node_js:
  - lts/*

install:
  - yarn --frozen-lockfile
script:
  - yarn build
cache: yarn

deploy:
provider: pages
local_dir: dist
github_token: $GITHUB_TOKEN
skip_cleanup: true
keep-history: true

notifications:
  email:
    - lalifeier@gmail.com
  on_success: change
  on_failure: always
```
