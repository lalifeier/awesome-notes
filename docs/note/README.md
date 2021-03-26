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
# Aria2 配置说明
# http://aria2c.com/usage.html
# https://github.com/P3TERX/aria2.conf
# https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best.txt
sudo apt-get install aria2

sudo mkdir /etc/.aria2
sudo touch /etc/.aria2/aria2.session
sudo chmod 777 /etc/.aria2/aria2.session
sudo vim /etc/.aria2/aria2.conf

sudo aria2c --conf-path=/etc/.aria2/aria2.conf -D
```

```conf
; aria2.conf
## 文件保存设置 ##

# 下载目录。可使用绝对路径或相对路径, 默认: 当前启动位置
dir=/home/lalifeier/下载

# 磁盘缓存, 0 为禁用缓存，默认:16M
# 磁盘缓存的作用是把下载的数据块临时存储在内存中，然后集中写入硬盘，以减少磁盘 I/O ，提升读写性能，延长硬盘寿命。
# 建议在有足够的内存空闲情况下适当增加，但不要超过剩余可用内存空间大小。
# 此项值仅决定上限，实际对内存的占用取决于网速(带宽)和设备性能等其它因素。
disk-cache=64M

# 文件预分配方式, 可选：none, prealloc, trunc, falloc, 默认:prealloc
# 预分配对于机械硬盘可有效降低磁盘碎片、提升磁盘读写性能、延长磁盘寿命。
# 机械硬盘使用 ext4（具有扩展支持），btrfs，xfs 或 NTFS（仅 MinGW 编译版本）等文件系统建议设置为 falloc
# 若无法下载，提示 fallocate failed.cause：Operation not supported 则说明不支持，请设置为 none
# prealloc 分配速度慢, trunc 无实际作用，不推荐使用。
# 固态硬盘不需要预分配，只建议设置为 none ，否则可能会导致双倍文件大小的数据写入，从而影响寿命。
file-allocation=none

# 文件预分配大小限制。小于此选项值大小的文件不预分配空间，单位 K 或 M，默认：5M
no-file-allocation-limit=64M

# 断点续传
continue=true

# 始终尝试断点续传，无法断点续传则终止下载，默认：true
always-resume=false

# 不支持断点续传的 URI 数值，当 always-resume=false 时生效。
# 达到这个数值从将头开始下载，值为 0 时所有 URI 不支持断点续传时才从头开始下载。
max-resume-failure-tries=0

# 获取服务器文件时间，默认:false
remote-time=true


## 进度保存设置 ##

# 从会话文件中读取下载任务
input-file=/etc/.aria2/aria2.session

# 会话文件保存路径
# Aria2 退出时或指定的时间间隔会保存`错误/未完成`的下载任务到会话文件
save-session=/etc/.aria2/aria2.session

# 任务状态改变后保存会话的间隔时间（秒）, 0 为仅在进程正常退出时保存, 默认:0
# 为了及时保存任务状态、防止任务丢失，此项值只建议设置为 1
save-session-interval=1

# 自动保存任务进度到控制文件(*.aria2)的间隔时间（秒），0 为仅在进程正常退出时保存，默认：60
# 此项值也会间接影响从内存中把缓存的数据写入磁盘的频率
# 想降低磁盘 IOPS (每秒读写次数)则提高间隔时间
# 想在意外非正常退出时尽量保存更多的下载进度则降低间隔时间
# 非正常退出：进程崩溃、系统崩溃、SIGKILL 信号、设备断电等
auto-save-interval=20

# 强制保存，即使任务已完成也保存信息到会话文件, 默认:false
# 开启后会在任务完成后保留 .aria2 文件，文件被移除且任务存在的情况下重启后会重新下载。
# 关闭后已完成的任务列表会在重启后清空。
force-save=false


## 下载连接设置 ##

# 文件未找到重试次数，默认:0 (禁用)
# 重试时同时会记录重试次数，所以也需要设置 max-tries 这个选项
max-file-not-found=10

# 最大尝试次数，0 表示无限，默认:5
max-tries=0

# 重试等待时间（秒）, 默认:0 (禁用)
retry-wait=10

# 连接超时时间（秒）。默认：60
connect-timeout=10

# 超时时间（秒）。默认：60
timeout=10

# 最大同时下载任务数, 运行时可修改, 默认:5
max-concurrent-downloads=5

# 单服务器最大连接线程数, 任务添加时可指定, 默认:1
# 最大值为 16 (增强版无限制), 且受限于单任务最大连接线程数(split)所设定的值。
max-connection-per-server=16

# 单任务最大连接线程数, 任务添加时可指定, 默认:5
split=128

# 文件最小分段大小, 添加时可指定, 取值范围 1M-1024M (增强版最小值为 1K), 默认:20M
# 比如此项值为 10M, 当文件为 20MB 会分成两段并使用两个来源下载, 文件为 15MB 则只使用一个来源下载。
# 理论上值越小使用下载分段就越多，所能获得的实际线程数就越大，下载速度就越快，但受限于所下载文件服务器的策略。
min-split-size=4M

# HTTP/FTP 下载分片大小，所有分割都必须是此项值的倍数，最小值为 1M (增强版为 1K)，默认：1M
piece-length=1M

# 允许分片大小变化。默认：false
# false：当分片大小与控制文件中的不同时将会中止下载
# true：丢失部分下载进度继续下载
allow-piece-length-change=true

# 最低下载速度限制。当下载速度低于或等于此选项的值时关闭连接（增强版本为重连），此选项与 BT 下载无关。单位 K 或 M ，默认：0 (无限制)
lowest-speed-limit=0

# 全局最大下载速度限制, 运行时可修改, 默认：0 (无限制)
max-overall-download-limit=0

# 单任务下载速度限制, 默认：0 (无限制)
max-download-limit=0

# 禁用 IPv6, 默认:false
disable-ipv6=true

# GZip 支持，默认:false
http-accept-gzip=true

# URI 复用，默认: true
reuse-uri=false

# 禁用 netrc 支持，默认:false
no-netrc=true

# 允许覆盖，当相关控制文件(.aria2)不存在时从头开始重新下载。默认:false
allow-overwrite=false

# 文件自动重命名，此选项仅在 HTTP(S)/FTP 下载中有效。新文件名在名称之后扩展名之前加上一个点和一个数字（1..9999）。默认:true
auto-file-renaming=true

# 使用 UTF-8 处理 Content-Disposition ，默认:false
content-disposition-default-utf8=true

# 最低 TLS 版本，可选：TLSv1.1、TLSv1.2、TLSv1.3 默认:TLSv1.2
#min-tls-version=TLSv1.2


## BT/PT 下载设置 ##

# BT 监听端口(TCP), 默认:6881-6999
# 直通外网的设备，比如 VPS ，务必配置防火墙和安全组策略允许此端口入站
# 内网环境的设备，比如 NAS ，除了防火墙设置，还需在路由器设置外网端口转发到此端口
listen-port=51413

# DHT 网络与 UDP tracker 监听端口(UDP), 默认:6881-6999
# 因协议不同，可以与 BT 监听端口使用相同的端口，方便配置防火墙和端口转发策略。
dht-listen-port=51413

# 启用 IPv4 DHT 功能, PT 下载(私有种子)会自动禁用, 默认:true
enable-dht=true

# 启用 IPv6 DHT 功能, PT 下载(私有种子)会自动禁用，默认:false
# 在没有 IPv6 支持的环境开启可能会导致 DHT 功能异常
enable-dht6=false

# 指定 BT 和 DHT 网络中的 IP 地址
# 使用场景：在家庭宽带没有公网 IP 的情况下可以把 BT 和 DHT 监听端口转发至具有公网 IP 的服务器，在此填写服务器的 IP ，可以提升 BT 下载速率。
#bt-external-ip=

# IPv4 DHT 文件路径，默认：$HOME/.aria2/dht.dat
dht-file-path=/etc/.aria2/dht.dat

# IPv6 DHT 文件路径，默认：$HOME/.aria2/dht6.dat
dht-file-path6=/etc/.aria2/dht6.dat

# IPv4 DHT 网络引导节点
dht-entry-point=dht.transmissionbt.com:6881

# IPv6 DHT 网络引导节点
dht-entry-point6=dht.transmissionbt.com:6881

# 本地节点发现, PT 下载(私有种子)会自动禁用 默认:false
bt-enable-lpd=true

# 指定用于本地节点发现的接口，可能的值：接口，IP地址
# 如果未指定此选项，则选择默认接口。
#bt-lpd-interface=

# 启用节点交换, PT 下载(私有种子)会自动禁用, 默认:true
enable-peer-exchange=true

# BT 下载最大连接数（单任务），运行时可修改。0 为不限制，默认:55
# 理想情况下连接数越多下载越快，但在实际情况是只有少部分连接到的做种者上传速度快，其余的上传慢或者不上传。
# 如果不限制，当下载非常热门的种子或任务数非常多时可能会因连接数过多导致进程崩溃或网络阻塞。
# 进程崩溃：如果设备 CPU 性能一般，连接数过多导致 CPU 占用过高，因资源不足 Aria2 进程会强制被终结。
# 网络阻塞：在内网环境下，即使下载没有占满带宽也会导致其它设备无法正常上网。因远古低性能路由器的转发性能瓶颈导致。
bt-max-peers=128

# BT 下载期望速度值（单任务），运行时可修改。单位 K 或 M 。默认:50K
# BT 下载速度低于此选项值时会临时提高连接数来获得更快的下载速度，不过前提是有更多的做种者可供连接。
# 实测临时提高连接数没有上限，但不会像不做限制一样无限增加，会根据算法进行合理的动态调节。
bt-request-peer-speed-limit=10M

# 全局最大上传速度限制, 运行时可修改, 默认:0 (无限制)
# 设置过低可能影响 BT 下载速度
max-overall-upload-limit=2M

# 单任务上传速度限制, 默认:0 (无限制)
max-upload-limit=0

# 最小分享率。当种子的分享率达到此选项设置的值时停止做种, 0 为一直做种, 默认:1.0
# 强烈建议您将此选项设置为大于等于 1.0
seed-ratio=1.0

# 最小做种时间（分钟）。设置为 0 时将在 BT 任务下载完成后停止做种。
seed-time=0

# 做种前检查文件哈希, 默认:true
bt-hash-check-seed=true

# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=false

# BT tracker 服务器连接超时时间（秒）。默认：60
# 建立连接后，此选项无效，将使用 bt-tracker-timeout 选项的值
bt-tracker-connect-timeout=10

# BT tracker 服务器超时时间（秒）。默认：60
bt-tracker-timeout=10

# BT 服务器连接间隔时间（秒）。默认：0 (自动)
#bt-tracker-interval=0

# BT 下载优先下载文件开头或结尾
bt-prioritize-piece=head=32M,tail=32M

# 保存通过 WebUI(RPC) 上传的种子文件(.torrent)，默认:true
# 所有涉及种子文件保存的选项都建议开启，不保存种子文件有任务丢失的风险。
# 通过 RPC 自定义临时下载目录可能不会保存种子文件。
rpc-save-upload-metadata=true

# 下载种子文件(.torrent)自动开始下载, 默认:true，可选：false|mem
# true：保存种子文件
# false：仅下载种子文件
# mem：将种子保存在内存中
follow-torrent=true

# 种子文件下载完后暂停任务，默认：false
# 在开启 follow-torrent 选项后下载种子文件或磁力会自动开始下载任务进行下载，而同时开启当此选项后会建立相关任务并暂停。
pause-metadata=false

# 保存磁力链接元数据为种子文件(.torrent), 默认:false
bt-save-metadata=true

# 加载已保存的元数据文件(.torrent)，默认:false
bt-load-saved-metadata=true

# 删除 BT 下载任务中未选择文件，默认:false
bt-remove-unselected-file=true

# BT强制加密, 默认: false
# 启用后将拒绝旧的 BT 握手协议并仅使用混淆握手及加密。可以解决部分运营商对 BT 下载的封锁，且有一定的防版权投诉与迅雷吸血效果。
# 此选项相当于后面两个选项(bt-require-crypto=true, bt-min-crypto-level=arc4)的快捷开启方式，但不会修改这两个选项的值。
bt-force-encryption=true

# BT加密需求，默认：false
# 启用后拒绝与旧的 BitTorrent 握手协议(\19BitTorrent protocol)建立连接，始终使用混淆处理握手。
#bt-require-crypto=true

# BT最低加密等级，可选：plain（明文），arc4（加密），默认：plain
#bt-min-crypto-level=arc4

# 分离仅做种任务，默认：false
# 从正在下载的任务中排除已经下载完成且正在做种的任务，并开始等待列表中的下一个任务。
bt-detach-seed-only=true


## 客户端伪装 ##

# 自定义 User Agent
user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.57

# BT 客户端伪装
# PT 下载需要保持 user-agent 和 peer-agent 两个参数一致
# 部分 PT 站对 Aria2 有特殊封禁机制，客户端伪装不一定有效，且有封禁账号的风险。
#user-agent=Transmission 2.94
peer-agent=Transmission 2.94
peer-id-prefix=-TR2940-

## RPC 设置 ##

# 启用 JSON-RPC/XML-RPC 服务器, 默认:false
enable-rpc=true

# 接受所有远程请求, 默认:false
rpc-allow-origin-all=true

# 允许外部访问, 默认:false
rpc-listen-all=true

# RPC 监听端口, 默认:6800
rpc-listen-port=6800

# RPC 密钥
#rpc-secret=

# RPC 最大请求大小
rpc-max-request-size=10M

# RPC 服务 SSL/TLS 加密, 默认：false
# 启用加密后必须使用 https 或者 wss 协议连接
# 不推荐开启，建议使用 web server 反向代理，比如 Nginx、Caddy ，灵活性更强。
#rpc-secure=false

# 在 RPC 服务中启用 SSL/TLS 加密时的证书文件(.pem/.crt)
#rpc-certificate=/etc/.aria2/xxx.pem

# 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件(.key)
#rpc-private-key=/etc/.aria2/xxx.key

# 事件轮询方式, 可选：epoll, kqueue, port, poll, select, 不同系统默认值不同
#event-poll=select


## 高级选项 ##

# 启用异步 DNS 功能。默认：true
#async-dns=true

# 指定异步 DNS 服务器列表，未指定则从 /etc/resolv.conf 中读取。
#async-dns-server=119.29.29.29,223.5.5.5,8.8.8.8,1.1.1.1

# 指定单个网络接口，可能的值：接口，IP地址，主机名
# 如果接口具有多个 IP 地址，则建议指定 IP 地址。
# 已知指定网络接口会影响依赖本地 RPC 的连接的功能场景，即通过 localhost 和 127.0.0.1 无法与 Aria2 服务端进行讯通。
#interface=

# 指定多个网络接口，多个值之间使用逗号(,)分隔。
# 使用 interface 选项时会忽略此项。
#multiple-interface=


## 日志设置 ##

# 日志文件保存路径，忽略或设置为空为不保存，默认：不保存
#log=

# 日志级别，可选 debug, info, notice, warn, error 。默认：debug
#log-level=warn

# 控制台日志级别，可选 debug, info, notice, warn, error ，默认：notice
console-log-level=notice

# 安静模式，禁止在控制台输出日志，默认：false
quiet=false

# 下载进度摘要输出间隔时间（秒），0 为禁止输出。默认：60
summary-interval=0

## BitTorrent trackers ##
bt-tracker=udp://tracker.opentrackr.org:1337/announce,http://tracker.internetwarriors.net:1337/announce,udp://exodus.desync.com:6969/announce,udp://tracker.cyberia.is:6969/announce,udp://explodie.org:6969/announce,udp://opentracker.i2p.rocks:6969/announce,udp://47.ip-51-68-199.eu:6969/announce,http://open.acgnxtracker.com:80/announce,udp://open.stealth.si:80/announce,udp://tracker.ds.is:6969/announce,udp://www.torrent.eu.org:451/announce,udp://tracker.torrent.eu.org:451/announce,udp://retracker.lanta-net.ru:2710/announce,http://tracker4.itzmx.com:2710/announce,udp://tracker.moeking.me:6969/announce,udp://tracker.dler.org:6969/announce,udp://ipv4.tracker.harry.lu:80/announce,http://rt.tace.ru:80/announce,udp://valakas.rollo.dnsabr.com:2710/announce,udp://opentor.org:2710/announce
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
sudo gdebi electron-ssr-0.2.6.deb
# sudo dpkg -r electron-ssr

sudo apt-get install libcanberra-gtk-module
```

#### ffmpeg

```shell
sudo add-apt-repository universe
sudo apt update
sudo apt install ffmpeg
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
# sudo vim  /etc/systemd/resolved.conf
# DNS=8.8.8.8 144.144.144.144


sudo vim /etc/resolv.conf
nameserver 8.8.8.8
nameserver 114.114.114.114

sudo systemctl disable --now systemd-resolved
sudo vim /etc/NetworkManager/NetworkManager.conf

[main]
dns=default  # none|default

sudo systemctl restart NetworkManager
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
