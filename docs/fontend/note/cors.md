# 跨域（非同源策略请求）

#### 同源策略

- 同源: URL 是由协议、域名、端口号三部分组成。如果两个 URL，他们的协议、域名、端口号都相同时，则代表他们是同源。

- 跨域：如果不满足同源，则就是跨域了。跨域就是从一个域去请求另一个域里面的资源。

- 同源策略：浏览器采用同源策略，来禁止页面加载或执行非本源的任何脚本。这样能够增加安全性。

#### 浏览器中不受同源策略的限制的元素

script、img、iframe、link 等含有 src 属性的标签不受同源策略的限制。

## JSONP

JSONP 是 JSON with Padding 的略称。允许在服务器端集成 Script tags 返回至客户端，通过 javascript callback 的形式实现跨域访问。

### 原理

利用 script 标签的 src 属性调用资源不跨域的特性，向服务端请求同时传一个 callback 回调方法名作为参数，服务端接受函数名生成返回 json 格式资源的代码。

### 优点

兼容性好，实现比较简单

### 缺点

只能发送 get 请求，响应失败没有状态码， 数据容易被劫持

### 实现

- 创建 callback 方法
- 插入 script 标签
- 后台接受到请求，解析前端传过去的 callback 方法，返回该方法的调用，并且数据作为参数传入该方法
- 前端执行服务端返回的方法调用

```js
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    //创建script标签
    let script = document.createElement('script')
    //将回调函数挂在 window 上
    window[callback] = function(data) {
      resolve(data)
      //代码执行后，删除插入的script标签
      document.body.removeChild(script)
    }
    //回调函数加在请求地址上
    params = { ...params, callback }
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}

function show(data) {
  console.log(data)
}

jsonp({
  url: 'http://127.0.0.1:3000/api',
  params: {},
  callback: 'show',
}).then(data => {
  console.log(data)
})
```

后端 node

```js
const express = require('express')
const app = express()

app.get('/api', function(req, res) {
  let { callback = Function.prototype } = req.query
  const data = {
    code: 200,
    data: 'Hello World',
  }
  res.send(`${callback}(${JSON.stringify(data)})`)
})

app.listen(3000)
```

### jQuery 使用 jsonp

```js
$.ajax({
  url: 'http://127.0.0.1:3000/api',
  method: 'get',
  dataType: 'jsonp',
  success: res => {
    console.log(res)
  },
  error: err => {
    console.log(err)
  },
})
```

## CORS 跨域资源共享

CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。

### express

1. 使用 cors

```js
// yarn add cors -D
const cors = require('cors')
app.use(cors())
```

2. 手动实现

```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, PUT, DELETE'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  req.method === 'OPTIONS' ? res.end() : next()
})
```

```js
const whitList = ['http://127.0.0.1:5500'] //设置白名单
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (whitList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PATCH, PUT, DELETE'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.method === 'OPTIONS') {
      res.end()
    }
  }
  next()
})
```

## http proxy

### webpack

```js
const path = require('path')
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: '8081',
    host: '127.0.0.1',
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
}
```

## nginx 反向代理

`/etc/nginx/conf.d/default.conf`

```conf
server {
  listen 80;
  server_name localhost 127.0.0.1;

	location / {
		# 允许跨域请求的“域”
		add_header 'Access-Control-Allow-Origin' $http_origin;
		# 允许客户端提交Cookie
		add_header 'Access-Control-Allow-Credentials' 'true';
		# 允许客户端的请求方法
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT';
		# 允许客户端提交的的请求头
		add_header 'Access-Control-Allow-Headers' 'Origin, x-requested-with, Content-Type, Accept, Authorization';
		# 允许客户端访问的响应头
		add_header 'Access-Control-Expose-Headers' 'Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma';
		# 处理预检请求
		if ($request_method = 'OPTIONS') {
			# 预检请求缓存时间
			add_header 'Access-Control-Max-Age' 1728000;
			add_header 'Content-Type' 'text/plain; charset=utf-8';
			add_header 'Content-Length' 0;
			return 204;
		}

		proxy_pass http://127.0.0.1:3000;

		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;

		proxy_connect_timeout 600;
		proxy_read_timeout 600;
	}
}


```

## postMessage

[`window.postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 方法可以安全地实现跨源通信。

页面 a `http://127.0.0.1:3001/a.html`

```html
<iframe
  id="iframe"
  src="http://127.0.0.1:3002/b.html"
  style="display: none;"
></iframe>
<script>
  iframe.onload = function() {
    iframe.contentWindow.postMessage('test', 'http://127.0.0.1:3002/')
  }

  window.onmessage = function(e) {
    console.log(e.data)
  }
</script>
```

页面 b `http://127.0.0.1:3002/b.html`

```html
<script>
  window.onmessage = function(e) {
    e.source.postMessage(e.data, e.origin)
  }
</script>
```

## websocket

### 前端

```html
<script src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js"></script>

<script>
  const socket = io('http://127.0.0.1:3000')
  socket.on('connect', () => {
    socket.on('message', msg => {
      console.log(msg)
    })
    socket.on('disconnect', () => {})
  })
  socket.send('test')
</script>
```

### 服务器端

#### node

```js
// yarn add socket.io -D
const io = require('socket.io')(3000)

io.on('connect', client => {
  client.on('message', msg => {
    client.send(msg)
  })
  client.on('disconnect', () => {})
})
```

## document.domain + iframe

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。 只需要给页面添加 document.domain ='test.com' 表示二级域名都相同就可以实现跨域。

#### 原理

两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域

页面 a `http://a.test.com/a.html`

```html
<iframe src="http://b.test.com/b.html"></iframe>
<script>
  document.domain = 'test.com'
  var user = 'admin
</script>
```

页面 b `http://b.test.com/b.html`

```html
<script>
  document.domain = 'test.com'
  alert(window.parent.user)
</script>
```

## window.name + iframe

页面 a `http://127.0.0.1:3001/a.html`

```html
<iframe
  id="iframe"
  src="http://127.0.0.1:3002/b.html"
  style="display: none;"
></iframe>

<script>
  let count = 0
  iframe.onload = function() {
    if (count === 0) {
      iframe.src = 'http://127.0.0.1:3001/proxy.html'
      count++
      return
    }
    console.log(iframe.contentWindow.name)
  }
</script>
```

页面 b `http://127.0.0.1:3002/b.html`

```html
<script>
  window.name = 'test'
</script>
```

页面 proxy `http://127.0.0.1:3001/proxy.html`

```html
<script></script>
```

## location.hash + iframe

页面 a `http://127.0.0.1:3001/a.html`

```html
<iframe
  id="iframe"
  src="http://127.0.0.1:3002/b.html"
  style="display: none;"
></iframe>

<script>
  iframe.onload = function() {
    iframe.src = 'http://127.0.0.1:3002/b.html#msg=test'
  }

  function func(res) {
    console.log(res)
  }
</script>
```

页面 b `http://127.0.0.1:3002/b.html`

```html
<iframe
  id="iframe"
  src="http://127.0.0.1:3001/c.html"
  style="display: none;"
></iframe>

<script>
  window.onhashchange = function() {
    iframe.src = 'http://127.0.0.1:3001/c.html' + location.hash
  }
</script>
```

页面 c `http://127.0.0.1:3001/c.html`

```html
<script>
  window.onhashchange = function() {
    window.parent.parent.func(location.hash)
  }
</script>
```
