---
sidebar: auto
---

# Vue

## 基础

### [安装](https://cn.vuejs.org/v2/guide/installation.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      new Vue({
        el: '#app',
        data() {
          return {}
        },
        methods: {},
      })
    </script>
  </body>
</html>
```

### [Vue 实例](https://cn.vuejs.org/v2/guide/instance.html)

```html
<div id="app"></div>
```

```js
new Vue({
  el: '#app',
  data() {
    return {}
  },
  methods: {},
})
```

### [模板语法](https://cn.vuejs.org/v2/guide/syntax.html)

- 插值

```html
{{msg}}
```

### [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<h1 v-show="ok">Hello!</h1>
```

### [列表渲染](https://cn.vuejs.org/v2/guide/list.html)

```html
<ul>
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

### [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

```html
<input type="text" v-model="msg" />
```

```js
new Vue({
  el: '#app',
  data() {
    return { msg: 'hello world' }
  },
  methods: {},
})
```

### [事件](https://cn.vuejs.org/v2/guide/events.html)

```html
<button v-on:click="handleClick">click</button>
<button @click="handleClick">click</button>
```

```js
new Vue({
  el: '#app',
  data() {
    return {}
  },
  methods: {
    handleClick() {},
  },
})
```

### [组件](https://cn.vuejs.org/v2/guide/components-registration.html)

```html
<todo-item v-for="item in list" :item="item"></todo-item>
```

```js
Vue.component('todo-item', {
  props: ['item'],
  template: ' <li class="item">{{item}}</li>',
})
```

## 组件

### [属性](https://cn.vuejs.org/v2/guide/components-props.html)

自定义属性 props

原生属性 attrs

特殊属性 class、style

### [事件]()

### [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

```html
<!-- 具名插槽 -->
<template v-slot:default> </template>

<!-- 作用域插槽 -->
<template v-slot="slotProps"> {{ slotProps }} </template>
```

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

### 创建项目

```shell
vue create hello-world

#git bash
winpty vue.cmd create hello-world
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
