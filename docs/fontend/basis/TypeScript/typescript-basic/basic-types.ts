let isDone: boolean = false

let age: number = 10

let firstName: string = 'hello'
let message: string = `hello, ${firstName}`

let u: undefined = undefined
let n: null = null

let notSure: any = 4
notSure = 'maybe a string'
notSure = true

notSure.myName
notSure.getName

let arrOfNumber: number[] = [1, 2, 3]

arrOfNumber.push(3)

function test() {
  console.log(arguments)
  // let htmlCollection: HTMLCollection
}

let user: [string, number] = ['hello', 20]
user.push('123')
