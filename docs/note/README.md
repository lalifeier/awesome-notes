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

- 安装工具 gnome-tweak-tool

```shell
sudo apt-get install gnome-tweak-tool
```

- 安装 gnome 插件

```shell
sudo apt-get install gnome-shell-extensions
sudo apt-get install chrome-gnome-shell
```

在https://extensions.gnome.org/安装插件Dash to Dock 和 NetSpeed

- 安装 GTK 主题

在https://www.gnome-look.org/p/1275087/下载主题文件

```shell
tar -xvf Mojave-dark-20200414114243.tar.xz
sudo mv Mojave-dark /usr/share/themes/
```

打开 gnome-tweak-tool（优化）在主题栏选择下载的主题

- 安装图标
  在https://www.gnome-look.org/p/1305429/下载图标文件

```shell
tar -xvf 01-McMojave-circle-20200415125915.tar.xz
sudo mv McMojave-circle /usr/share/icons
sudo mv McMojave-circle-dark /usr/share/icons
```

打开 gnome-tweak-tool（优化）在图标栏选择下载的图标

- 安装光标
  在https://www.gnome-look.org/p/1355701/下载光标文件

```shell
tar -xvf McMojave-cursors.tar.xz
sudo mv McMojave-cursors /usr/share/icons
```

打开 gnome-tweak-tool（优化）在光标栏选择下载的光标

- 安装 oh-my-zsh 美化终端

```shell
sudo apt-get install zsh
#设切换shell为zsh
sudo chsh -s /bin/zsh
#安装oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

#安装字体
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
./install.sh

cd ..
rm -rf fonts

#安装Powerlevel9k主题
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
ohmyzsh/master/tools/install.sh)
#克隆到本地后，在 ~/.zshrc 中将主题替换成 powerlevel9k
ZSH_THEME="powerlevel9k/powerlevel9k"

#安装插件
#​zsh-autosuggestions(命令自动补全)
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
#​​zsh-syntax-highlighting(命令语法高亮)
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
#autojump(自动跳转)
git clone https://github.com/wting/autojump.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/autojump
cd ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/autojump
./install.py
#[[ -s /home/lalifeier/.autojump/etc/profile.d/autojump.sh ]] && source /home/lalifeier/.autojump/etc/profile.d/autojump.sh
#在 ~/.zshrc 中 plugins=() 中添加上 zsh-autosuggestions，zsh-syntax-highlighting，autojump, 用空格隔开即可
plugins=(git zsh-autosuggestions zsh-syntax-highlighting autojump)

source ~/.zshrc
```

::: warning
/usr/bin/env: “python”: 没有那个文件或目录
:::

```shell
#检查系统已安装的 Python 版本
ls /usr/bin/python*
#检测是否已存在 Python 的配置方案
sudo update-alternatives --list python
#配置python
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
#更改默认 Python 版本
sudo update-alternatives --config python
#检查当前 Python 默认版本
python -V
```

#### 参考: [https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

#### 修改 ~/.zshrc 中的 ZSH_THEME

```shell
#字体设定 (注意，字体设定必须放在主题之前）
#字体模式可选的有：nerdfont-complete awesome-fontconfig awesome-patched
POWERLEVEL9K_MODE='nerdfont-complete'
#主题设定
ZSH_THEME="powerlevel9k/powerlevel9k"
POWERLEVEL9K_CONTEXT_TEMPLATE="%n"
```

#### 参考:

- [https://github.com/Powerlevel9k/powerlevel9k/wiki/Stylizing-Your-Prompt](https://github.com/Powerlevel9k/powerlevel9k/wiki/Stylizing-Your-Prompt)
- [https://github.com/Powerlevel9k/powerlevel9k/wiki/Show-Off-Your-Config](https://github.com/Powerlevel9k/powerlevel9k/wiki/Show-Off-Your-Config)

::: warning
打开终端就变成了 PowerLine 的形式了。由于没有安装相应的字体，导致符号显示不完全
:::

```shell
#安装awesome-terminal-fonts
git clone https://github.com/gabrielelana/awesome-terminal-fonts
cd awesome-terminal-fonts
#将 build/ 目录里的所有文件拷贝到 ~/.fonts/ 目录（没有就创建一个）
cp -R build/* ~/.fonts/
#让 freetype2 知道这些字体
fc-cache -fv ~/.fonts
#自定义 config/10-symbols.conf 配置文件里的字体，改成自己喜欢的。当然不改就是默认的
#拷贝 config/10-symbols.conf 配置文件到 ~/.config/fontconfig/conf.d 目录（没有就创建一个）
cp config/10-symbols.conf ~/.config/fontconfig/conf.d
source ~/.fonts/*.sh
```

::: warning
oh-my-zsh 中文乱码
:::

```shell
vim ~/.zshrc
在文件内容末端添加：

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

source ~/.zshrc
```

- monaco-font 字体美化

```shell
git clone https://github.com/cstrap/monaco-font.git
cd monaco-font
./install-font-ubuntu.sh https://github.com/todylu/monaco.ttf/blob/master/monaco.ttf?raw=true
```

#### 参考: [https://github.com/cstrap/monaco-font](https://github.com/cstrap/monaco-font)

### 工具篇

#### vim

```shell
sudo apt-get install vim
```

#### apt-fast

```shell
sudo add-apt-repository -y ppa:apt-fast/stable && \
sudo apt install -y apt-fast
```

#### gdebi

有时候安装 deb 包不满足依赖还需要手动执行`sudo apt install -f`, 我们可以使用 gdebi 解决这个问题

```shell
sudo apt install gdebi
sudo gdebi xxx.deb
```

#### 系统负载指示器

```shell
sudo apt-get install indicator-multiload
```

#### 搜索神器 albert

#### 参考: [https://albertlauncher.github.io/docs/installing/](https://albertlauncher.github.io/docs/installing/)

```shell
curl https://build.opensuse.org/projects/home:manuelschneid3r/public_key | sudo apt-key add -
sudo sh -c "echo 'deb http://download.opensuse.org/repositories/home:/manuelschneid3r/xUbuntu_20.04/ /' > /etc/apt/sources.list.d/home:manuelschneid3r.list"
sudo apt-get update
sudo apt-get install albert
```

#### preload 根据使用习惯优化软件启动速度

```shell
sudo apt-get install preload
```

#### tlp 优化笔记本电池

```shell
sudo apt-get install tlp tlp-rdw
sudo tlp start
```

#### powertop

```shell
sudo apt-get install powertop
sudo powertop
```

#### 截图

```shell
apt-cache show flameshot
//版本号0.6.0以上
sudo apt install flameshot
//设置 - 键盘快捷键 - 自定义快捷键
flameshot gui
```

### 软件篇

#### 搜狗输入法

```shell
# 在https://pinyin.sogou.com/linux/下载安装包
```

#### Chrome

- 方式一

```shell
sudo wget https://repo.fdzh.org/chrome/google-chrome.list -P /etc/apt/sources.list.d/ && \
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add - && \
sudo apt update && \
sudo apt install google-chrome-stable
```

- 方式二

```shell
# 在https://www.google.cn/chrome/下载安装包
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

#### 安装 uGet 替代迅雷，并在 Chrome 中设置为默认下载器

- uGet

```shell
sudo apt-get install uget
```

- aria2

```shell
sudo apt-get install aria2
```

在 "编辑"-->"设置"-->"插件" 中更改插件匹配顺序为 aria2

- 安装 uget-integrator

```shell
sudo add-apt-repository ppa:uget-team/ppa
sudo apt-get update
sudo apt-get install uget-integrator
```

- Chrome 安装 uGet Integration 插件 https://chrome.google.com/webstore/detail/uget-integration/efjgjleilhflffpbnkaofpmdnajdpepi?hl=zh-CN

添加 uGet 扩展后，谷歌浏览器右上角即可显示 uGet 图标。重启谷歌浏览器，只要点击下载链接，就会自动弹出 uGet 下载界面、自动添加下载任务。

#### 网易云音乐

```shell
# 在https://music.163.com/#/download下载安装包
sudo dpkg -i netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb
```

#### wps

```shell
# 在https://www.google.cn/chrome/下载安装包
sudo dpkg -i wps-office_11.1.0.9505_amd64.deb
```

::: warning
打开 WPS 字体缺失
:::

```shell
#下载相应字体
wget https://lalifeier.github.io/wps_symbol_fonts.zip
sudo unzip wps_symbol_fonts.zip -d /usr/share/fonts
#生成字体的索引信息
sudo mkfontscale
sudo mkfontdir
#运行fc-cache命令更新字体缓存
sudo fc-cache
```

#### VLC 播放器

```shell
sudo apt-get install vlc
```

#### 微信

```shell
#https://github.com/bestwu/docker-wechat
#允许所有用户访问X11服务
#xhost +
docker run -d --name wechat --device /dev/snd \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -v $HOME/WeChatFiles:/WeChatFiles \
    -e DISPLAY=unix$DISPLAY \
    -e XMODIFIERS=@im=ibus \
    -e QT_IM_MODULE=ibus \
    -e GTK_IM_MODULE=ibus \
    -e AUDIO_GID=`getent group audio | cut -d: -f3` \
    -e GID=`id -g` \
    -e UID=`id -u` \
    bestwu/wechat:latest
```

#### qq

```shell
#https://github.com/bestwu/docker-qq
docker run -d --name qq \
  --device /dev/snd \
  -v $HOME/TencentFiles:/TencentFiles \
-v /tmp/.X11-unix:/tmp/.X11-unix \
  -e XMODIFIERS=@im=ibus \
  -e QT_IM_MODULE=ibus \
  -e GTK_IM_MODULE=ibus \
  -e DISPLAY=unix$DISPLAY \
  -e AUDIO_GID=`getent group audio | cut -d: -f3` \
  -e VIDEO_GID=`getent group video | cut -d: -f3` \
  -e GID=`id -g` \
  -e UID=`id -u` \
  bestwu/qq:latest
```

#### Typora

```shell
for Linux
# https://typora.io/#linux
# or run:
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
# add Typora's repository
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update
# install typora
sudo apt-get install typora
```

#### wine-binfmt

```shell
sudo apt-get install wine-binfmt
sudo update-binfmts --import /usr/share/binfmts/wine
```

#### wine

```shell
# https://wiki.winehq.org/Ubuntu
sudo dpkg --add-architecture i386
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
sudo add-apt-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ focal main'
sudo apt update
sudo apt install --install-recommends winehq-stable
wine --version
```

#### electron-ssr

```shell
# https://github.com/qingshuisiyuan/electron-ssr-backup
wget https://github.com/qingshuisiyuan/electron-ssr-backup/releases/download/v0.2.6/electron-ssr-0.2.6.deb
sudo gdebi electron-ssr-0.2.6.de
```

### 开发工具篇

#### jetbrains-toolbox

```shell
# 在https://www.jetbrains.com/toolbox-app/下载安装包
sudo cp jetbrains-toolbox-1.17.6856.tar.gz /opt/
cd /opt
sudo tar -zxvf jetbrains-toolbox-1.17.6856.tar.gz
cd jetbrains-toolbox-1.17.6856
./jetbrains-toolbox
```

#### ide-eval-resetter

```shell
# wget https://lalifeier.github.io/ide-eval-resetter-2.1.8.zip
# https://plugins.zhile.io/files/ide-eval-resetter-2.1.8.zip

# Add "Custom Plugin Repository": https://plugins.zhile.io manually (Settings/Preferences -> Plugins)
# Search and install plugin: IDE Eval Reset
```

#### Visual Studio Code

```shell
# 在https://code.visualstudio.com/下载安装包
sudo dpkg -i code_1.44.2-1587059832_amd64.deb

#gist id：26cd2bab84eb4fccb549cf10bc7eb15d
#token：YWZjNWRhMzdjMzk4NmUyYTQzYzRlMjZlMjVjY2QzNWE5OTk3MmQ5OQ==
```

#### navicat-premium

```shell
# 在https://www.navicat.com.cn/download/navicat-premium下载安装包
mkdir navicat15-premium-cs
sudo mount -o loop navicat15-premium-cs.AppImage navicat15-premium-cs
cp -r navicat15-premium-cs navicat15-premium-cs-patched
sudo umount navicat15-premium-cs
rm -rf navicat15-premium-cs
#编译patcher和keygen
# install capstone
sudo apt-get install libcapstone-dev

# install keystone
sudo apt-get install cmake
git clone https://github.com/keystone-engine/keystone.git
cd keystone
mkdir build
cd build
../make-share.sh
sudo make install
sudo ldconfig

# install rapidjson
sudo apt-get install rapidjson-dev

#编译
wget https://lalifeier.github.io/navicat-keygen.zip
#git clone https://gitee.com/andisolo/navicat-keygen.git
cd navicat-keygen
make all

#使用 navicat-patcher 替换官方公钥
./bin/navicat-patcher ~/navicat15-premium-cs-patched
#将文件重新打包成AppImage
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage
./appimagetool-x86_64.AppImage navicat15-premium-cs-patched navicat15-premium-cs-patched.AppImage
#运行刚生成的AppImage
chmod +x navicat15-premium-cs-patched.AppImage
./navicat15-premium-cs-patched.AppImage

#使用 navicat-keygen 来生成 序列号 和 激活码
./bin/navicat-keygen --text ./RegPrivateKey.pem
#最后的清理
rm navicat15-premium-cs.AppImage
rm -rf navicat15-premium-cs-patched
mv navicat15-premium-cs-patched.AppImage navicat15-premium-cs.AppImage
#创建桌面图标
wget https://lalifeier.github.io/navicat.png

cat > ~/.local/share/applications/navicat.desktop <<EOL
[Desktop Entry]
Encoding=UTF-8
Name=navicat
Exec=/opt/navicat/navicat15-premium-cs.AppImage
Icon=/opt/navicat/navicat.png
Terminal=false
Type=Application
Categories=Internet;
EOL
```

::: warning
fatal error: openssl/opensslv.h: No such file or directory
:::

```shell
#To install OpenSSL development package on Debian, Ubuntu or their derivatives
sudo apt-get install libssl-dev
#To install OpenSSL development package on Fedora, CentOS or RHEL
sudo yum install openssl-devel
```

#### postman

```shell
#https://www.postman.com/downloads/
sudo tar -zxvf Postman-linux-x64-7.29.1.tar.gz -C /opt
#创建桌面图标

cat > ~/.local/share/applications/postman.desktop <<EOL
[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=/opt/Postman/Postman
Icon=/opt/Postman/app/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;
EOL
```

#### studio3t

```shell
#https://studio3t.com/download/
wget https://download.studio3t.com/studio-3t/linux/2020.6.0/studio-3t-linux-x64.tar.gz
tar -zxvf studio-3t-linux-x64.tar.gz
sudo ./studio-3t-linux-x64.sh
#破解
#wget https://lalifeier.github.io/studio_3t_trial.zip
#maven打包
#mvn package
cd /opt/studio3t
sudo wget https://lalifeier.github.io/studio_3t_crack-1.8.jar
#修改Studio-3T.vmoptions文件, 添加-javaagent及jar包路径
sudo vim Studio-3T.vmoptions
-javaagent:/opt/studio3t/studio_3t_crack-1.8.jar
```

#### Redis Desktop Manager

```shell
sudo snap install redis-desktop-manager
```

#### 微信小程序开发工具

```shell
# https://github.com/cytle/wechat_web_devtools
# https://github.com/dragonation/wechat-devtools
```

#### Charles

```shell
# https://www.charlesproxy.com/
# Registered Name: 	https://zhile.io
# License Key: 		48891cf209c6d32bf4

wget -q -O - https://www.charlesproxy.com/packages/apt/PublicKey | sudo apt-key add -
sudo sh -c 'echo deb https://www.charlesproxy.com/packages/apt/ charles-proxy main > /etc/apt/sources.list.d/charles.list'
sudo apt-get update
sudo apt-get install charles-proxy
```

### 优化篇

#### 关掉 sudo 的密码

- 先修改默认编辑器为 vim（默认为 nano）

```shell
sudo update-alternatives --config editor
```

输入 vim 对应的序号回车即可

- 打开 visudo

```shell
sudo visudo
#修改%sudo   ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

#### 统一 Win10 和 Ubuntu20.04 双系统的时间

- 方式一

```shell
timedatectl set-local-rtc 1 --adjust-system-clock
```

- 方式二

```shell
sudo apt-get install ntpdate
sudo ntpdate time.windows.com
sudo hwclock --localtime --systohc
```

#### 笔记本关闭独立显卡

#### 参考: [https://wiki.archlinux.org/index.php/Bumblebee\_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)](<https://wiki.archlinux.org/index.php/Bumblebee_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)

```shell
#更新显卡信息，否则可能识别出错
sudo update-pciids
#查看显卡信息
lspci | grep -i vga
#安装Bumblebee
sudo apt-get install bumblebee bumblebee-nvidia
#重启，测试效果 Nvidia 卡信息的末尾是 rev ff，表示独显已经关闭。
lspci| grep -i vga
#bumblebee的作用是禁用nvidia独立显卡，需要使用独显时，使用”optirun 程序名“手动开启nvidia来运行需要加速的程序，如optirun code
```

::: warning
[ 479.716546][error]Cannot access secondary GPU - error: [XORG](EE) Failed to load module "nvidia" (module does not exist, 0)

[ 479.716585][error]Aborting because fallback start is disabled.
:::

```shell

```

#### 加快开机启动时间

```shell
systemd-analyze blame
#开机动画，用 mask 干掉 （要恢复使用 unmask）
sudo systemctl mask plymouth-quit-wait.service
sudo systemctl disable NetworkManager-wait-online.service
```

#### 清理 Ubuntu

```shell
sudo apt-get clean
sudo apt-get autoremove
```

#### 修改 DNS

```shell
#sudo gedit  /etc/systemd/resolved.conf
#将DNS前的#号去掉，然后加上DNS服务器地址8.8.8.8
#DNS=8.8.8.8
```

### 提高逼格篇

#### screenfetch

```shell
sudo apt-get install screenfetch
```

#### 终端高逼格屏保

```shell
sudo apt-get install cmatrix
cmatrix -b
```
