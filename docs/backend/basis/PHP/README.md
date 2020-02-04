---
sidebar: auto
---

## 介绍
#### PHP是最好的语言

## 环境安装
### 源码安装
- 安装依赖
```shell
yum install gcc gcc-c++ libxml2 libxml2-devel autoconf
```
- 安装PHP
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
- 设置PHP.ini
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

### Centos webtatic源 
- 安装webtatic源
```shell
yum install epel-release
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```
- 删除安装包
```shell
rpm -qa | grep webtatic
rpm -e 上面搜索到的包
```
- 安装php
```shell
yum install php72w-fpm php72w-opcache
```
- 安装扩展包
```shell
yum install php72w php72w-cli php72w-common php72w-devel php72w-embedded php72w-gd php72w-mbstring php72w-mysqlnd php72w-pdo php72w-xml
```
- 启动php-fpm
```shell
systemctl start php-fpm
```

#### 参考:
- [https://webtatic.com/packages/php72](https://webtatic.com/packages/php72)

### Centos Remi源 
#### 参考:
- [https://rpms.remirepo.net/wizard](https://rpms.remirepo.net/wizard)

### redis
#### webtatic源安装redis
```shell
yum -y install php72w-pecl-redis
```
#### 源码安装
- 安装redis扩展
```shell
git clone https://github.com/phpredis/phpredis.git
cd phpredis
phpize
#查看php-config目录
find / -name php-config
./configure --with-php-config=/usr/bin/php-config
make && make install
```
- 配置php.ini
编译安装成功后，修改```php.ini```加入
```
extension = redis.so
```
#### 参考:
- [https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown](https://github.com/phpredis/phpredis/blob/develop/INSTALL.markdown)

### swoole
- 安装swoole扩展
```shell
wget https://github.com/swoole/swoole-src/archive/master.tar.gz
tar zxvf master.tar.gz
cd swoole-src-master/
phpize (ubuntu 没有安装phpize可执行命令：sudo apt-get install php-dev来安装phpize)
./configure
make 
sudo make install
```
- 配置php.ini
编译安装成功后，修改```php.ini```加入
```
extension=swoole.so
```
#### 参考:
- [https://wiki.swoole.com/wiki/page/6.html](https://wiki.swoole.com/wiki/page/6.html)

### Composer
- Composer安装
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








<Vssue title="Vssue Demo" />