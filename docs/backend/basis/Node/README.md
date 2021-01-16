---
sidebar: auto
---

# 介绍

#### Node

## 环境安装

### n

参考: [https://github.com/tj/n](https://github.com/tj/n)

```shell
npm install -g n
n lts
n rm lts
```

### nvm

参考: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- 安装 nvm

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

- 卸载 nvm

```shell
rm -rf "$NVM_DIR"
#删除~/.bashrc中以下内容
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[[ -r $NVM_DIR/bash_completion ]] && \. $NVM_DIR/bash_completion
```

- 配置环境变量

```shell
vim ~/.zshrc
# 配置国内镜像
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

source ~/.zshrc
```

- 查看 Node 版本

```shell
#查看已经安装的Node版本
nvm ls
#查看长期支持的版本
nvm ls-remote --lts
#显示远程所有可以安装的nodejs版本
nvm ls-remote
```

- 安装最新稳定版 node

```shell
nvm install stable
```

- 切换 Node 版本

```shell
nvm use stable
```

- 修改 Node 默认版本

```shell
nvm alias default v8.16.1
```

::: warning
sudo: nvm: command not found
:::

```shell
#方法一
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
#方法二
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
```

### 配置 npm 镜像

```shell
npm config set registry https://registry.npm.taobao.org
# 查看
npm config get registry
```

### NPM 镜像管理工具

```shell
#安装
npm install -g nrm
#查看可选源
nrm ls
#切换到taobao源
nrm use taobao
#查看源响应时间
nrm test npm
#增加定制源
nrm add 源名称 源网址
#删除源
nrm del 源名称
```

### yarn

```shell
#方式一
#安装 https://yarnpkg.com/getting-started/install
npm install -g yarn

#方式二
#安装 https://classic.yarnpkg.com/zh-Hans/docs/install#debian-stable
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
#如果你使用nvm，可通过以下操作来避免node的安装
sudo apt-get install --no-install-recommends yarn
#sudo apt-get update && sudo apt-get install yarn
#检查Yarn是否安装
yarn --version
```

### 配置 yarn 镜像

```shell
yarn config set registry https://registry.npm.taobao.org
#查看镜像地址
yarn config get registry
```

### YARN 镜像管理工具

```shell
#方式一
#安装
npm install -g yrm
#查看可选源
yrm ls
#切换到taobao源
yrm use taobao

#方式二
#安装
yarn global add yrm
#查看所有镜像
yrm ls
#使用淘宝镜像
yrm use taobao
```

::: warning
zsh: command not found: yrm
:::

```shell
#查看yarn的bin目录
yarn global bin
#加入到环境变量
export PATH=$PATH:/home/lalifeier/.yarn/bin
```

## 调试

### vscode

#### 必需字段如下：

- type：调试器类型。这里是 node（内置的调试器），如果安装了 Go 和 PHP 的扩展后，则对应的 type 分别为 go 和 php。
- request：请求的类型，支持 launch 和 attach。launch 就是以 debug 模式启动调试，attach 就是附加到已经启动的进程开启 debug 模式并调试。
- name：下拉菜单显示的名字。

#### 可选字段（括号里表示适用的类型）如下：

- program：可执行文件或者调试器要运行的文件 (launch)。
- args：要传递给调试程序的参数 (launch)。
- env：环境变量 (launch)。
- cwd：当前执行目录 (launch)。
- address：IP 地址 (launch & attach)。
- port：端口号 (launch & attach)。
- skipFiles：想要忽略的文件，数组类型 (launch & attach)。
- processId：进程 PID (attach)。
- ...

#### 变量替换：

- \${workspaceFolder}：当前打开工程的路径。
- \${file}：当前打开文件的路径。
- \${fileBasename}：当前打开文件的名字，包含后缀名。
- \${fileDirname}：当前打开文件所在的文件夹的路径。
- \${fileExtname}：当前打开文件的后缀名。
- \${cwd}：当前执行目录。
- ...

```json
//  lanuch.json
// 本地调试
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "restart": true,
      "program": "${workspaceRoot}/development.js",
    }
  ]
}

//远程调试
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to node",
      "restart": true,
      "processId": "${command:PickProcess}"
    }
  ]
}


{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to node",
      "restart": true,
      "address": "localhost",
      "port": 5858
    }
  ]
}
```

## [全局对象](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html)

## 模块

### [crypto](https://nodejs.org/dist/latest-v14.x/docs/api/crypto.html)

### [dns](https://nodejs.org/dist/latest-v14.x/docs/api/dns.html)

### [fs](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html)

### [http](https://nodejs.org/dist/latest-v14.x/docs/api/http.html)

- `http.Server`

```js
const http = require('http')

const server = http.createServer((request, response) => {
  let data = ''

  request.on('data', chunk => {
    data += chunk
  })
  request.on('end', () => {
    let method = request.method
    let headers = JSON.stringify(request.headers)
    let httpVersion = request.httpVersion
    let requireUrl = request.url
    response.writeHead(200, { 'Content-Type': 'text/html' })

    let responseData =
      method + ', ' + headers + ', ' + httpVersion + ', ' + requireUrl
    response.end(responseData)
  })
})

server.listen(3000, 'localhost')

server.on('listening', () => {
  console.log('Server is listening')
  // server.close()
})

server.on('connection', () => {
  console.log('Client is connected')
})

server.on('close', () => {
  console.log('Server is closed')
})

console.log('Node Server started on port 3000')
```

```js
const http = require('http')
const httpServer = new http.Server()

httpServer.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('hi')
})

httpServer.listen(3000, () => {
  console.log('Node Server started on port 3000')
})
```

- `http.ClientRequest`

```js
const http = require('http')

let responseData = ''

http
  .request(
    {
      host: 'localhost',
      port: '3000',
      method: 'get',
    },
    response => {
      response.on('data', chunk => {
        responseData += chunk
      })
      response.on('end', () => {
        console.log(responseData)
      })
    }
  )
  .end()
```

```js
const http = require('http')

let responseData = ''

const option = {
  host: 'localhost',
  port: '3000',
}

const request = http.request(option)

request
  .on('response', response => {
    response.on('data', chunk => {
      responseData += chunk
    })
    response.on('end', () => {
      console.log(responseData)
    })
  })
  .end()
```

### [os](https://nodejs.org/dist/latest-v14.x/docs/api/os.html)

### [path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html)

- `path.join([...paths])`
- `path.resolve([...paths])`

* `fs.readFile(path[, options], callback)`
* `fs.readFileSync(path[, options])`

### [readline](https://nodejs.org/dist/latest-v14.x/docs/api/readline.html)

### [url](https://nodejs.org/dist/latest-v14.x/docs/api/url.html)

```js
const url = require('url')

const urlString = 'http://www.test.com?orderId=12345'
const urlObject = url.parse(urlString)

console.log(urlObject)

const urlObject = {
  protocol: 'http:',
  host: 'www.test.com',
  port: 80,
  search: '?orderId=12345',
  query: 'orderId=12345',
  path: '/',
}

let realAddress = url.format(urlObject)
console.log(realAddress)

const urlAddress = url.resolve('http://www.test.com', 'order')

console.log(urlAddress)
```

### [vm](https://nodejs.org/dist/latest-v14.x/docs/api/vm.html)

- `new vm.Script(code[, options])`
- `script.runInNewContext([contextObject[, options]])`

## Mongoose

[Mongoose 官方文档](https://mongoosejs.com/docs/index.html)

## Koa

### 常用中间件

- [koa](https://www.npmjs.com/package/koa)
- [koa-router](https://www.npmjs.com/package/koa-router)
- [koa-body](https://www.npmjs.com/package/koa-body)
- [@koa/cors](https://www.npmjs.com/package/@koa/cors)
- [koa-json](https://www.npmjs.com/package/koa-json)
- [koa-helmet](https://www.npmjs.com/package/koa-helmet) 设置 Http 头保障应用程序安全
- [koa-combine-routers](https://www.npmjs.com/package/koa-combine-routers) 路由压缩
- [koa-static](https://www.npmjs.com/package/koa-static) 静态资源

### 热加载

- [nodemon](https://www.npmjs.com/package/nodemon)

## pm2

```shell
# 安装
npm install -g pm2
# Install latest PM2 version
$ npm install pm2@latest -g
# Save process list, exit old PM2 & restore all processes
$ pm2 update

# 运行
pm2 start app.js
pm2 start npm -- run XXX
pm2 start npm --watch --name XXX -- run start

# 显示进程状态
pm2 list
# 停止进程
pm2 stop     <app_name|namespace|id|'all'|json_conf>
# 重启进程
pm2 restart  <app_name|namespace|id|'all'|json_conf>
# 杀死进程
pm2 delete   <app_name|namespace|id|'all'|json_conf>
pm2 describe <id|app_name>
# 监视所有进程
pm2 monit

pm2 start api.js -i <processes>
pm2 reload all
```

### 配置文件

```shell
# https://pm2.keymetrics.io/docs/usage/application-declaration/
pm2 init

# pm2 start pm2.config.js
module.exports = {
  apps: [{
    name: "app",
    script: "app.js",
    cwd: "./",
    args: "",
    watch: true,
    watch_delay: 1000,
    ignore_watch: [
      "node_modules",
      "logs",
      "public"
    ],
    watch_options: {
      "followSymlinks": false
    },
    exec_mode: "cluster_mode",
    instances: 4,
    error_file: "./logs/app-err.log",
    out_file: "./logs/app-out.log",
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    autorestart: true,
    env: {
      NODE_ENV: "development",
      REMOTE_ADDR: ""
    },
    env_production: {
      NODE_ENV: "production",
      REMOTE_ADDR: ""
    },
    env_test: {
      NODE_ENV: "test",
      REMOTE_ADDR: ""
    }
  }]
}
```

```shell
# 查看物理CPU个数
cat /proc/cpuinfo | grep 'physical id' | sort| uniq | wc -l
# 查看每个物理CPU中core的核数
cat /proc/cpuinfo | grep 'cpu cores' | uniq
# 查看逻辑CPU的个数
cat /proc/cpuinfo | grep 'processor' | wc -l
```

### 负载均衡

```shell
pm2 start server.js -i (number|max)

# 开启三个进程运行项目
pm2 start app.js -i 3
# 根据机器CPU核数，开启对应数目的进程运行项目
pm2 start app.js -i max
```

### 日志管理

```shell
# 显示日志
pm2 logs
pm2 logs APP-NAME       # Display APP-NAME logs
pm2 logs --json         # JSON output
pm2 logs --format       # Formated output

pm2 flush               # Flush all logs
pm2 reloadLogs          # Reload all logs

# 日志分割
# https://github.com/keymetrics/pm2-logrotate#configure
pm2 install pm2-logrotate
# 查看默认配置
pm2 conf
```

### 开机自动启动

```shell
# Generate Startup Script
pm2 startup

# Freeze your process list across server restart
pm2 save

# Remove Startup Script
pm2 unstartup
```

### pm2-web

```shell
# yum install gcc-c++
# npm install -g node-gyp
npm install -g pm2-web
pm2-web

pm2-web --config pm2-web-config.json
// pm2-web-config.json
{
  "www": {
      "host": "localhost",
      "address": "0.0.0.0",
      "port": 6688
  }
}
```

### Nestjs

```js
// pm2 start npm --name <name> -- run start:prod
pm2 start yarn --name nest -- run start
```
