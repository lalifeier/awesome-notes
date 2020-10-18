---
sidebar: auto
---

# CSS

## 浏览器

### 磨平浏览器默认样式

每个浏览器的 CSS 默认样式不尽相同,所以最简单最有效的方法就是 对其默认样式初始化。

```css
* {
  margin: 0;
  padding: 0;
}
```

懒人必备的浏览器默认样式库：[normalize.css](https://github.com/necolas/normalize.css)

### 插入浏览器私有属性

编写私有属性的顺序需特别注意:兼容性写法放到前面,标准写法放到最后。在浏览器解析 CSS 过程中,若标准属性无法使用则使用当前浏览器对应的私有属性。

```css
/* Chrome
、 Safari 、 New
、
Opera New Edge */
-webkit-transform: translate(10px, 10px);
/* Firefox */
-moz-transform: translate(10px, 10px);
/* IExplorer
、 Old
Edge */
-ms-transform: translate(10px, 10px);
/* Old Opera */
-o-transform: translate(10px, 10px);
/*
标准
*/
transform: translate(10px, 10px);
```

当然不是所有的 CSS3 属性都需补⻬ -webkit- 、 -moz- 、 -ms- 或 -o- ,上述 Demo 只是一个示例,真正的 transform 私有属性只有 -webkit- 和 -ms- 。这些需查看 Caniuse 确保正确的编写,若想偷懒也可全部写上。

在使用 Webpack 打包项目代码的过程中,可接入 postcss-loader 和 postcss-preset-env , postcss-preset-env 内置了 autoprefixer ,它会依据 [Caniuse](https://caniuse.com/) 所提供的数据对代码里的 CSS3 属性批量添加私有属性。

### CSS Hack

CSS Hack 指针对不同浏览器编写不同 CSS ,让它能够同时兼容不同浏览器,在不同浏览器中渲染想要的效果。

```html
<head>
  <!--[if IE]>
    <style>
      .elem {
        background-color: #f66;
      }
    </style>
  <![endif]-->
</head>
<style>
  .elem {
    background-color: #f66; /* IExplorer 8+ */
    *background-color: #f66; /*IExplorer 7 */
    _background-color: #f66; /* IExplorer 6 */
  }
</style>
```

## 盒模型

### 组成

盒模型由以下属性组成,由外到内用公式表示就是: box = margin + border + padding + content 。除了 content ( 不是属性,作为盒模型扩展理解使用 ) ,其余属性都包含 left 、 right 、 top 和 bottom 等扩展属性。

- margin :边距,外部透明区域,负责隔离相邻盒子
- border :边框,内部着色区域,负责隔离边距和填充,包含 width 、 style 、 color 三个扩展属性
- padding :填充,内部着色区域,负责扩展盒子内部尺寸
- content :内容,以 文本 或 节点 存在的占用位置

padding 着色随 background-color 而变,可用 background-clip 隔离。

### 类型

由于历史原因,盒模型分化成两种类型,分别是标准盒模型和怪异盒模型。

CSS3 里提供一个属性用于声明盒模型的类型,它就是 box-sizing 。

- content-box :标准盒模型 ( 默认 )
- border-box :怪异盒模型

它不具备继承性,若全局统一盒模型,那只能使用 `*`声明 box-sizing 了。

1. 标准盒模型

标准盒模型是 W3C 规范的标准,由 margin + border + padding + content 组成。与上述提到的公式一
模一样,节点的 width/height 只包含 content ,不包含 padding 和 border 。

节点的尺寸计算公式如下。

- 横向: margin-[left/right] + border-[left/right] + padding-[left/right] + width
- 纵向: margin-[top/bottom] + border-[top/bottom] + padding-[top/bottom] + height

节点的宽高计算公式如下。

- 横向: width = width
- 纵向: height = height

2. 怪异盒模型

怪异盒模型又名 IE 盒子模型 ,是 IExplore 制定的标准,由 margin + content 组成。与上述提到的公式
一不同,节点的 width/height 包含 border 、 padding 和 content 。

节点的尺寸计算公式如下。

- 横向: margin-[left/right] + width ( 包含 border-[left/right] 和 padding-[left/right] )
- 纵向: margin-[top/bottom] + height ( 包含 border-[top/bottom] 和 padding-[top/bottom] )

节点的宽高计算公式如下。

- 横向: width = border + padding + width
- 纵向: height = border + padding + height

在 IExplore 中,若 HTML 文档缺失 `<!doctype html>`声明则会触发怪异盒模型

### 视觉格式化模型

1. 块级元素

当节点的 display 声明为 block 、 list-item 、 table 、 flex 或 grid 时,该节点被标记为块级元素。块级元素默认宽度为 100% ,在垂直方向上按顺序放置,同时参与块格式化上下文。

2. 行内元素

当节点的 display 声明为 inline 、 inline-block 、 inline-table 、 inline-flex 或 inline-grid 时,该节点被标记为行内元素。行内元素默认宽度为 auto ,在水平方向上按顺序放置,同时参与行内格式化上下文。

#### 区别

- 互相转换
  - 块级元素转换行内元素: display:inline
  - 行内元素转换块级元素: display:block
- 占位表现
  - 块级元素默认独占一行,默认宽度为父元素的 100% ,可声明边距、填充、宽高
  - 行内元素默认不独占一行 ( 一行可多个 ) ,默认宽度随内容自动撑开,可声明水平边距和填充,不可声明垂直边距和宽高
- 包含关系
  - 块级元素可包含块级元素和行内元素
  - 行内元素可包含行内元素,不能包含块级元素

### 格式化上下文

格式化上下文指决定渲染区域里节点的排版、关系和相互作用的渲染规则。

1. 块格式化上下文

BFC 是⻚面上一个独立且隔离的渲染区域,容器里的子节点不会在布局上影响到外面的节点,

#### 规则

- 子节点在垂直方向上按顺序放置
- 子节点的垂直方向距离由 margin 决定,相邻节点的 margin 会发生重叠,以最大 margin 为合并值
- 每个节点的 margin-left/right 与父节点的 左边 / 右边 相接触,即使处于浮动也如此,除非自行形成 BFC
- BFC 区域不会与同级浮动区域重叠
- BFC 是一个隔离且不受外界影响的独立容器
- 计算 BFC 高度时其浮动子节点也参与计算

#### 成因

- 非溢出可⻅节点: overflow:!visible
- 浮动节点: float:left/right
- 绝对定位节点: position:absolute/fixed
- 被定义成块级的非块级节点: display:inline-block/table-cell/table-caption/flex/inline-flex
- 父节点与正常文档流的子节点 ( 非浮动 ) 自动形成 BFC

#### 场景

- 清除浮动
- 已知宽度水平居中
- 防止浮动节点被覆盖
- 防止垂直 margin 合并

面试中常问到的 margin 塌陷 问题,可用 BFC 的概念回答了。所谓的塌陷其实是两个 BFC 的相邻盒或父子盒相互作用时产生的效果,两个盒子会取相邻边最大 margin 作为相邻边的共用 margin 。

- 两个盒子相邻边的 margin 都为正值,取最大值
- 两个盒子相邻边的 margin 都为负值,取最小值,两者会互相重合
- 两个盒子相邻边的 margin 一正一负,取两者相加值,若结果为负,两者会互相重合

2. 行内格式化上下文

IFC 的宽高由行内子元素中最大的实际高度确定,不受垂直方向的 margin 和 padding 影响。另外, IFC 中不能存在块元素,若插入块元素则会产生对应个数的匿名块并互相隔离,即产生对应个数的 IFC ,每个 IFC 对外表现为块级元素,并垂直排列。

#### 规则

- 节点在水平方向上按顺序放置
- 节点无法指定宽高,其 margin 和 padding 在水平方向有效在垂直方向无效
- 节点在垂直方向上以不同形式对⻬
- 节点的宽度由包含块和浮动决定,高度由行高决定

#### 成因

- 行内元素: display:inline[-x]
- 声明 line-height
- 声明 vertical-align
- 声明 font-size

3. 弹性格式化上下文

声明 display 为 flex 或 inline-flex 时,节点会生成一个 FFC 的独立容器,主要用于 响应式布局 。

4. 格栅格式化上下文

声明 display 为 grid 或 inline-grid 时,节点会生成一个 GFC 的独立容器,主要用于 响应式布局 。GFC 有点像 `<table>` ,同为二维表格,但是 GFC 会有更丰富的属性控制行列、对⻬以及更为精细的渲染语义和控制。

### 文档流

文档流指节点在排版布局过程中默认使用从左往右从上往下的流式排列方式。在窗体自上而下分成一行
行,且每行按照从左至右的顺序排列节点,其显著特点就是 从左往右从上往下 。

#### 类型

- HTML 级别
  - 容器级元素: `<div>` 、 `<ul>` 、 `<li>` 等
  - 文本级元素: `<a>` 、 `<p>` 、 `<span>` 等
- CSS 级别
  - 块级元素: `<div>` 、 `<ul> 、`<li>` 等
  - 行内元素: `<a>` 、 `<p>`、 `<span>` 等

#### 微观现象

- 空白折叠: HTML 中换行编写行内元素,排版会出现 5px 空隙
- 高矮不⻬:行内元素统一以底边垂直对⻬
- 自动换行:排版若一行无法完成则换行接着排版

解决 5px 空隙

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

```css
ul {
  text-align: center;
}
li {
  display: inline-block;
}
```

第一种,必须紧密连接节点。

```
<ul>
<li></li><li></li><li></li>
</ul>
```

第二种,子节点声明 margin-left:-5px 。

```css
li {
  display: inline-block;
  margin-left: -5px;
}
```

第三种,使用 Flex 布局 居中显示。

```css
ul {
  display: flex;
  justify-content: center;
}
```

### 脱流文档流

脱流文档流指节点脱流正常文档流后,在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流,计算其父节点高度时不会将其高度纳入,脱流节点不占据空间,因此添加浮动或定位后会对周围节点布局产生或多或少的影响。

- 浮动布局: float:left/right
- 定位布局: position:absolute/fixed

Float 方式：节点参与浮动布局后,自身脱流但其文本不脱流 。

Position 方式：节点参与定位布局后,自身及其文本一起脱流 。

### 显隐影响

- 节点不可⻅但占据空间,显隐时可过渡: visibility:hidden
- 节点不可⻅但占据空间,不可点击: visibility:hidden
- 节点不可⻅不占据空间,可访问 DOM : display:none
- 节点不可⻅但占据空间,可点击: opacity:0
- 节点不可⻅不占据空间,可点击: position:absolute; opacity:0
- 节点不可⻅但占据空间,不可点击: position:relative; z-index:-1
- 节点不可⻅不占据空间,不可点击: position:absolute; z-index:-1

### 层叠上下文

层叠上下文指盒模型在三维空间 Z 轴 上所表现的行为。每个盒模型存在于一个三维空间中,分别是平面画布的 X 轴 Y 轴 和表示层叠的 Z 轴 。

- z-index 只在声明定位的节点上起效
- 节点在 Z 轴 的层叠顺序依据 z-index 、 层叠上下文 和 层叠等级 共同决定

## 样式计算

### 优先级别

#### 特点

- 使用 就近原则
- 继承样式 的优先级别最低
- `!important` 样式 的优先级别最高,若冲突则重新计算

#### 权重

- 1000 : 内联样式 、 外联样式
- 100 : ID 选择器
- 10 : 类选择器 、 伪类选择器 、 属性选择器
- 1 : 元素选择器 、 伪元素选择器
- 0 : 通配选择器 、 后代选择器 、 兄弟选择器

### ⻓度单位

单位 定义 类型 描述

| 单位 |     定义     |   类型   |                描述                |
| :--: | :----------: | :------: | :--------------------------------: |
|  px  |     像素     | 绝对单位 |                 -                  |
|  pt  |      点      | 绝对单位 |            1pt = 1/72in            |
|  pc  |      派      | 绝对单位 |             1pc = 12pt             |
|  mm  |     毫米     | 绝对单位 |                 -                  |
|  in  |     英寸     | 绝对单位 |         1in = 96px =2.54cm         |
|  %   |    百分比    | 相对单位 | 相对父节点,宽度对应,高度不一定对应 |
|  em  |   M 的宽度   | 相对单位 |          相对当前节点字体          |
| rem  |   M 的宽度   | 相对单位 |           相对根结点字体           |
|  ch  |   0 的宽度   | 相对单位 |          相对当前节点字体          |
|  ex  |   x 的宽度   | 相对单位 |          相对当前节点字体          |
|  vw  | 1% 视窗宽度  | 相对单位 |              相对视窗              |
|  vh  | 1% 视窗高度  | 相对单位 |              相对视窗              |
| vmin | vw/vh 最小者 | 相对单位 |              相对视窗              |
| vmax | vw/vh 最大者 | 相对单位 |              相对视窗              |

- 1vmin 表示 1% 视窗宽度和 1% 视窗高度中最小者
- 1vmax 表示 1% 视窗宽度和 1% 视窗高度中最大者

针对移动端,结合 JS 依据屏幕宽度与设计图宽度的比例动态声明`<html>`的 `font-size` ,以
rem 为⻓度单位声明所有节点的几何属性,这样就能做到大部分移动设备的⻚面兼容,兼容出入比较大的
地方再通过 媒体查询 做特别处理。

```js
function AutoResponse(width = 750) {
  const target = document.documentElement
  if (target.clientWidth >= 600) {
    target.style.fontSize = '80px'
  } else {
    target.style.fontSize = (target.clientWidth / width) * 100 + 'px'
  }
}
AutoResponse()
```

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
```

视窗宽高在 JS 中分别对应 window.innerWdith 和 window.innerHeight 。若不考虑低版本浏览器的兼容,完全可用一行 CSS 代码秒杀所有移动端的伸缩方案。

```css
/*基于 UIwidth=750px DPR=2的⻚面*/
html {
  font-size: calc(100vw / 7.5);
}
```

## 布局

### 基本布局

- 普通布局: display:block/inline
- 浮动布局: float:left/right
- 定位布局: position:relative/absolute/fixed 、 left/right/top/bottom/z-index
- 表格布局: table 系列属性
- 弹性布局: display:flex/inline-flex 、 flex 系列属性
- 多列布局: column 系列属性
- 格栅布局: display:grid/inline-grid 、 grid 系列属性
- 响应式布局: em/rem/vw/vh/vmin/vmax 、 媒体查询

### 清除浮动

```css
.clearfix::after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  font-size: 0;
  content: '';
}
```

### 全屏布局

经典的 全屏布局 由顶部、底部、主体三部分组成,其特点为 三部分左右满屏拉伸 、 顶部底部高度固定 和 主体高度自适应 ,主要应用在主体布局。该布局很常⻅,也是大部分 Web 应用主体的主流布局。通常使用`<header>` 、 `<footer>` 和 `<main>` 三个标签语义化排版, `<main>` 内还可插入 `<aside>` 作为侧栏。

1. position + left/right/top/bottom

::: demo [vanilla]

```html
<html>
  <div class="fullscreen-layout">
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</html>
<script></script>
<style>
  .fullscreen-layout {
    width: 400px;
    height: 400px;
    position: relative;
  }
  .fullscreen-layout > header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* width: 100%; */
    height: 50px;
    background-color: red;
  }
  .fullscreen-layout > footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /* width: 100%; */
    height: 50px;
    background-color: red;
  }
  .fullscreen-layout > main {
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    /* width: 100%; */
    background-color: green;
  }
</style>
```

:::

2. flex

::: demo [vanilla]

```html
<html>
  <div class="fullscreen-layout-flex">
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</html>
<script></script>
<style>
  .fullscreen-layout-flex {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
  }
  .fullscreen-layout-flex > header {
    height: 50px;
    background-color: red;
  }
  .fullscreen-layout-flex > footer {
    height: 50px;
    background-color: red;
  }
  .fullscreen-layout-flex > main {
    flex: 1;
    background-color: green;
  }
</style>
```

:::

### 两列布局

经典的 两列布局 由左右两列组成,其特点为 一列宽度固定 、 另一列宽度自适应和两列高度固定且相等 。

1. float + margin-left/right

::: demo [vanilla]

```html
<html>
  <div class="two-column-layout">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .two-column-layout {
    width: 400px;
    height: 400px;
  }
  .two-column-layout > .left {
    float: left;
    width: 100px;
    height: 100%;
    background-color: red;
  }
  .two-column-layout > .right {
    margin-left: 100px;
    height: 100%;
    background-color: green;
  }
</style>
```

:::

2. overflow + float

::: demo [vanilla]

```html
<html>
  <div class="two-column-layout-overflow">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .two-column-layout-overflow {
    width: 400px;
    height: 400px;
  }
  .two-column-layout-overflow > .left {
    float: left;
    width: 100px;
    height: 100%;
    background-color: red;
  }
  .two-column-layout-overflow > .right {
    overflow: hidden;
    height: 100%;
    background-color: green;
  }
</style>
```

:::

3. flex

::: demo [vanilla]

```html
<html>
  <div class="two-column-layout-flex">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .two-column-layout-flex {
    display: flex;
    width: 400px;
    height: 400px;
  }
  .two-column-layout-flex > .left {
    width: 100px;
    background-color: red;
  }
  .two-column-layout-flex > .right {
    flex: 1;
    background-color: green;
  }
</style>
```

:::

### 三列布局

经典的三列布局 由左中右三列组成,其特点为 连续两列宽度固定 、 剩余一列宽度自适应和三列高度固定且相等 。

1. overflow + float

::: demo [vanilla]

```html
<html>
  <div class="three-column-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .three-column-layout {
    width: 400px;
    height: 400px;
  }
  .three-column-layout > .left {
    float: left;
    width: 50px;
    height: 100%;
    background-color: red;
  }
  .three-column-layout > .center {
    float: left;
    width: 100px;
    height: 100%;
    background-color: blue;
  }
  .three-column-layout > .right {
    height: 100%;
    overflow: hidden;
    background-color: green;
  }
</style>
```

:::

2. flex

::: demo [vanilla]

```html
<html>
  <div class="three-column-layout">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .three-column-layout-flex {
    width: 400px;
    height: 400px;
    display: flex;
  }
  .three-column-layout-flex > .left {
    width: 50px;
    background-color: red;
  }
  .three-column-layout-flex > .center {
    width: 100px;
    background-color: blue;
  }
  .three-column-layout-flex > .right {
    flex: 1;
    background-color: green;
  }
</style>
```

:::

### 圣杯布局与双⻜翼布局

经典的圣杯布局和双⻜翼布局 都是由左中右三列组成,其特点为 左右两列宽度固定、中间一列宽度自适应 和三列高度固定且相等 。

圣杯布局 和 双⻜翼布局 在大体相同下也存在一点不同,区别在于 双⻜翼布局 中间列需插入一个子节点。在
常规的实现方式中也是在这个中间列里做文章, 如何使中间列内容不被左右列遮挡 。

- 相同
  - 中间列放首位且声明其宽高占满父节点
  - 被挤出的左右列使用 float 和 margin 负值 将其拉回与中间列处在同一水平线上
- 不同
  - 圣杯布局:父节点声明 padding 为左右列留出空位,将左右列固定在空位上
  - 双⻜翼布局:中间列插入子节点并声明 margin 为左右列让出空位,将左右列固定在空位上

1. 圣杯布局 float + margin-left/right + padding-left/right

::: demo [vanilla]

```html
<html>
  <div class="grail-layout">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
  </div>
</html>
<script></script>
<style>
  .grail-layout {
    width: 400px;
    height: 400px;
    padding: 0 100px;
  }
  .grail-layout > .left {
    float: left;
    width: 100px;
    height: 100%;
    background-color: red;
    margin-left: -100px;
  }
  .grail-layout > .right {
    float: right;
    width: 100px;
    height: 100%;
    background-color: green;
    margin-right: -100px;
  }
  .grail-layout > .center {
    height: 100%;
    background-color: blue;
  }
</style>
```

:::

2. 双⻜翼布局 float + margin-left/right

::: demo [vanilla]

```html
<html>
  <div class="grail-layout-margin">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">
      <div></div>
    </div>
  </div>
</html>
<script></script>
<style>
  .grail-layout-margin {
    width: 400px;
    height: 400px;
  }
  .grail-layout-margin > .left {
    float: left;
    width: 100px;
    height: 100%;
    background-color: red;
  }
  .grail-layout-margin > .right {
    float: right;
    width: 100px;
    height: 100%;
    background-color: green;
  }
  .grail-layout-margin > .center {
    margin: 0 100px;
    height: 100%;
    background-color: blue;
  }
</style>
```

:::

3. 圣杯布局 / 双⻜翼布局 flex

::: demo [vanilla]

```html
<html>
  <div class="grail-layout-flex">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</html>
<script></script>
<style>
  .grail-layout-flex {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: row;
  }
  .grail-layout-flex > .left {
    width: 100px;
    background-color: red;
  }
  .grail-layout-flex > .right {
    width: 100px;
    background-color: green;
  }
  .grail-layout-flex > .center {
    flex: 1;
    background-color: blue;
  }
</style>
```

:::

### 均分布局

经典的 均分布局 由多列组成,其特点为 每列宽度相等 和 每列高度固定且相等 。

1. float + width

::: demo [vanilla]

```html
<html>
  <div class="average-layout">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
</html>
<script></script>
<style>
  .average-layout {
    width: 400px;
    height: 400px;
  }
  .average-layout > div {
    float: left;
    width: 25%;
    height: 100%;
  }
  .average-layout > .one {
    background-color: red;
  }
  .average-layout > .two {
    background-color: green;
  }
  .average-layout > .three {
    background-color: yellow;
  }
  .average-layout > .four {
    background-color: blue;
  }
</style>
```

:::

2. column

::: demo [vanilla]

```html
<html>
  <div class="average-layout-column">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
</html>
<script></script>
<style>
  .average-layout-column {
    width: 400px;
    height: 400px;
    column-count: 4;
    column-gap: 0;
  }
  .average-layout-column > div {
    height: 100%;
  }
  .average-layout-column > .one {
    background-color: red;
  }
  .average-layout-column > .two {
    background-color: green;
  }
  .average-layout-column > .three {
    background-color: yellow;
  }
  .average-layout-column > .four {
    background-color: blue;
  }
</style>
```

:::

3. flex

::: demo [vanilla]

```html
<html>
  <div class="average-layout-flex">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
</html>
<script></script>
<style>
  .average-layout-flex {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: row;
  }
  .average-layout-flex > div {
    flex: 1;
  }
  .average-layout-flex > .one {
    background-color: red;
  }
  .average-layout-flex > .two {
    background-color: green;
  }
  .average-layout-flex > .three {
    background-color: yellow;
  }
  .average-layout-flex > .four {
    background-color: blue;
  }
</style>
```

:::

### 居中布局

- 水平居中
  - margin:0 auto + width:fit-content : 全部元素
  - 块级元素 + margin:0 auto + width : 块级元素
    - 若节点不是块级元素需声明 display:block
    - 若节点宽度已隐式声明则无需显式声明 width
  - 行内元素 + text-aligin:center : 行内元素
    - 父节点上声明 text-align
    - 若节点不是行内元素需声明 display:inline/inline-block
  - position + left/right + margin-left/right + width : 全部元素
  - position + left/right + transform:translateX(-50%) : 全部元素
  - display:flex + justify-content:center : 全部元素
    - 父节点上声明 display 和 justify-content
- 垂直居中
  - 块级元素 + padding-top/bottom : 块级元素
    - 父节点高度未声明或自适应
    - 若节点不是块级元素需声明 display:block
  - 行内元素 + line-height : 行内元素
    - 父节点上声明 line-height
    - 若节点不是行内元素需声明 display:inline/inline-block
  - display:table + display:table-cell + vertical-align:middle : 全部元素
    - 父节点上声明 display:table
  - display:table-cell + vertical-align:middle : 全部元素
    - 父节点上声明 display 和 vertical-align
  - position + top/bottom + margin-top/bottom + height : 全部元素
  - position + top/bottom + transform:translateY(-50%) : 全部元素
    - display:flex + align-items:center : 全部元素
  - 父节点上声明 display 和 align-items
    - display:flex + margin:auto 0

::: demo [vanilla]

```html
<html>
  <div class="center-layout">
    <div></div>
  </div>
</html>
<script></script>
<style>
  .center-layout {
    width: 400px;
    height: 400px;
    background-color: red;
    text-align: center;
    line-height: 400px;
    font-size: 0;
  }
  .center-layout > div {
    width: 100px;
    height: 100px;
    background-color: blue;
    display: inline-block;
    vertical-align: middle;
  }
</style>
```

:::

1. display:inline-block

```css
.center-layout {
  text-align: center;
  line-height: 400px;
  font-size: 0;
}
.center-layout > div {
  display: inline-block;
  vertical-align: middle;
}
```

2. display:table-cell

```css
.center-layout-table {
  display: table-cell;
  vertical-align: middle;
}
.center-layout-table > div {
  margin: 0 auto;
}
```

3. position

```css
.center-layout-position {
  width: 400px;
  height: 400px;
  background-color: red;
  position: relative;
}
.center-layout-position > div {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: absolute;
  left: 50%;
  top: 50%;
  /* margin: -50px 0 0 -50px; */
  transform: translate(-50%, -50%);
}
```

4. flex

```css
.center-layout-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-layout-flex > div {
  background-color: blue;
}
```

```css
.center-layout-flex {
  display: flex;
}
.center-layout-flex > div {
  margin: auto;
}
```

### 文字布局

#### 文本环绕

::: demo [vanilla]

```html
<html>
  <div class="text-wrapping">
    <img src="https://static.yangzw.vip/codepen/thor.jpg" />
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  </div>
</html>
<script></script>
<style>
  .text-wrapping {
    width: 400px;
    height: 300px;
    word-break: break-all;
    font-size: 20px;
    color: #f66;
  }
  .text-wrapping > img {
    float: left;
    height: 200px;
    margin: 10px;
  }
</style>
```

:::

#### 文字溢出

::: demo [vanilla]

```html
<html>
  <div class="text-ellipsis">
    <p class="s-line s-ellipsis">
      玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS
      的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美
      玩转 CSS 的艺术之美 玩转 CSS 的艺术之美
    </p>
    <p class="m-line m-ellipsis">
      玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS
      的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美 玩转 CSS 的艺术之美
      玩转 CSS 的艺术之美 玩转 CSS 的艺术之美
    </p>
  </div>
</html>
<script></script>
<style>
  .text-ellipsis {
    width: 400px;
  }
  .text-ellipsis > p {
    padding: 0 10px;
    line-height: 40px;
    text-align: justify;
    font-size: 20px;
    color: #fff;
  }
  .text-ellipsis > .s-line {
    background-color: red;
  }
  .text-ellipsis > .m-line {
    background-color: blue;
  }
  .text-ellipsis > .s-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text-ellipsis > .m-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  /* .text-ellipsis > .m-ellipsis {
    overflow: hidden;
    position: relative;
    max-height: 120px;
    line-height: 40px;
  }
  .text-ellipsis > .m-ellipsis::after {
    position: absolute;
    right: 0;
    bottom: 0;
    padding-left: 20px;
    background: linear-gradient(to right, transparent, #fff 50%);
    content: '...';
  } */
</style>
```

:::

1. 单行文字溢出 overflow + text-overflow

```css
.s-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

2. 多行文字溢出 flex + overflow + text-overflow

使用 旧版弹性布局 模拟 多行文字溢出 ,只能在 Webkit 内核 中使用,局限性太大了。

- display:-webkit-box :将容器作为弹性伸缩盒模型
- -webkit-box-orient :弹性伸缩盒模型子节点的排列方式
- -webkit-line-clamp :限制容器最多显示多少行文本

```css
.m-ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

通过一些兼容性稳定的属性模拟该 溢出省略号 ,当然是使用伪元素 ::after 胜任这个工作了。结合 max-height 和 line-height 计算最大显示行数,通过定位布局把 省略号 定位到整段文字的右下⻆,使用 linear-gradient() 调整渐变背景颜色稍微润色下省略号使其看上去自然一些。

```css
.m-ellipsis {
  overflow: hidden;
  position: relative;
  max-height: 120px;
  line-height: 40px;
}
.m-ellipsis::after {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 20px;
  background: linear-gradient(to right, transparent, #fff 50%);
  content: '...';
}
```
