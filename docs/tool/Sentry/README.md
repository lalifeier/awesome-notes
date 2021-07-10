---
sidebar: auto
---

# Sentry

## 安装

```shell
git clone https://github.com/getsentry/onpremise.git
cd onpremise
./install.sh

# http://localhost:9000
docker-compose up -d
```

## 升级

```shell
docker-compose run --rm web upgrade
```

## 配置

### 主要配置文件

- onpremise/.env
- onpremise/sentry/config.yml
- onpremise/sentry/sentry.conf.py

### 修改数据库配置

```shell
# 修改sentry.conf.py DATABASES
```

## 磁盘占用过大的问题

### 修改 docker 数据存储位置

```shell
# 在容量最大的目录下创建文件夹
mkdir -p /data/var/lib/
# 停止 docker 服务
systemctl stop docker
# 将 docker 的默认数据复制到新路径下，删除旧数据并创建软连接，即使得存储实际占用磁盘为新路径
/bin/cp -a /var/lib/docker /data/var/lib/docker && rm -rf /var/lib/docker &&  ln -s /data/var/lib/docker /var/lib/docker
# 重启 docker 服务
systemctl start docker
```

### 修改数据保留时长

```shell
vim .env
# 控制磁盘占用
SENTRY_EVENT_RETENTION_DAYS=7
```
