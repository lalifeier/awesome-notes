---
sidebar: auto
---

## 介绍

#### Java

## 环境安装

### 安装

#### 参考：

- [https://www.oracle.com/java/technologies/oracle-java-archive-downloads.html](https://www.oracle.com/java/technologies/oracle-java-archive-downloads.html)

- [https://lv.binarybabel.org/catalog/java/jdk8](https://lv.binarybabel.org/catalog/java/jdk8)

```shell
#查看是否自带jdk
java -version
rpm -qa | grep java
#卸载
rpm -e --nodeps 要卸载的包

#下载
mkdir /usr/local/java/
cd /usr/local/java

#wget --no-check-certificate --no-cookies --header 'Cookie: oraclelicense=accept-securebackup-cookie' 'http://download.oracle.com/otn-pub/java/jdk/8u251-b08/3d5a2bb8f8d4428bbe94aed7ec7ae784/jdk-8u251-linux-x64.tar.gz'

tar -zxvf jdk-8u211-linux-x64.tar.gz

#环境变量
vim /etc/profile
#添加以下内容
export JAVA_HOME=/usr/local/java/jdk1.8.0_211
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin
#生效配置
source /etc/profile
#添加软链接
#ln -s /usr/local/java/jdk1.8.0_211/bin/java /usr/bin/java
#检查
java -version
```

### Maven

#### 参考：

- [http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)

```shell
#下载
wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
tar -zxvf apache-maven-3.6.3-bin.tar.gz
mv apache-maven-3.6.3 /usr/local/
#配置环境变量
vim /etc/profile
#添加以下内容
export MAVEN_HOME=/usr/local/apache-maven-3.6.3
export PATH=$PATH:$MAVEN_HOME/bin
#生效配置
source /etc/profile
#检查
mvn -version
```

### Maven 配置

- 自定义本地仓库路径

```shell
vim /usr/local/apache-maven-3.6.3/conf/settings.xml
#修改localRepository
<localRepository>/usr/local/apache-maven-3.6.3/repo</localRepository>
```

- 配置 Maven 的镜像仓库源

```shell
vim /usr/local/apache-maven-3.6.3/conf/settings.xml
#在<mirrors></mirrors>标签中添加 mirror 子节点
<mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>*</mirrorOf>
      <name>Nexus aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

### Tomcat

- [https://tomcat.apache.org/download-90.cgi](https://tomcat.apache.org/download-90.cgi)

```shell
#下载
wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-9/v9.0.35/bin/apache-tomcat-9.0.35.tar.gz
tar -zxvf apache-tomcat-9.0.35.tar.gz
mv apache-tomcat-9.0.35 /usr/local/

vim /etc/systemd/system/tomcat.service

[Unit]
Description=tomcat
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=oneshot
Environment='JAVA_HOME=/usr/local/java/jdk1.8.0_211'
Environment='JRE_HOME=/usr/local/java/jdk1.8.0_211/jre'
ExecStart=/usr/local/apache-tomcat-9.0.35/bin/startup.sh
ExecStop=/usr/local/apache-tomcat-9.0.35/bin/shutdown.sh
ExecReload=/bin/kill -s HUP $MAINPID
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```
