---
sidebar: auto
---

## 介绍
#### Git


## 环境安装
### Git安装
```shell
yum install git
```

### Git命令自动补全
- 下载源码
```shell
git clone https://github.com/git/git.git
```
- 复制git-completion.bash文件
```shell
cd git
cp contrib/completion/git-completion.bash /etc/bash_completion.d/
```
- 加载bash脚本
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
无法使用自动补全，下载对应git版本git-completion.bash文件
:::
```shell
curl https://raw.githubusercontent.com/git/git/v1.8.3.1/contrib/completion/git-completion.bash -o /etc/bash_completion.d/git-completion.bash
```