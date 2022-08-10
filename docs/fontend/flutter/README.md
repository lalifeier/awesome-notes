# flutter

## 安装

```shell
# flutter
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

git clone -b stable https://github.com.cnpmjs.org/flutter/flutter.git


# 环境变量
# /usr/local/flutter/bin
# /usr/local/flutter/bin/cache/dart-sdk/bin
# /usr/local/flutter/.pub-cache/bin
export FLUTTER_HOME=/usr/local/flutter
export PATH="$FLUTTER_HOME/bin:$FLUTTER_HOME/bin/cache/dart-sdk/bin:$FLUTTER_HOME/.pub-cache/bin:$PATH"



# 查看是否还有缺失的依赖需要安装
flutter doctor

# https://developer.android.com/studio#downloads
# Android SDK
wget https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz?utm_source=androiddevtools&utm_medium=website -O /opt/android-sdk_r24.4.1-linux.tar
cd /opt
tar -xzvf android-sdk_r24.4.1-linux.tar

export ANDROID_HOME=/opt/android-sdk-linux
export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH

# 直接安装所有的sdk
android update sdk -u
# 显示所有的sdk版本
android list sdk --all
android list sdk --extended --proxy-host mirrors.neusoft.edu.cn --proxy-port 80 -s
选择想要安装的各工具包的编号
android update sdk -u -a -t <package no.>

android update sdk -u -a -t 1,2,3,51,223

# 同意 Android 协议
wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip
unzip commandlinetools-linux-7583922_latest.zip -d /opt/android-sdk-linux/cmdline-tools/latest
sudo mv cmdline-tools /opt/android-sdk-linux/cmdline-tools/latest

flutter doctor --android-licenses
```

## 国内镜像

```shell
# android/build.gradle
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        // google()
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        // google()
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }
}

# /usr/local/flutter/packages/flutter_tools/gradle/flutter.gradle
repositories {
    // google()
    // jcenter()
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
}
```

## fvm

```shell
# Install
brew tap leoafarias/fvm
brew install fvm
# Uninstall
brew uninstall fvm
brew untap leoafarias/fvm
```
