---
sidebar: auto
---

# JavaScript

## es6

### let const

### 解构赋值

### promise

```js
function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
      return func.apply(func, args);
    });
  };
}

function promisic(func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
      func(args);
    });
  };
}
```
