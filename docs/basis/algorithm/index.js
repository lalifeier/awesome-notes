const search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  let mid
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
};

const nums = [-1, 0, 3, 5, 9, 12]
const target = 9
console.log(search(nums, target));

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
};

console.log(mySqrt(8));
