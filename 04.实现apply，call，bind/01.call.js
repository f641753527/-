Function.prototype.call2 = function(thisArg, ...args) {
  const fn = this

  // 绑定this给fn
  thisArg = processThisArg(thisArg)

  thisArg.fn = fn

  return thisArg.fn(...args)
}

function sum(num1, num2) {
  console.log('sum 函数调用', this)
  return num1 + num2
}

const resutl = sum.call2(undefined, 1, 2)

console.log(resutl)

function processThisArg(thisArg) {
  const type = Object.prototype.toString.call(thisArg)

  const reg = /\s(\w+)/

  const res = Array.prototype.slice.call(reg.exec(type))[1]

  if (res === 'Null' || res === 'Undefined') return window
  return Object(thisArg)
}
