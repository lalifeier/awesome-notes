---
sidebar: auto
---

# 前端笔记

## 下载文件

### a 标签 download 属性

```html
<a href="url" download="fileName">下载</a>
```

### window.open 或 location.href

```js
window.open(url)
location.href = url
```

### Blob 对象

```js
let body = JSON.stringify({})
function download(blobUrl, fileName = '') {
  const a = document.createElement('a')
  a.download = fileName
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}
```

#### get 请求

- 使用原生 XMLHttpRequest 方法

```js
function downloadFile(url, fileName) {
  const req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.responseType = 'blob'
  req.onload = function() {
    const blobUrl = window.URL.createObjectURL(req.response)
    download(blobUrl, fileName)
    window.URL.revokeObjectURL(blobUrl)
  }
  req.send()
}
```

- 使用原生 fetch 方法

```js
async function downloadFile(url, body, fileName) {
  let response = await fetch(url)
  let blob = await response.blob()
  let blobUrl = window.URL.createObjectURL(blob)
  download(blobUrl, fileName)
  window.URL.revokeObjectURL(blobUrl)
}
```

#### post 请求

- 使用原生 XMLHttpRequest 方法

```js
function downloadFile(url, body, fileName) {
  const req = new XMLHttpRequest()
  req.open('POST', url, true)
  req.responseType = 'blob'
  req.setRequestHeader('Content-Type', 'application/json')
  req.onload = function() {
    const data = req.response
    const blob = new Blob([data])
    const blobUrl = window.URL.createObjectURL(blob)
    download(blobUrl, fileName)
    window.URL.revokeObjectURL(blobUrl)
  }
  req.send(body)
}
```

- 使用原生 fetch 方法

```js
async function downloadFile(url, body, fileName) {
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  let blob = await response.blob()
  let blobUrl = window.URL.createObjectURL(blob)
  download(blobUrl, fileName)
  window.URL.revokeObjectURL(blobUrl)
}
```

### canvas 将图片转换为 base64 格式

```js
function downloadImage(url, fileName) {
  let canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function() {
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0, img.width, img.height)
    const dataURL = canvas.toDataURL('image/png')
    console.log(dataURL)
    download(dataURL)
    canvas = null
    img = null
  }
  img.src = url
}
```

## 数字格式化

[toLocaleString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

[Numeral-js](http://numeraljs.com/)

### 保留两位小数

```js
console.log(num.toFixed(2))
```

### 数字百分比处理

```js
number.toLocaleString('zh', {
  style: 'percent',
  minimumFractionDigits: 2,
  useGrouping: false,
})
```

```js
Math.round(number * 10000) / 100 + '%'
```

### 数字千分符展示

```js
number.toLocaleString()
```

### 带上货币符号

```js
number.toLocaleString('zh', { style: 'currency', currency: 'CNY' })
```

### 数字超大时-末尾添加相应的单位

```js
function tranNumber(num, point) {
  let numStr = num.toString().split('.')[0]
  if (numStr.length < 6) {
    return numStr
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
  } else if (numStr.length > 8) {
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
  }
}

console.log(tranNumber(1000, 2)) // 1000
console.log(tranNumber(26742238, 2)) // 2674.22万
console.log(tranNumber(1234787325, 2)) // 12.34亿
```

## 日期格式化

[moment](https://github.com/moment/moment)

```js
function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
```

## 比较大小

### 百分比

```js
function compare(a, b) {
  return parseFloat(a) > parseFloat(b)
}
function compare(a, b) {
  return Number(a.replace('%', '')) > Number(b.replace('%', ''))
}
console.log(compare('15%', '4.5%'))
```

## 数组

### 数组去重

```js
function unique(arr) {
  return Array.from(new Set(arr))
}
function unique(arr) {
  return [...new Set(arr)]
}
function unique(arr) {
  const map = new Map()
  return arr.filter(a => !map.has(a) && map.set(a, 1))
}
```

### 数组对象指定属性去重

```js
function unique(arr, key) {
  let map = new Map()
  arr.forEach(item => {
    if (!map.has(item[key])) {
      map.set(item[key], item)
    }
  })
  return [...map.values()]
}
```

```js
let hash = {}
arr = arr.reduce(function(item, next) {
  hash[next.name] ? '' : (hash[next.name] = true && item.push(next))
  return item
}, [])
```

### 数组排序

```js
// 升序
function compare(x, y) {
  if (x < y) {
    return -1
  } else if (x > y) {
    return 1
  } else {
    return 0
  }
}
//降序
function compare(x, y) {
  if (x < y) {
    return 1
  } else if (x > y) {
    return -1
  } else {
    return 0
  }
}

console.log(arr.sort(compare))
```

### 数组对象排序

```js
function compare(prop) {
  return function(obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
arr.sort(compare(prop))
```

### 数组对象分组

```js
function groupBy(arr, key) {
  return arr.reduce((total, val) => {
    const value = val[key]
    total[value] = total[value] || []
    total[value].push(val)
    return total
  }, Object.create(null))
}
```

### 数组对象分组求和

```js
function groupByWithSum(arr, groupKey, keys) {
  return [
    ...arr
      .reduce((map, item) => {
        const key = item[groupKey]
        const value = map.get(key)
        if (value) {
          keys.forEach(key => {
            value[key] += item[key]
          })
        } else {
          map.set(key, Object.assign({}, item))
        }
        return map
      }, new Map())
      .values(),
  ]
}

function groupByWithSum(arr, key, keys) {
  return arr.reduce((total, val) => {
    let index = total.findIndex(obj => obj[key] == val[key])
    if (index === -1) {
      total.push(val)
    } else {
      keys.forEach(key => {
        total[index][key] += val[key]
      })
    }
    return total
  }, [])
}
```

## 资源的压缩与合并

### HTML 压缩

- 使用在线工具进行压缩

[html-minifier-terser](https://terser.org/html-minifier-terser/])

- 使用 html-minifier 等 npm 工具

### CSS 压缩

- 使用在线工具进行压缩
- 使用 clean-css 等 npm 工具

### JS 压缩与混淆

- 使用在线工具进行压缩
- 使用 Webpack 对 JS 在构建时压缩

### CSS JS 文件合并

## 图片优化

### 图片压缩

- [jpg 图片格式 压缩](https://github.com/imagemin/imagemin)

- [png 图片格式 压缩](https://github.com/imagemin/imagemin-pngquant)

### 图片加载优化

#### 图片懒加载

- 原生的图片懒加载方案

```js
// 判断浏览器是否支持原生 loading
'loading' in HTMLImageElement.prototype === true
```

```html
<!-- 支持native loading的HTML这样写 -->
<img src="example.jpg" loading="lazy" />
<!-- 不支持的这样写,使用传统的JavaScript懒加载滚动加载实现 -->
<img data-src="example.jpg" loading="lazy" />
```

- 第三方图片懒加载方案

[verlok/lazyload](https://github.com/verlok/vanilla-lazyload)

[yall.js](https://github.com/malchata/yall.js/)

[Blazy](https://github.com/dinbror/blazy)

[react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component)

#### 使用渐进式图片

#### 使用[响应式图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

```html
<img
  srcset="
    elva-fairy-320w.jpg 320w,
    elva-fairy-480w.jpg 480w,
    elva-fairy-800w.jpg 800w
  "
  sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

## 字体优化

[font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)

[font-display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face/font-display)
