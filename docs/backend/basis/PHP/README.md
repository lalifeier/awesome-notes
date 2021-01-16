---
sidebar: auto
---

## 介绍

#### PHP 是最好的语言

## 环境安装

### 源码安装

- 安装依赖

```shell
yum install gcc gcc-c++ libxml2 libxml2-devel autoconf
```

- 安装 PHP

```shell
wget https://www.php.net/distributions/php-7.2.27.tar.gz
tar -zxvf php-7.2.27.tar.gz
cd php-7.2.27
./configure --prefix=/usr/local/php
make
make install
```

- 环境变量

```shell
vim /etc/profile
#添加以下内容
PATH=$PATH:/usr/local/php/bin
export PATH
#生效配置
source /etc/profile
```

- 设置 PHP.ini

```shell
#查看php.ini目录
php -i | grep php.ini
cp php.ini-development /usr/local/php/lib
cd /usr/local/php/lib/
mv php.ini-development php.ini
```

#### 参考:

- [https://www.php.net/manual/zh/install.unix.php](https://www.php.net/manual/zh/install.unix.php)
- [https://www.php.net/manual/zh/configure.about.php](https://www.php.net/manual/zh/configure.about.php)

### Centos webtatic 源

- 安装 webtatic 源

```shell
yum install epel-release
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

- 删除安装包

```shell
rpm -qa | grep webtatic
rpm -e 上面搜索到的包
```

- 安装 php

```shell
yum install php72w-fpm php72w-opcache
```

- 安装扩展包

```shell
yum install php72w php72w-cli php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-pdo php72w-xml
```

- 启动 php-fpm

```shell
systemctl start php-fpm
```

#### 参考:

- [https://webtatic.com/packages/php72](https://webtatic.com/packages/php72)

### Centos Remi 源

#### 参考:

- [https://rpms.remirepo.net/wizard](https://rpms.remirepo.net/wizard)

### Ubuntu Ondřej Surý 的 PHP PPA 源

- 安装软件源拓展工具

```shell
sudo apt-get install software-properties-common
```

- 添加 Ondřej Surý 的 PHP PPA 源

```shell
sudo add-apt-repository ppa:ondrej/php
```

- 更新软件源缓存

```shell
sudo apt-get update
```

- 安装 PHP

```shell
#sudo apt-get install php5.6
sudo apt-get install php7.2
```

- 安装 PHP 扩展

```shell
#查询对应的模块
sudo apt-cache search php7.2
#安装需要的模块
sudo apt-get install php7.2-common php7.2-dev php7.2-fpm php7.2-xml php7.2-mysql php7.2-mbstring php7.2-curl php7.2-gd php7.2-opcache
```

- 切换 PHP 版本

```shell
sudo update-alternatives --config php
```

- 管理 PHP

```shell
#重启
systemctl restart php7.2-fpm
#启动
systemctl start php7.2-fpm
#关闭
systemctl stop php7.2-fpm
#检查状态
systemctl status php7.2-fpm
```

- 禁用 php5.6-fpm，启用 php7.2-fpm，重启 Apache 服务生效

```shell
sudo a2disconf php5.6-fpm
sudo a2enconf php7.2-fpm
sudo service apache2 restart
```

- 卸载 php5.6

```shell
sudo apt-get purge php5.6
sudo apt-get autoremove
```

### redis

#### webtatic 源安装 redis

```shell
yum -y install php72w-pecl-redis
```

#### 源码安装

- 安装 redis 扩展

```shell
git clone https://github.com/phpredis/phpredis.git
cd phpredis
phpize
#查看php-config目录
find / -name php-config
./configure --with-php-config=/usr/bin/php-config
make && make install
```

- 配置 php.ini
  编译安装成功后，修改`php.ini`加入

```
extension = redis.so
```

#### 参考:

- [https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown](https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown)

### swoole

- 安装 swoole 扩展

```shell
wget https://github.com/swoole/swoole-src/archive/master.tar.gz
tar zxvf master.tar.gz
cd swoole-src-master/
phpize (ubuntu 没有安装phpize可执行命令：sudo apt-get install php-dev来安装phpize)
./configure
make
sudo make install
```

- 配置 php.ini
  编译安装成功后，修改`php.ini`加入

```
extension=swoole.so
```

#### 参考:

- [https://wiki.swoole.com/wiki/page/6.html](https://wiki.swoole.com/wiki/page/6.html)

### Composer

- Composer 安装

```shell
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

- 切换阿里云镜像镜像

```shell
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

#### 参考:

- [https://pkg.phpcomposer.com/#how-to-install-composer](https://pkg.phpcomposer.com/#how-to-install-composer)
