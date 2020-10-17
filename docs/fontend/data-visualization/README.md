---
sidebar: auto
---

# 数据可视化

数据可视化，是关于数据视觉表现形式的科学技术研究

## 基础

### canvas

[canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 是 HTML5 的新特性，它允许我们使用 canvas 元素在网页上通过 JavaScript 绘制图像。

::: demo [vanilla]

```html
<html>
  <canvas id="canvas-test" width="800" height="800"></canvas>
</html>
<script>
  const canvas = document.getElementById('canvas-test') // 获取 DOM 对象
  const ctx = canvas.getContext('2d') // 获取 Canvas 对象
  ctx.fillStyle = 'red' // 填充为红色
  ctx.fillRect(0, 0, 50, 50) // 绘制矩形

  ctx.beginPath() // 开始绘制路径
  ctx.lineWidth = 1 // 线条宽度
  ctx.strokeStyle = 'blue' // 线条填充色
  ctx.moveTo(100, 100) // 起点坐标
  ctx.lineTo(250, 75) // 中间点坐标
  ctx.lineTo(300, 100) // 终点坐标
  ctx.stroke() // 绘制线段

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'green' // 圆形边框色
  ctx.fillStyle = 'red' // 圆形填充色
  ctx.arc(200, 200, 50, 0, 2 * Math.PI) // 绘制圆形
  ctx.stroke() // 绘制圆形的边框
  ctx.fill() // 绘制圆形的填充色

  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.strokeStyle = 'red'
  ctx.moveTo(300, 300)
  ctx.lineTo(301, 301) // 绘制一个点
  ctx.stroke()
</script>
<style></style>
```

:::

### canvas 图片压缩

::: demo [vanilla]

```html
<html>
  <input type="file" id="upload" />
</html>
<script>
  const ACCEPT = ['image/jpg', 'image/png', 'image/jpeg'] // 限定图片文件类型
  const MAXSIZE = 1024 * 1024 * 3 // 限定图片最大容量
  const MAXSIZE_STR = '3MB'
  function convertImageToBase64(file, cb) {
    let reader = new FileReader()
    reader.addEventListener('load', function(e) {
      const base64Image = e.target.result // 获取文件内容，等同于 reader.result
      cb(base64Image)
      reader = null
    })
    reader.readAsDataURL(file) // 读取 file 对象中的内容
  }
  function compress(base64Image, cb) {
    let maxW = 1024
    let maxH = 1024

    const image = new Image()
    image.addEventListener('load', function() {
      let ratio // 压缩比
      let needCompress = false // 是否需要压缩
      if (maxW < image.naturalWidth) {
        needCompress = true
        ratio = image.naturalWidth / maxW
        maxH = image.naturalHeight / ratio
      }
      if (maxH < image.naturalHeight) {
        needCompress = true
        ratio = image.naturalHeight / maxH
        maxW = image.naturalWidth / ratio
      }
      if (!needCompress) {
        maxW = image.naturalWidth
        maxH = image.naturalHeight
      }
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', '__compress__')
      canvas.width = maxW
      canvas.height = maxH
      canvas.style.visibility = 'hidden'
      document.body.append(canvas)

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, maxW, maxH)
      ctx.drawImage(image, 0, 0, maxW, maxH) // 渲染图片
      const compressImage = canvas.toDataURL('image/jpeg', 0.9) // 压缩图片
      cb(compressImage)
      const _image = new Image()
      _image.src = compressImage
      document.body.appendChild(_image)
      canvas.remove() // 移除 canvas
    })
    image.src = base64Image // 将图片设置到 image 的 src 属性中
    document.body.appendChild(image)
  }
  function uploadImage(compressImage) {
    console.log('upload image to server...', compressImage)
  }

  const upload = document.getElementById('upload')
  upload.addEventListener('change', function(e) {
    const file = e.target.files[0]
    console.log(file)
    if (!file) {
      return
    }
    const { type: fileType, size: fileSize } = file
    // 图片类型检查
    if (!ACCEPT.includes(fileType)) {
      alert('不支持上传该格式文件！')
      upload.value = ''
      return
    }
    // 图片大小检查
    if (fileSize > MAXSIZE) {
      alert('文件超出' + MAXSIZE_STR + '！')
      upload.value = ''
      return
    }
    // 压缩文件
    convertImageToBase64(file, base64Image =>
      compress(base64Image, uploadImage)
    )
  })
</script>
<style></style>
```

:::

### SVG

[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) 是一种基于 XML 的图像文件格式，它的英文全称为 Scalable Vector Graphics，意思为可缩放的矢量图形

::: demo [vanilla]

```html
<html>
  <svg width="800" height="800">
    <rect
      width="50"
      height="50"
      style="fill:red;stroke-width:0;stroke:rgb(0,0,0);"
    />
    <line
      x1="100"
      y1="100"
      x2="250"
      y2="75"
      style="stroke:blue;stroke-width:1"
    />
    <line
      x1="250"
      y1="75"
      x2="300"
      y2="100"
      style="stroke:blue;stroke-width:1"
    />
    <circle
      cx="200"
      cy="200"
      r="50"
      stroke="green"
      stroke-width="2"
      fill="red"
    />
    <line
      x1="300"
      y1="300"
      x2="301"
      y2="301"
      style="stroke:red;stroke-width:1"
    />
  </svg>
</html>
<script></script>
<style></style>
```

:::

### WebGL

WebGL（Web Graphics Library）是一种 3D 绘图协议，WebGL 可以为 HTML5 Canvas 提供硬件 3D 加速渲染，这样 Web 开发人员就可以借助系统显卡来在浏览器里更流畅地展示 3D 场景和模型了，还能创建复杂的导航和数据视觉化。
::: demo [vanilla]

```html
<html>
  <canvas id="canvas-webgl-test" width="200px" height="200px"></canvas>
</html>
<script>
  window.onload = function() {
    //顶点着色器程序
    var VSHADER_SOURCE =
      'void main() {' +
      //设置坐标
      'gl_Position = vec4(0.0, 0.0, 0.0, 1.0); ' +
      //设置尺寸
      'gl_PointSize = 10.0; ' +
      '} '

    //片元着色器
    var FSHADER_SOURCE =
      'void main() {' +
      //设置颜色
      'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
      '}'
    //获取canvas元素
    var canvas = document.getElementById('canvas-webgl-test')
    //获取绘制二维上下文
    var gl = canvas.getContext('webgl')
    if (!gl) {
      console.log('Failed')
      return
    }
    //编译着色器
    var vertShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertShader, VSHADER_SOURCE)
    gl.compileShader(vertShader)

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragShader, FSHADER_SOURCE)
    gl.compileShader(fragShader)
    //合并程序
    var shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertShader)
    gl.attachShader(shaderProgram, fragShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)

    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
</script>
<style></style>
```

:::

### zrender

[zrender](https://ecomfe.github.io/zrender-doc/public/examples/animation.html) 是二维绘图引擎，它提供 Canvas、SVG、VML 等多种渲染方式。ZRender 也是 ECharts 的渲染器。

::: demo [vanilla]

```html
<html>
  <div id="container" style="width: 800px;height: 800px;"></div>
</html>
<script>
  var zr = zrender.init(document.getElementById('container'))
  var rect = new zrender.Rect({
    shape: {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    },
    style: {
      fill: 'red',
      lineWidth: 0,
    },
  })
  var line = new zrender.Polyline({
    shape: {
      points: [
        [100, 100],
        [250, 75],
        [300, 100],
      ],
    },
    style: {
      stroke: 'blue',
      lineWidth: 1,
    },
  })
  var circle = new zrender.Circle({
    shape: {
      cx: 200,
      cy: 200,
      r: 50,
    },
    style: {
      fill: 'red',
      stroke: 'green',
      lineWidth: 2,
    },
  })
  var point = new zrender.Polyline({
    shape: {
      points: [
        [300, 300],
        [301, 301],
      ],
    },
    style: {
      stroke: 'red',
      lineWidth: 1,
    },
  })
  zr.add(rect)
  zr.add(line)
  zr.add(circle)
  zr.add(point)
</script>
<style></style>
```

```json
{
  "jsLib": ["https://cdn.jsdelivr.net/npm/zrender@4.3.0/dist/zrender.js"]
}
```

:::

### D3

[D3](https://d3js.org/)（Data-Driven Documents） 是一个 Javascript 图形库，基于 Canvas、Svg 和 HTML。

::: demo [vanilla]

```html
<html>
  <p class="p">Vue</p>
  <p class="p">React</p>
  <p class="p">Agular</p>
  <button id="datum">datum</button>
  <button id="data">data</button>
</html>
<script>
  var body = d3.select('body')
  // var p = body.selectAll('p')
  var p = body.selectAll('.p')
  function doDatum() {
    // datum
    var str = 'Framework'
    p.datum(str)
    p.text(function(d, i) {
      return `${d}-${i}`
    })
  }
  function doData() {
    // data
    var dataset = ['Vue', 'React', 'Agular']
    p.data(dataset).text(function(d, i) {
      return `${d}-${i}`
    })
  }
  document.getElementById('datum').addEventListener('click', function(e) {
    doDatum()
  })
  document.getElementById('data').addEventListener('click', function(e) {
    doData()
  })
</script>
<style></style>
```

```json
{
  "jsLib": ["https://d3js.org/d3.v5.js"]
}
```

:::

### Three.js

[Three.js](https://github.com/mrdoob/three.js) 是一个基于 WebGL 的 Javascript 3D 图形库

::: demo [vanilla]

```html
<html></html>
<script>
  var camera, scene, renderer
  var geometry, material, mesh

  init()
  animate()

  function init() {
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    )
    camera.position.z = 1
    scene = new THREE.Scene()
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    material = new THREE.MeshNormalMaterial()
    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
  }

  function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.02
    renderer.render(scene, camera)
  }
</script>
<style></style>
```

````json
{

  "jsLib": ["https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.js"]
}

:::

### Highcharts

Highcharts 是一个用纯 JavaScript 编写的一个图表库， 能够很简单便捷的在 web 网站或是 web 应用程序添加有交互性的图表，并且免费提供给个人学习、个人网站和非商业用途使用。Highcharts 系列包含 Highcharts JS，Highstock JS，Highmaps JS 共三款软件，均为纯 JavaScript 编写的 HTML5 图表库。

::: demo [vanilla]

```html
<html></html>
<script></script>
<style></style>
````

:::

### AntV

AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。

AntV 包括以下解决方案：

- G2：可视化引擎
- G2Plot：图表库
- G6：图可视化引擎
- Graphin：基于 G6 的图分析组件
- F2：移动可视化方案
- ChartCube：AntV 图表在线制作
- L7：地理空间数据可视化

::: demo [vanilla]

```html
<html></html>
<script></script>
<style></style>
```

:::

### ECharts

::: demo [vanilla]

```html
<html></html>
<script></script>
<style></style>
```

:::
