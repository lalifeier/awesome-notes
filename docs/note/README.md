---
sidebar: auto
---

## 玩转 Ubuntu 20.04 LTS

### 安装篇

#### 解决显卡驱动问题

一般遇到的卡死、黑屏之类的问题都是英伟达开源显卡驱动的问题

- 开机，进入 grub 画面

- 光标选定"install Ubuntu"，按"e" 进入编辑开机指令的模式, 找到 `quiet splash ---`替换为`nomodeset`。修改完按 F10 重启。安装完成后，您将必须重启系统

- 进入 grub 画面，再次按"e"，找到`linux`开头的行，添加`nouveau.modeset=0`在该行的结尾处。按 F10 重启

* 安装 Nvidia 显卡驱动

#### 参考: [https://ubuntuforums.org/showthread.php?t=2349782](https://ubuntuforums.org/showthread.php?t=2349782)

### 美化篇

### 软件篇

### 优化篇
