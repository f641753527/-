Function.prototype._apply = function(thisArg, args = []) {
  // 获取原函数(隐事绑定)
  const fn = this

  thisArg = thisArg ? Object(thisArg) : window

  thisArg.fn = fn

  return thisArg.fn(...args)

}

function add(...rest) {
  console.log(this)
  return rest.reduce((total, item) => total + item, 0)
}

const result = add._apply(0, [1, 2, 3])

console.log(result)
