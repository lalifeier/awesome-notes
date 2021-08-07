---
sidebar: auto
---

# 介绍

#### Nginx

## 安装

### 源码安装

```shell
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel

wget https://nginx.org/download/nginx-1.20.1.tar.gz
tar -xvf nginx-1.20.1.tar.gz
cd  nginx-1.20.1
./configure --prefix=/usr/local/nginx
# sudo apt-get install -y libgd-dev
# ./configure --prefix=/etc/nginx --with-http_image_filter_module
make
make install

# 创建软连接
ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx

# 创建nginx.service服务文件
# vim /lib/systemd/system/nginx.service
[Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### Centos7

- 添加 Centos7 Nginx yum 资源库

```shell
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

- 安装

```shell
yum install nginx
```

- 启动

```shell
systemctl start nginx
```

- 停止

```shell
systemctl stop nginx
```

- 重载

```shell
systemctl reload nginx
```

### Docker

#### 拉取镜像

```shell
docker pull nginx:latest
```

#### 运行 Nginx

```shell
mkdir -p /home/docker/nginx/{conf,logs,html}
cd /home/docker/nginx

docker run --name tmp-nginx-container -d nginx
docker cp tmp-nginx-container:/etc/nginx/nginx.conf $PWD/conf/nginx.conf
docker cp tmp-nginx-container:/etc/nginx/conf.d $PWD/conf/conf.d
docker rm -f tmp-nginx-container

docker run -d --privileged=true --restart=always -p 80:80 -p 443:443 -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/conf/conf.d:/etc/nginx/conf.d -v $PWD/logs:/var/log/nginx -v $PWD/html:/usr/share/nginx/html --name nginx nginx:latest
```

## 常用命令

```shell
# 立刻停止服务
nginx -s stop
# 优雅的停止服务
nginx -s quit
# 重载配置文件
nginx -s reload
# 重新开始记录日志信息
nginx -s reopen
# 测试配置文件是否有语法错误
nginx -t
nginx -T
# nginx版本信息
nginx -v
# nginx编译信息
nginx -V
# 使用指定的配置文件
nginx -c
# 指定配置指令
nginx -g
# 指定运行目录
nginx -p
```

```shell
systemctl start nginx    # 启动 Nginx
systemctl stop nginx     # 停止 Nginx
systemctl restart nginx  # 重启 Nginx
systemctl reload nginx   # 重新加载 Nginx，用于修改配置后
systemctl enable nginx   # 设置开机启动 Nginx
systemctl disable nginx  # 关闭开机启动 Nginx
systemctl status nginx   # 查看 Nginx 运行状态
```

## 热部署

```shell
# 备份旧版本的 nginx 二进制文件
mv /usr/local/nginx/sbin/nginx  /usr/local/nginx/sbin/nginx.old
# 替换旧的 nginx 的执行程序
cp -r /usr/local/nginx-1.20.1/objs/nginx /usr/local/nginx/sbin/ -f
ps -ef | grep nginx
# 发送 USR2 信号给旧版本主进程号,使 nginx 的旧版本停止接收请求，用 nginx 新版本接替
kill -USR2 [PID]
# 发送 WINCH 信号到旧的主进程，它会通知旧的 worker 进程优雅的关闭，然后退出
kill -WINCH [PID]
# 发送 QUIT 信号到旧的主进程，它会退出保留的 master 进程
kill -QUIT [PID]
```

## 日志切割

```shell
# 备份原日志
mv error.log old_error.log
# 日志切割
/usr/local/nginx/sbin/nginx -s reopen

# 脚本
#!/bin/bash
LOGS_PATH=/usr/local/nginx/logs/history
CUR_LOGS_PATH=/usr/local/nginx/logs
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
mv ${CUR_LOGS_PATH}/access.log ${LOGS_PATH}/old_access_${YESTERDAY}.log
mv ${CUR_LOGS_PATH}/error.log ${LOGS_PATH}/old_error_${YESTERDAY}.log
## 向 NGINX 主进程发送 USR1 信号。USR1 信号是重新打开日志文件
kill -USR1 $(cat /usr/local/nginx/logs/nginx.pid)
```

## 静态资源 Web 服务器

```shell


server {
    listen 80;
    server_name localhost;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log   logs/access.log  main;

    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    location / {
      # https://nginx.org/en/docs/http/ngx_http_core_module.html#alias
      alias /usr/share/nginx/html

      # http://nginx.org/en/docs/http/ngx_http_autoindex_module.html
      # autoindex on;

      # https://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate
      set $limit_rate 4k;
    }
}

```

## 反向代理 缓存

```shell
proxy_cache_path /tmp/nginx/proxy_cache levels=1:2 keys_zone=cache_zone:10m max_size=50g inactive=7d use_temp_path=off;


upstream local {
  server 127.0.0.1:8080
}

server {
    listen 80;
    server_name localhost;

    location / {
      proxy_set_header   Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      proxy_pass http://local;

      proxy_buffering on;
      proxy_cache cache_zone;
      proxy_cache_bypass $http_pragma $http_authorization;
      proxy_cache_key $uri$is_args$args;
      proxy_cache_valid 200 304 301 302 7d;
      proxy_cache_valid 404 1m;
      proxy_cache_valid any 5m;
      proxy_cache_lock on;
      proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
      proxy_cache_revalidate on;
    }
}

```

### GoAccess 可视化实时监控 access 日志

```shell
# 安装
apt-get install goaccess

# https://goaccess.io/get-started

# Terminal Output
goaccess access.log -c

# Static HTML Output
goaccess access.log -o report.html --log-format=COMBINED

# Real-Time HTML Output
goaccess access.log -o /var/www/html/report.html --log-format=COMBINED --real-time-html
```

## 最佳实践

```conf
worker_processes 16;

events {
  use epoll;
  worker_connections 10240;
}

http {
  include mime.types;
  default_type application/octet-stream;
  sendfile on;
  keepalive_timeout 65;

  # 不发送Nginx版本号
  server_tokens off;

  # 不允许浏览器在frame或iframe中显示页面
  add_header X-Frame-Options SAMEORIGIN;

  # 禁用某些浏览器的 content-type 探测
  add_header X-Content-Type-Options nosniff;

  # 启用大部分现代浏览器内置的 the Cross-site scripting (XSS) 过滤
  add_header X-XSS-Protection "1; mode=block";

  # 启用 Content Security Policy (CSP)
  # add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log logs/access.log main;

  # 开启gzip
  gzip on;
  gzip_min_length 1k;
  gzip_comp_level 9;
  gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
  gzip_vary on;
  gzip_disable "MSIE [1-6]\.";


  # upstream backend {
  #   server 127.0.0.1:8081 weight=1;
  #   server 127.0.0.1:8082 weight=2;
  #   server 127.0.0.1:8083 weight=3;
  # }
  proxy_cache_path /tmp/nginx/proxy_cache levels=1:2 keys_zone=cache_zone:10m max_size=50g inactive=7d use_temp_path=off;

  server {
    listen 80;
    server_name localhost;

    root /var/www/app;

    # HTTP 请求转发到 HTTPS
    # if ($scheme != 'https') {
    #     return 301 https://$host$request_uri;
    # }
    location / {
      if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';

        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';

        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        add_header 'Content-Length' 0;
        return 204;
      }
      if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
      }
      if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
      }


      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      # IP访问限制
      # allow 127.0.0.1;
      # deny all;

      # proxy_pass http://backend;
    }

    # 图片防盗链
    # location ~* \.(jpg|jpeg|gif|png|svg|webp)$ {
    #   valid_referers none blocked 127.0.0.1;
    #   if ($invalid_referer) {
    #     return 403;
    #   }
    # }

    location ~* /(.*\.(jpg|jpeg|gif|png|svg|webp))$ {
      add_header X-Pownered "nginx_image_filter";
      add_header X-Cache-Status $upstream_cache_status;

      set $image_path $1;
      set $width -;
      set $height -;
      if ( $arg_width != "" ) {
        set $width $arg_width;
      }
      if ( $arg_height != "" ) {
        set $height $arg_height;
      }

      set $image_uri image-resize/$image_path?width=$width&height=$height;
      proxy_pass http://127.0.0.1:8888/$image_uri;

      proxy_buffering on;
      proxy_cache cache_zone;
      proxy_cache_bypass $http_pragma $http_authorization;
      proxy_cache_key $uri$is_args$args;
      proxy_cache_valid 200 304 301 302 7d;
      proxy_cache_valid 404 1m;
      proxy_cache_valid any 5m;
      proxy_cache_lock on;
      proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
      proxy_cache_revalidate on;
    }

    # 主动清理缓存
    # location /purge(/.*) {
    #   allow 127.0.0.0/8;
    #   deny all;
    #   proxy_cache_purge cache_zone $host$1;
    # }
  }

  server {
    listen 8888;
    server_name localhost;
    access_log off;

    root /var/www/app;

    location /image-resize {
      rewrite /(image-resize)/(.*) /$2 break;

      image_filter resize $arg_width $arg_height;
      image_filter_jpeg_quality 75;
      image_filter_buffer 20M;
      image_filter_interlace on;

      allow 127.0.0.0/8;
      deny all;
    }

    location /image-crop {
      rewrite /(image-crop)/(.*) /$2 break;

      image_filter crop $arg_width $arg_height;
      image_filter_jpeg_quality 75;
      image_filter_buffer 20M;
      image_filter_interlace on;

      allow 127.0.0.0/8;
      deny all;
    }
  }


  # include /usr/local/nginx/conf/conf.d/*.conf;
}
```

## Let’s Encrypt SSL/TLS

```shell
# Download the Let’s Encrypt Client
apt-get update
sudo apt-get install certbot
apt-get install python-certbot-nginx

# Set Up NGINX
# /etc/nginx/conf.d/domain‑name.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    server_name example.com www.example.com;
}

nginx -t && nginx -s reload

# Obtain the SSL/TLS Certificate
sudo certbot --nginx -d example.com -d www.example.com

#  domain‑name.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    server_name  example.com www.example.com;

    listen 443 ssl; # managed by Certbot

    # RSA certificate
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot

    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot

    # Redirect non-https traffic to https
    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    } # managed by Certbot
}

# Automatically Renew Let’s Encrypt Certificates
crontab -e
0 12 * * * /usr/bin/certbot renew --quiet
```
