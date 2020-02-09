for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100)
}

console.log(a);
let a = 3

const arr = [1, 2, 3, 4, 5]

// for循环
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 2) {
        continue
    }
    console.log(arr[i]);
}

// forEach
arr.forEach(function (item) {
    if (item === 2) {
        // continue
    }
    console.log(item);
})

// every
arr.every(function (item) {
    if (item === 2) {} else {
        console.log(item)
    }
    return true
})

// for in
arr.a = 8
for (let index in arr) {
    if (index * 1 === 2) {
        continue
    }
    console.log(index, arr[index])
}

// for of
for (const item of arr) {
    console.log(item);
}

const Price = {
    A: [1.5, 2.3, 4.5],
    B: [3, 4, 5],
    C: [0.5, 0.8, 1.2]
}

for (let key in Price) {
    console.log(key, Price[key])
}