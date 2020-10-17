---
sidebar: auto
---

# CSS

## 基础

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

它不具备继承性,若全局统一盒模型,那只能使用 \* 声明 box-sizing 了。

1. 标准盒模型

标准盒模型是 W3C 规范的标准,由 margin + border + padding + content 组成。与上述提到的公式一
模一样,节点的 width/height 只包含 content ,不包含 padding 和 border 。

节点的尺寸计算公式如下。

- 横向: margin-[left/right] + border-[left/right] + padding-[left/right] + width
- 纵向: margin-[top/bottom] + border-[top/bottom] + padding-[top/bottom] + height

节点的宽高计算公式如下。

- 横向: width = width
- 纵向: height = height

2.  怪异盒模型

怪异盒模型又名 IE 盒子模型 ,是 IExplore 制定的标准,由 margin + content 组成。与上述提到的公式
一不同,节点的 width/height 包含 border 、 padding 和 content 。

节点的尺寸计算公式如下。

- 横向: margin-[left/right] + width ( 包含 border-[left/right] 和 padding-[left/right] )
- 纵向: margin-[top/bottom] + height ( 包含 border-[top/bottom] 和 padding-[top/bottom] )

节点的宽高计算公式如下。

- 横向: width = border + padding + width
- 纵向: height = border + padding + height

在 IExplore 中,若 HTML 文档缺失 <!doctype html>声明则会触发怪异盒模型

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

### 格式化上下文

格式化上下文指决定渲染区域里节点的排版、关系和相互作用的渲染规则。

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
