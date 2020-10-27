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

// p.id = 123
