---
sidebar: auto
---

# 数据结构与算法

## 数据结构

### 数组

## 算法

### 二分查找

#### 704. [二分查找](https://leetcode-cn.com/problems/binary-search)

```js
const search = function(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}

const nums = [-1, 0, 3, 5, 9, 12]
const target = 9
console.log(search(nums, target))
```

#### 69. [x 的平方根](https://leetcode-cn.com/problems/sqrtx)

```js
const mySqrt = function(x) {
  let left = 1
  let right = x
  let mid
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (mid * mid === x) {
      return mid
    }
    if (mid * mid > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return right
}

console.log(mySqrt(8))
```

#### 367. [有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square)

#### 33. [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array)

#### 74. [搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix)

#### 153. [寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array)
