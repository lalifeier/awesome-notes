# 格式化

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
