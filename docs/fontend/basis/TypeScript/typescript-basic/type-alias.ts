let sum: (x: number, y: number) => number
const result = sum(2, 3)

type PlusType = (x: number, y: number) => number
let sum2: PlusType
const result2 = sum2(2, 3)

type strOrNumber = string | number
let result3 = 123

const str: 'name' = 'name'
const number: 1 = 1
type Dirsctions = 'Up' | 'Down' | 'Left' | 'Right'
let toWhere: Dirsctions = 'Left'

interface IName {
  name: string
}
type IPerson = IName & { age: number }
let p: IPerson = { name: '123', age: 123 }
