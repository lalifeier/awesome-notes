---
sidebar: auto
---

# 介绍

#### Node

## 环境安装

### 使用 nvm 安装

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

### Yarn

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

## 模块

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
