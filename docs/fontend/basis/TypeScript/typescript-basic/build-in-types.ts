const a: Array<number> = [1, 2, 3]

const date = new Date()
date.getTime()

const = reg = /abc/
reg.test('abc')

Math.pow(2, 2)


let body = document.body
let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click', (e)=>{
  e.preventDefault()
})


interface IPerson {
  name:string,
  age:number
}
let p:IPerson = {name:'123',age:20}
type IPartial = Partial<IPerson>
let p2:IPartial = {name:'123'} 


type IOmit = Omit<IPerson,'name'>
let p3: IOmit = {age:20}