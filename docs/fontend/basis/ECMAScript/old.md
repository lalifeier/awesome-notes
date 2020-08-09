---
sidebar: auto
---

## 介绍

#### ECMAScript

## ECMAScript2015(ES6)

### let 和 const 命令

#### let

1. let 声明的全局变量不是全局对象 window 的属性
2. 用 let 定义变量不允许重复声明
3. let 声明的变量不存在变量提升
4. let 声明的变量具有暂时性死区
5. let 声明的变量拥有块级作用域

#### const

ES5 中可以使用 `Object.defineProperty()` 来实现定义常量

const 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

如何让对象或者数组这种引用数据类型也不被改变呢？

```js
Object.freeze(obj);
```

::: warning
Object.freeze() 只是浅层冻结，只会对最近一层的对象进行冻结，并不会对深层对象冻结。
:::

### 解构赋值

按照一定模式，从数组和对象中提取值，对变量进行赋值

解构赋值重点是在赋值，赋值的元素是要拷贝出来赋值给变量，赋值的元素本身是不会被改变的。

#### 数组解构赋值

```js
let [var1, ...var2] = [var1, var2];
```

#### 对象解构赋值

```js
let { var1, ...var2 } = { var1: value1, var2: value2 };
```

#### 字符串解构赋值

可以当做是数组的解构

```js
let str = 'abcde';

let [a, b, c, d, e] = str;

console.log(a, b, c, d, e);
```

### Array

#### ES5 中数组遍历方式

```js
let arr = [1, 2, 3, 2, 4];
```

1. for 循环

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

2. forEach

`forEach()` 没有返回值，只是针对每个元素调用 func

```js
arr.forEach(function (elem, index, array) {
  console.log(elem, index);
});
```

::: warning
forEach 的代码块中不能使用 break、continue，它会抛出异常。
:::

3. map

`map()` 返回新的数组，每个元素为调用 func 的结果

```js
let result = arr.map(function (value) {
  value += 1;
  console.log(value);
  return value;
});
console.log(arr, result);
```

4. filter

`filter()` 返回符合 func 条件的元素数组

```js
let result = arr.filter(function (value) {
  console.log(value);
  return value == 2;
});
console.log(arr, result);
```

5. some

`some()` 返回 boolean，判断是否有元素符合 func 条件

```js
let result = arr.some(function (value) {
  console.log(value);
  return value == 4;
});
console.log(arr, result);
```

6. every

`every()` 返回 boolean，判断每个元素都符合 func 条件

```js
let result = arr.every(function (value) {
  console.log(value);
  return value == 2;
});
console.log(arr, result);
```

::: warning
every 的代码块中不能使用 break、continue，它会抛出异常。
:::

7. reduce

`reduce()` 接收一个函数作为累加器

```js
let sum = arr.reduce(function (prev, cur, index, array) {
  return prev + cur;
}, 0);
console.log(sum);

let max = arr.reduce(function (prev, cur) {
  return Math.max(prev, cur);
});
console.log(max);

let res = arr.reduce(function (prev, cur) {
  prev.indexOf(cur) == -1 && prev.push(cur);
  return prev;
}, []);
console.log(res);
```

8. for...in（不用于遍历数组）

for...in 可以遍历数组，而且还支持 continue、break 等功能。如果 array 有自定义属性，你发现也会被遍历出来。这是因为 for...in 是为遍历对象创造的，不是为数组设计的。

::: warning
for...in 不能用于遍历数组。

for...in 代码块中不能有 return，不然会抛出异常。
:::

#### ES6 中数组遍历方式

#### for...of

for...of 遍历的是一切可遍历的元素（数组、对象、集合）等

```js
for (let item of arr) {
  console.log(item);
}

for (let item of arr.values()) {
  console.log(item);
}

for (let item of arr.keys()) {
  console.log(item);
}

for (let [index, item] of arr.entries()) {
  console.log(index, item);
}
```

#### ES6 中数组的扩展

1. Array.from()

有些对象被理解为数组，不能使用数组的原生 API，比如函数中的 arguments、DOM 中的 NodeList 等。还有一些可遍历的对象，看上去都像数组却不能直接使用数组的 API，因为它们是伪数组（Array-Like）。对这些对象使用数组的 API 就要想办法把它们转化为数组。基本原理是使用 call 将数组的 api 应用在新的对象上，换句话说是利用改变函数的上下文来间接使用数组的 api。

```js
let args = [].slice.call(arguments);
let imgs = [].slice.call(document.querySelectorAll('img'));

let args = Array.from(arguments);
let imgs = Array.from(document.querySelectorAll('img'));
```

伪数组具备两个特征，1. 按索引方式储存数据 2. 具有 length 属性；如：

```js
let arrLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
```

#### 语法：`Array.from(arrayLike[, mapFn[, thisArg]])`

|   参数    |                         含义                         | 必选 |
| :-------: | :--------------------------------------------------: | :--: |
| arrayLike |        想要转换成数组的伪数组对象或可迭代对象        |  Y   |
|   mapFn   | 如果指定了该参数，新数组中的每个元素会执行该回调函数 |  N   |
|  thisArg  |      可选参数，执行回调函数 mapFn 时 this 对象       |  N   |

Array.from 具备 map 的功能，比如我们想初始化一个长度为 5 的数组，每个数组元素默认为 1

```js
let arr = Array(6)
  .join(' ')
  .split('')
  .map((item) => 1);

Array.from(
  {
    length: 5,
  },
  function () {
    return 1;
  }
);
```

2. Array.of()

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为 7 的空数组（注意：这是指一个有 7 个空位(empty)的数组，而不是由 7 个 undefined 组成的数组）。

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```

#### 语法：`Array.of(element0[, element1[, ...[, elementN]]])`

|   参数   |                   含义                   | 必选 |
| :------: | :--------------------------------------: | :--: |
| elementN | 任意个参数，将按顺序成为返回数组中的元素 |  Y   |

3. Array.prototype.fill()

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
let array = [1, 2, 3, 4];
array.fill(0, 1, 2);
// [1,0,3,4]
```

#### 语法：`arr.fill(value[, start[, end]])`

| 参数  |              含义              | 必选 |
| :---: | :----------------------------: | :--: |
| value |      用来填充数组元素的值      |  Y   |
| start |      起始索引，默认值为 0      |  N   |
|  end  | 终止索引，默认值为 this.length |  N   |

4. Array.prototype.find()

find() 方法返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。

```js
let array = [5, 12, 8, 130, 44];
let found = array.find(function (element) {
  return element > 10;
});
console.log(found);
// 12
```

#### 语法：`arr.find(callback[, thisArg]`

|   参数   |                              含义                              | 必选 |
| :------: | :------------------------------------------------------------: | :--: |
| callback | 在数组每一项上执行的函数，接收 3 个参数，element、index、array |  Y   |
| thisArg  |                   执行回调时用作 this 的对象                   |  N   |

5. Array.prototype.findIndex()

findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。其实这个和 find() 是成对的，不同的是它返回的是索引而不是值。

```js
let array = [5, 12, 8, 130, 44];
let found = array.findIndex(function (element) {
  return element > 10;
});
console.log(found);
// 1
```

#### 语法：`arr.findIndex(callback[, thisArg])`

|   参数   |                              含义                              | 必选 |
| :------: | :------------------------------------------------------------: | :--: |
| callback | 在数组每一项上执行的函数，接收 3 个参数，element、index、array |  Y   |
| thisArg  |                   执行回调时用作 this 的对象                   |  N   |

6. Array.prototype.copyWithin()

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

```js
let arr = [1, 2, 3, 4, 5];
console.log(arr.copyWithin(1, 3));
// [1, 4, 5, 4, 5]
```

#### 语法：`arr.copyWithin(target, start = 0, end = this.length)`

|  参数  |                                   含义                                   | 必选 |
| :----: | :----------------------------------------------------------------------: | :--: |
| target |                从该位置开始替换数据。如果为负值，表示倒数                |  Y   |
| start  |      从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算      |  N   |
|  end   | 到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算 |  N   |

### Function

1. 默认参数

函数参数是从左到右解析，如果没有默认值会被解析成 undefined

如果我们想让具体某个参数使用默认值，我们可以使用 undefined 进行赋值

在 ES6 中我们不仅可以给参数默认赋值具体的数值，同时参数赋值支持参数的逻辑运算进行赋值

```js
//ES5
function foo(x, y) {
  y = y || 'world';
  console.log(x, y);
}
foo('hello', 'imooc');
foo('hello', 0);
//ES6
function foo(x, y = 'world') {
  console.log(x, y);
}
foo('hello', 0);
```

在函数体内，判断函数有几个参数

Function.length 是统计第一个默认参数前面的变量数

```js
//ES5
function foo(a, b = 1, c) {
  console.log(arguments.length);
}
foo('a', 'b'); //2

//ES6
function foo(a, b = 1, c) {
  console.log(foo.length);
}
foo('a', 'b'); // 1
```

2. Rest 参数

不确定参数有多少个

```js
//求和运算
//ES5
function sum() {
  let num = 0;
  Array.prototype.forEach.call(arguments, function (item) {
    num += item * 1;
  });
  return num;
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10

//ES6
function sum(...nums) {
  let num = 0;
  nums.forEach(function (item) {
    num += item * 1;
  });
  return num;
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

arguments 不是数组，所以不能直接使用数组的原生 API 如 forEach，而 Rest Parameter 是数组，可以直接使用数组的原生 API。

3. 扩展运算符

Spread Operator 和 Rest Parameter 是形似但相反意义的操作符，简单的来说 Rest Parameter 是把不定的参数“收敛”到数组，而 Spread Operator 是把固定的数组内容“打散”到对应的参数。

```js
//ES5
function sum(x = 1, y = 2, z = 3) {
  return x + y + z;
}
console.log(sum.apply(null, [4])); // 9
console.log(sum.apply(null, [4, 5])); // 12
console.log(sum.apply(null, [4, 5, 6])); // 15

//ES6
function sum(x = 1, y = 2, z = 3) {
  return x + y + z;
}
console.log(sum(...[4])); // 9
console.log(sum(...[4, 5])); // 12
console.log(sum(...[4, 5, 6])); // 15
```

4. length 属性

函数指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数

```js
function foo(x = 1, y = 2, z = 3) {
  console.log(x, y);
}
console.log(foo.length);
// 0
```

5. name 属性

函数的 name 属性，返回该函数的函数名

```js
function foo() {}
foo.name; // "foo"
```

6. 箭头函数

箭头函数中 this 指向定义时所在的对象，而不是调用时所在的对象

箭头函数不可以当作构造函数

箭头函数不可以使用 arguments 对象

```js
let hello = () => {
  console.log('say hello');
};

//带参数
//如果只有一个参数，可以省略括号，如果大于一个参数一定要记得带括号
let hello = (name) => {
  console.log('say hello', name);
};
```

- 如果返回值是表达式可以省略 return 和 {}

```js
let pow = (x) => x * x;
```

- 如果返回值是字面量对象

```js
let person = (name) => ({
  age: 20,
  addr: 'Beijing City',
});
```

### Object

1. 属性简洁表示法

```js
let name = '';
let age = 18;
let obj = {
  name: name,
  age: age,
  study: function () {
    console.log(this.name + '正在学习');
  },
};

let name = '';
let age = 18;
let obj = {
  name,
  age,
  study() {
    console.log(this.name + '正在学习');
  },
};
```

2. 属性名表达式

在 ES6 可以直接用变量或者表达式来定义 Object 的 key。

```js
let s = 'school';
let obj = {
  foo: 'bar',
  [s]: 'imooc',
};
```

3. Object.is()

判断两个对象是否相等

```js
let obj1 = {
  // new Object()
  name: '',
  age: 18,
};
let obj2 = {
  // new Object()
  name: '',
  age: 18,
};
console.log(obj1 == obj2); // false
console.log(Object.is(obj1, obj2)); // false
let obj2 = obj1;
console.log(Object.is(obj1, obj2)); // true
```

4. Object.assign()

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，它将返回目标对象。

```js
const target = {
  a: 1,
  b: 2,
};
const source = {
  b: 4,
  c: 5,
};
const returnedTarget = Object.assign(target, source);
console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

#### 语法：`Object.assign(target, ...sources)`

|  参数   |   含义   | 必选 |
| :-----: | :------: | :--: |
| target  | 目标对象 |  Y   |
| sources |  源对象  |  N   |

从语法上可以看出源对象的个数是不限制的（零个或多个），如果是零个直接返回目的对象，如果是多个相同属性的会被后边的源对象的属相覆盖。

如果目的对象不是对象，则会自动转换为对象

Object.assign()对于引用数据类型属于浅拷贝。

::: tip
对象的浅拷贝：浅拷贝是对象共用的一个内存地址，对象的变化相互影响

对象的深拷贝：简单理解深拷贝是将对象放到新的内存中，两个对象的改变不会相互影响
:::

### Class

1. 声明类

```js
let Animal = function (type) {
  this.type = type;
  this.walk = function () {
    console.log(`I am walking`);
  };
};

let dog = new Animal('dog');
let monkey = new Animal('monkey');
let Animal = function (type) {
  this.type = type;
};
Animal.prototype.walk = function () {
  console.log(`I am walking`);
};
let dog = new Animal('dog');
let monkey = new Animal('monkey');

//ES6
class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
}
let dog = new Animal('dog');
let monkey = new Animal('monkey');
```

2. Setters & Getters

```js
class Animal {
  constructor(type, age) {
    this.type = type;
    this._age = age;
  }
  get age() {
    return this._age;
  }
  set age(val) {
    this._age = val;
  }
}

//ES6
class Animal {
  constructor(type) {
    this.type = type;
  }
  get addr() {
    return '北京动物园';
  }
}
```

3. 静态方法

```js
let Animal = function (type) {
  this.type = type;
  this.walk = function () {
    console.log(`I am walking`);
  };
};
Animal.eat = function (food) {
  console.log(`I am eating`);
};

class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
  static eat() {
    console.log(`I am eating`);
  }
}
```

4. 继承

```js
// 定义父类
let Animal = function (type) {
  this.type = type;
};
// 定义方法
Animal.prototype.walk = function () {
  console.log(`I am walking`);
};
// 定义静态方法
Animal.eat = function (food) {
  console.log(`I am eating`);
};
// 定义子类
let Dog = function () {
  // 初始化父类
  Animal.call(this, 'dog');
  this.run = function () {
    console.log('I can run');
  };
};
// 继承
Dog.prototype = Animal.prototype;

//ES6
class Animal {
  constructor(type) {
    this.type = type;
  }
  walk() {
    console.log(`I am walking`);
  }
  static eat() {
    console.log(`I am eating`);
  }
}

class Dog extends Animal {
  constructor() {
    super('dog');
  }
  run() {
    console.log('I can run');
  }
}
```

### Symbol

`Symbol` ，表示独一无二的值

Symbol 值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

1. 声明方式

```js
let s = Symbol();
typeof s; // "symbol"

let s1 = Symbol();
let s2 = Symbol();
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false

let s1 = Symbol('foo');
let s2 = Symbol('foo');
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false
```

Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

2. Symbol.for()

Symbol.for() 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
console.log(s1 === s2); // true
```

Symbol.for()与 Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。

3. Symbol.keyFor()

Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key。

```js
const s1 = Symbol('foo');
console.log(Symbol.keyFor(s1)); // undefined

const s2 = Symbol.for('foo');
console.log(Symbol.keyFor(s2)); // foo
```

4. 作为属性名

由于每一个 Symbol 值都是不相等的，Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。

```js
const stu1 = Symbol('李四');
const stu2 = Symbol('李四');
const grade = {
  [stu1]: {
    address: 'yyy',
    tel: '222',
  },
  [stu2]: {
    address: 'zzz',
    tel: '333',
  },
};
console.log(grade);
console.log(grade[stu1]);
console.log(grade[stu2]);
```

5. 属性遍历

```js
const sym = Symbol('imooc');
class User {
  constructor(name) {
    this.name = name;
    this[sym] = 'imooc.com';
  }
  getName() {
    return this.name + this[sym];
  }
}
const user = new User('xiecheng');
console.log(user.getName());

for (let key in user) {
  console.log(key);
}

for (let key of Object.keys(user)) {
  console.log(key);
}

for (let key of Object.getOwnPropertySymbols(user)) {
  console.log(key);
}

for (let key of Reflect.ownKeys(user)) {
  console.log(key);
}
```

6. 消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js
const shapeType = {
  triangle: Symbol(),
  circle: Symbol(),
};

function getArea(shape) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 1;
      break;
    case shapeType.circle:
      area = 2;
      break;
  }
  return area;
}
console.log(getArea(shapeType.triangle));
```

### Set

Set 数据结构不允许数据重复

1. 基本语法

```js
let s = new Set();
//添加数据
s.add('hello');
// 删除指定数据
s.delete('hello'); // true
// 删除全部数据
s.clear();
// 判断是否包含数据项，返回 true 或 false
s.has('hello'); // true
// 计算数据项总数
s.size; // 2
//数组去重
let arr = [1, 2, 3, 4, 2, 3];
let s = new Set(arr);
console.log(s);
//合并去重
let arr1 = [1, 2, 3, 4];
let arr2 = [2, 3, 4, 5, 6];
let s = new Set([...arr1, ...arr2]);
console.log(s);
console.log([...s]);
console.log(Array.from(s));
//交集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let result = new Set(arr1.filter((item) => s2.has(item)));
console.log(Array.from(result));
//差集
let arr3 = new Set(arr1.filter((item) => !s2.has(item)));
let arr4 = new Set(arr2.filter((item) => !s1.has(item)));
console.log(arr3);
console.log(arr4);
console.log([...arr3, ...arr4]);
```

2. 遍历方式

```js
console.log(s.keys()); // SetIterator {"hello", "goodbye"}
console.log(s.values()); // SetIterator {"hello", "goodbye"}
console.log(s.entries()); // SetIterator {"hello" => "hello", "goodbye" => "goodbye"}
s.forEach((item) => {
  console.log(item); // hello // goodbye
});

for (let item of s) {
  console.log(item);
}

for (let item of s.keys()) {
  console.log(item);
}

for (let item of s.values()) {
  console.log(item);
}

for (let item of s.entries()) {
  console.log(item[0], item[1]);
}
```

3. WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

WeakSet 的成员只能是对象，而不能是其他类型的值。

```js
const ws = new WeakSet();
ws.add(1);
// TypeError: Invalid value used in weak set
ws.add(Symbol());
// TypeError: invalid value used in weak set

let ws = new WeakSet();
const obj1 = {
  name: 'imooc',
};
const obj2 = {
  age: 5,
};
ws.add(obj1);
ws.add(obj2);
ws.delete(obj1);
console.log(ws);
console.log(ws.has(obj2));
```

WeakSet 没有 size 属性，没有办法遍历它的成员。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
