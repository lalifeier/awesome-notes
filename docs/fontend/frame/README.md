---
sidebar: auto
---

# 前端框架

## vue-cli

#### 参考：[vue-cli 官方文档](https://cli.vuejs.org/zh/guide/)

### 安装

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli

#检查Vue版本
vue --version
```

### 调试

#### 在 VS Code 中调试

#### 参考：[在 VS Code 中调试](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)

1. 先决条件

你必须安装好 Chrome 和 VS Code。同时请确保自己在 VS Code 中安装了 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 扩展的最新版本。

2. 在浏览器中展示源代码

如果你使用的是 Vue CLI 2，请设置并更新 config/index.js 内的 devtool property：

```js
devtool: 'source-map',
```

如果你使用的是 Vue CLI 3，请设置并更新 vue.config.js 内的 devtool property：

```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
}
```

3. 从 VS Code 启动应用

点击在 Activity Bar 里的 Debugger 图标来到 Debug 视图，然后点击那个齿轮图标来配置一个 launch.json 的文件，选择 Chrome/Firefox：Launch 环境。然后将生成的 launch.json 的内容替换成为相应的配置：

```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "firefox",
      "request": "launch",
      "name": "vuejs: firefox",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "pathMappings": [{ "url": "webpack:///src/", "path": "${webRoot}/" }]
    }
  ]
}
```

#### Vue Devtools

安装 [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

使用 devtools 有很多好处，比如它可以让你能够实时编辑数据 property 并立即看到其反映出来的变化。另一个主要的好处是能够为 Vuex 提供时间旅行式的调试体验。

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
