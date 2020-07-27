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
#在 ~/.zshrc 中 plugins=() 中添加上 zsh-autosuggestions，zsh-syntax-highlighting，autojump, 用空格隔开即可
plugins=(git zsh-autosuggestions zsh-syntax-highlighting autojump)

source ~/.zshrc
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

#### Visual Studio Code

```shell
# 在https://code.visualstudio.com/下载安装包
sudo dpkg -i code_1.44.2-1587059832_amd64.deb

#gist id：f6bf07af17c8f782037d85c32b8ecfa0
#token：OTlhZmE0NjRiYWQyZDM3ZjZkNWJjYzlkMzIwMzI1YWJkMWJmOGI1NiA=
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
