const { log } = require('console')

class Animal {
  public readonly name: string
  constructor(name) {
    this.name = name
  }
  public run() {
    return `${this.name} is running`
  }
}

const snake = new Animal('hi')
// snake.name = '123'
console.log(snake.run())

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const dog = new Dog('hi')
console.log(dog.bark())

class Cat extends Animal {
  static categories = ['mamal']
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return 'miao ' + super.run()
  }
}

const cat = new Cat('hi')
console.log(cat.run())
console.log(Cat.categories)
