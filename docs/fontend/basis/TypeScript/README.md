# TypeScript

[TypeScript 官网](https://www.typescriptlang.org/)

[TypeScript 手册](https://www.typescriptlang.org/docs/handbook/intro.html)

## 快速上手

### 安装

```shell
npm install -g typescript
```

- 安装 tsc

```shell
// 查看 tsc 版本
tsc -v
// 编译 ts 文件
tsc fileName.ts
```

- 安装 ts-node

```shell
npm install -g ts-node
// 运行 ts 文件
ts-node fileName.ts
```

### [基本类型](https://www.typescriptlang.org/docs/handbook/basic-types.html)

- Boolean

```js
let isDone: boolean = false
```

- Number

```js
let decimal: number = 6
let big: bigint = 100n
```

- String

```js
let color: string = 'blue'
```

- Array

```js
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3]
```

- Tuple

```js
let x: [string, number]
x = ['hello', 10]
```

- Null and Undefined

```js
let u: undefined = undefined
let n: null = null
```

- Any

```js
let looselyTyped: any = {}
```

### [接口](https://www.typescriptlang.org/docs/handbook/interfaces.html)

```js
interface Person {
  readonly id: Number
  name: string
  age?: number
}

let p: Person = {
  id: 1,
  name: 'hello',
  age: 20,
}
```

### 函数

### [Unions and Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)

### 枚举

### 泛型
