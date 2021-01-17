---
sidebar: auto
---

# Jenkins

## [安装](https://www.jenkins.io/doc/book/installing/)

### Linux

#### CentOS

```shell
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install jenkins java-1.8.0-openjdk-devel
sudo systemctl daemon-reload

# 启动 Jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins

# 放行端口
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --reload
```

#### Debian/Ubuntu

```shell
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

### Docker

```shell
# https://www.jenkins.io/zh/doc/book/installing/#%E5%AE%89%E8%A3%85docker
mkdir -p /home/docker/jenkins/data
cd /home/docker/jenkins
docker run -d --privileged=true --restart=always -u root -p 8080:8080 -p 50000:50000 -v $PWD/data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean

docker logs jenkins
```

### 配置

```shell
#  http://localhost:8080
# 初始解锁密码
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# 镜像地址 https://jenkins-zh.cn/tutorial/management/plugin/update-center/
# 插件管理 -> 高级 -> 升级站点 http://localhost:8080/pluginManager/advanced
# https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

# 更换为清华大学的 Jenkins 插件源
sudo sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' /var/lib/jenkins/updates/default.json && sudo sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' /var/lib/jenkins/updates/default.json

# 配置jenkins SSH
ssh-keygen -C "邮箱" -t rsa
ssh-keygen -C "邮箱" -m PEM -t rsa -b 4096
# 将/root/.ssh/id_rsa.pub的内容到宿主机的.ssh/authorized_keys文件中
ssh-copy-id -i /root/.ssh/id_rsa.pub <username>@<host>
# 将公钥配置到github/gitlab的SSH setting中
cat /root/.ssh/id_rsa.pub

# 配置Publish over SSH
# 首页 -> 系统管理 -> 管理插件 ->可选插件 -> 过滤：ssh -> 选择Publish Over SSH
# Path to key /root/.ssh/id_rsa
# SSH Servers Name  Hostname Username

# 配置node
# 首页 -> 系统管理 -> 管理插件 ->可选插件 -> nodejs -> 选择NodeJS Plugin
# 首页 -> 系统管理 -> 全局工具配置

# vuepress
# 构建 -> 执行shell
# npm install -g yarn
# yarn config set registry https://registry.npm.taobao.org
rm -rf node_modules
yarn
yarn build
cd docs/.vuepress/dist
tar -zcvf dist.tar.gz *
# 构建后操作 -> Send build artifacts over SSH
# Source files
docs/.vuepress/dist/dist.tar.gz
# Remove prefix
docs/.vuepress/dist/
# Remote directory
/home/docker/nginx/html
# Exec command
cd /home/docker/nginx/html
tar -zxvf dist.tar.gz
rm  dist.tar.gz
```
