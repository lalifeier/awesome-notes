# 下载文件

## a 标签 download 属性

```html
<a href="url" download="fileName">下载</a>
```

## window.open 或 location.href

```js
window.open(url)
location.href = url
```

## Blob 对象

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

### get 请求

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

### post 请求

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

## canvas 将图片转换为 base64 格式

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
