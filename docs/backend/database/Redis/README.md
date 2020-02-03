---
sidebar: auto
---

## 介绍
#### Redis

## 环境安装
### Centos EPEL仓库安装
- 安装redis
```shell
yum install epel-release
yum update
yum install redis
```
- 启动
```shell
systemctl start redis
```
### 源码安装
- 安装基础依赖
```shell
yum install gcc
```
- 下载安装包
```shell
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```
- 解压到指定目录
```
tar -zvxf redis-5.0.7.tar.gz
mv ./redis-5.0.7 /usr/local/redis
cd /usr/local/redis/
```
- 编译
```shell
make
```
::: warning
出现报错 zmalloc.h:50:31: fatal error: jemalloc/jemalloc.h: No such file or directory
:::
```shell
make MALLOC=libc  
```
- 安装
```shell
make install
```
- 安装完成
```shell
cd cd /usr/local/bin/
ls -all
```
- 配置⽂件，移动到/etc/⽬录下
```
mkdir /etc/redis
cp /usr/local/redis/redis.conf /etc/redis/
```
### Redis配置
```
vim /etc/redis.conf
```
- 允许远程访问
```
bind 127.0.0.1
修改为
#bind 127.0.0.1
```
- 开放端口
```
firewall-cmd --add-port=6379/tcp --permanent
#重新加载防火墙设置
firewall-cmd --reload
```
- 设置密码
```
# requirepass foobared
修改为
requirepass password(需要设置的密码)
```
- 进程在后台运行
```
daemonize no
修改为
daemonize yes
```
- 日志输出文件等信息
```
logfile ""
修改为指定的日志文件
logfile "/var/log/redis/6379.log"
```

### Redis开机启动
```
cat > /usr/lib/systemd/system/redis.service <<-EOF
[Unit]
Description=Redis persistent key-value database
After=network.target
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf --supervised systemd
ExecStop=/usr/local/bin/redis-cli shutdown
Type=notify
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF
# 使服务自动运行
systemctl daemon-reload
systemctl enable redis
# 启动服务
systemctl restart redis
systemctl status redis
```

