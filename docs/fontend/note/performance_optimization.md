# 资源的压缩与合并

## HTML 压缩

- 使用在线工具进行压缩

[html-minifier-terser](https://terser.org/html-minifier-terser/])

- 使用 html-minifier 等 npm 工具

## CSS 压缩

- 使用在线工具进行压缩
- 使用 clean-css 等 npm 工具

## JS 压缩与混淆

- 使用在线工具进行压缩
- 使用 Webpack 对 JS 在构建时压缩

## CSS JS 文件合并

# 图片优化

## 图片压缩

- [jpg 图片格式 压缩](https://github.com/imagemin/imagemin)

- [png 图片格式 压缩](https://github.com/imagemin/imagemin-pngquant)

## 图片加载优化

### 图片懒加载

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

### 使用渐进式图片

### 使用[响应式图片](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

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

# 字体优化

[font-face](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)

[font-display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face/font-display)
