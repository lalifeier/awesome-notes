---
sidebar: auto
---

# 前端笔记

## 布局

### 水平居中

1. 文本/行内元素/行内块级元素

```css
#parent {
  text-align: center;
}
```

2. 单个块级元素

```css
#son {
  width: 100px; /*定宽*/
  margin: 0 auto;
}
```

3. 多个块级元素

```css
#parent {
  text-align: center;
}
.son {
  display: inline-block;
}
```

4. 使用绝对定位实现

```css
#parent {
  width: 200px;
  height: 200px;
  position: relative;
  background-color: #f00;
}
#son {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%; /*父元素宽度一半,这里等同于left:100px*/
  transform: translateX(-50%); /*自身宽度一半,等同于margin-left: -50px;*/
  background-color: #00ff00;
}
```

5. 任意个元素(flex)

```css
#parent {
  display: flex;
  justify-content: center;
}
```

### 垂直居中

1. 单行文本/行内元素/行内块级元素

```css
#parent {
  height: 150px;
  line-height: 150px; /*与height等值*/
}
```

2. 多行文本/行内元素/行内块级元素

```css
/*或者用span把所有文字包裹起来，设置display：inline-block转换成图片的方式解决*/
#parent {
  height: 150px;
  line-height: 30px; /*元素在页面呈现为5行,则line-height的值为height/5*/
}
```

3. 图片

```css
#parent {
  height: 150px;
  line-height: 150px;
  font-size: 0;
}
img #son {
  vertical-align: middle;
} /*默认是基线对齐，改为middle*/
```

4. 单个块级元素

- 使用 tabel-cell 实现

```css
#parent {
  display: table-cell;
  vertical-align: middle;
}
```

- 使用绝对定位实现

```css
/*原理：子绝父相，top、right、bottom、left的值是相对于父元素尺寸的，然后margin或者transform是相对于自身尺寸的，组合使用达到水平居中的目的*/
#parent {
  height: 150px;
  position: relative; /*父相*/
}
#son {
  position: absolute; /*子绝*/
  top: 50%; /*父元素高度一半,这里等同于top:75px;*/
  transform: translateY(-50%); /*自身高度一半,这里等同于margin-top:-25px;*/
  height: 50px;
}

/* 或 */
/*原理：当top、bottom为0时,margin-top&bottom会无限延伸占满空间并且平分*/
#parent {
  position: relative;
}
#son {
  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
  height: 50px;
}
```

- 使用 flex 实现

```css
#parent {
  display: flex;
  align-items: center;
}

/* 或  */
#parent {
  display: flex;
}
#son {
  align-self: center;
}

/* 或 */
/*原理：这个尚未搞清楚，应该是flex使margin上下边界无限延伸至剩余空间并平分了*/
#parent {
  display: flex;
}
#son {
  margin: auto 0;
}
```

5. 任意个元素(flex)

```css
#parent {
  display: flex;
  align-items: center;
}

/* 或  */
#parent {
  display: flex;
}
.son {
  align-self: center;
}

/* 或  */
#parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

### 水平垂直居中

1. 行内/行内块级/图片

```css
```

2. table-cell

```css
```

3. button 作为父元素

```css
```

4. 绝对定位

```css
```

5. 绝对居中

```css
```

6. flex

```css
```

7. 视窗居中

```css
```

### 两列布局

1. 左列定宽,右列自适应

2. 左列自适应,右列定宽

3. 一列不定,一列自适应

### 三列布局

1. 两列定宽,一列自适应

2. 两侧定宽,中间自适应

### 多列布局

1. 等宽布局

2. 九宫格布局

3. 栅格系统

### 全屏布局

1. 使用绝对定位实现

2. 使用 flex 实现

3. 使用 Grid 实现

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

## 百分比比较大小

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