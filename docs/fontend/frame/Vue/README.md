---
sidebar: auto
---

# Vue

## 安装

#### [安装](https://cn.vuejs.org/v2/guide/installation.html)

## 组件通信方式

### `props` / `$emit`

#### [props](https://cn.vuejs.org/v2/api/#props)可以是数组或对象，用于接收来自父组件的数据

#### [\$emit](https://cn.vuejs.org/v2/api/#vm-emit)子组件触发父组件的方法,通过回调的方式将修改的内容传递给父组件

父组件

```html
<template>
  <div>
    {{value}}
    <child :value="value" @input="change"></child>
  </div>
</template>

<script>
  import child from './child'
  export default {
    components: {
      child,
    },
    data() {
      return {
        value: 'hello world',
      }
    },
    methods: {
      change($event) {
        this.value = $event
      },
    },
  }
</script>
```

子组件

```html
<template>
  <div>
    {{value}}
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleClick() {
        this.$emit('input', 'hi')
      },
    },
  }
</script>
```

- [.sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6) 语法糖

```html
<child :value="value" @update:value="value = $event"></child>
<!-- 缩写 .sync 修饰符 -->
<child :value.sync="value"></child>
```

- [v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

一个组件上的 v-model 默认是名为 value 的 prop 和名为 input 的事件，model 选项可以修改 prop 和事件名

```html
<child v-model="value"></child>
```

```html
<template>
  <div>
    {{value}}
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleClick() {
        this.$emit('input', 'hi')
      },
    },
  }
</script>
```

### $parent / $children

#### [parent](https://cn.vuejs.org/v2/api/#parent)

子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中

子组件

```html
<template>
  <div>
    {{value}}
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleClick() {
        this.$parent.value = 'hi'
      },
    },
  }
</script>
```

孙子组件

```html
<template>
  <div>
    <button @click="handleClick">按钮1</button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleClick() {
        this.$parent.$emit('input', 'hi')
      },
    },
  }
</script>
```

- `$dispatch` 向上派发

```js
Vue.prototype.$dispatch = function $dispatch(eventName, data) {
  let parent = this.$parent
  while (parent) {
    parent.$emit(eventName, data)
    parent = parent.$parent
  }
}
```

```js
this.$dispatch('input', 'hi')
```

- `$broadcast` 向下派发

```js
Vue.prototype.$broadcast = function $broadcast(eventName, data) {
  const broadcast = function() {
    this.$children.forEach(child => {
      child.$emit(eventName, data)
      if (child.$children) {
        $broadcast.call(child, eventName, data)
      }
    })
  }
  broadcast.call(this, eventName, data)
}
```

```js
this.$broadcast('eventName')
```

### $attrs / $listeners

[\$attrs](https://cn.vuejs.org/v2/api/#vm-attrs) 批量向下传入属性

[\$listeners](https://cn.vuejs.org/v2/api/#vm-listeners) 批量向下传入方法

[inheritAttrs](https://cn.vuejs.org/v2/api/#vm-listeners) 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。

子组件

```html
<template>
  <div>
    {{$attrs.value}}
    <grandChild v-bind="$attrs" v-on="$listeners"></grandChild>
  </div>
</template>

<script>
  import grandChild from './grandChild'
  export default {
    inheritAttrs: false,
    components: {
      grandChild,
    },
  }
</script>
```

```js
this.$listeners.eventName($event)
```

### provide / inject

[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

provide 在父级中注入数据，inject 在任意子组件中可以注入父级数据

父组件

```html
<template>
  <div>
    {{value}}
    <child></child>
  </div>
</template>

<script>
  import child from './child'
  export default {
    provide() {
      return {
        value: 'hello world',
      }
    },
    data() {
      return {
        value: 'hello world',
      }
    },
    components: {
      child,
    },
  }
</script>
```

子组件

```html
<template>
  <div>
    {{value}}
  </div>
</template>

<script>
  export default {
    inject: ['value'],
  }
</script>
```

### refs

[refs](https://cn.vuejs.org/v2/api/#vm-refs)一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

[子组件 ref](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)

\$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。

```html
<child ref="child"></child>
```

```js
this.$refs.child
```

### eventBus

声明一个全局 Vue 实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上。

```js
Vue.prototype.$bus = new Vue()
```

父组件

```js
this.$bus.$on('change', value => {
  console.log(value)
})
```

子组件

[Vue.nextTick](https://cn.vuejs.org/v2/api/?#Vue-nextTick)在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// this.$nextTick(() => {
this.$bus.$emit('change', 'hello world')
// })
```

### Vuex

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

### 快速原型开发

#### 参考：[快速原型开发](https://cli.vuejs.org/zh/guide/prototyping.html)

使用 vue serve 和 vue build 命令对单个 \*.vue 文件进行快速原型开发

```shell
npm install -g @vue/cli-service-global

vue serve App.vue
vue build
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
