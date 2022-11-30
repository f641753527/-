function add(a,b,c) {
  return a + b +c
}

function currying(fn) {
  function c1 (...arg) {
    if (arg.length >= fn.length) {
      return fn.call(this, ...arg)
    } else {
      return function(...arg2) {
        return c1.apply(this, [...arg, ...arg2])
      }
    }
  }
  return c1
}

const curryAdd = currying(add)

console.log(curryAdd(1)(2)(3))
console.log(curryAdd(1, 2)(3))
console.log(curryAdd(1)(2, 3))
console.log(curryAdd(1, 2, 3))