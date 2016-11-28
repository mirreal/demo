/*
 * @fileOverview 纯函数式编程
 */


//多返回值得处理方式
const pair = a => b => [a, b]

const [a, b] = pair(6)(7)

console.log(a, b)


// 遍历数组
// 使用 for 循环
let arr = [5, 4, 7]
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// 使用 forEach
console.log('use forEach...')
arr.forEach(item => console.log(item))

// 函数式的遍历方法
console.log('use function loopOnArray...')
const loopOnArray = arr => body => i =>
  i < arr.length ?
  (_ => loopOnArray(arr)(body)(i + 1))(body(arr[i])) :
  undefined

const loop = arr => body => loopOnArray(arr)(body)(0)

loop (arr) (item => console.log(item))

// map 定义
console.log('what map is...')
const map = f => ([x, ...xs]) =>
  x === undefined ?
  [] :
  [f(x), ...map(f)(xs)]

const double = arr =>
  map(x => 2 * x)(arr)

console.log(double(arr))

// 求和
const _sum = acc => ([x, ...xs]) =>
  x === undefined ?
  acc :
  _sum(acc + x)(xs)

const sum = arr => _sum(0)(arr)

console.log(sum(arr))
