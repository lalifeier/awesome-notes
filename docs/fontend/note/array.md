# 数组

## 数组去重

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

## 数组对象指定属性去重

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

## 数组排序

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

## 数组对象排序

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

## 数组对象分组

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

## 数组对象分组求和

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
