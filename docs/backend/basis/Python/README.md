---
sidebar: auto
---

## 介绍

#### Python

## 环境安装

### 安装 Python2

```shell
sudo apt install python2
```

### 安装 pip

```shell
# Python2
sudo apt install python-pip
# Python3
sudo apt install python3-pip
#检测是否安装成功
pip --version
pip3 --version
```

### 配置 pip 镜像

```shell
mkdir -p ~/.pip/pip.conf
cd ~/.pip
#编辑内容如下
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

### 管理 Python 版本

```shell
#检查系统已安装的 Python 版本
ls /usr/bin/python*
#检测是否已存在 Python 的配置方案
sudo update-alternatives --list python
#配置python
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 2
#更改默认 Python 版本
sudo update-alternatives --config python
#检查当前 Python 默认版本
python -V
```
