Function.prototype._bind = function (thisArg, ...restOuter) {

  const fn = this

  thisArg = thisArg ? Object(thisArg) : window

  thisArg.fn = fn

  return function(...rest) {
    return thisArg.fn(...[...restOuter, ...rest])
  }

}

function add(...rest) {
  console.log(this)
  return rest.reduce((total, item) => total + item, 0)
}

add.bind()

const newAdd = add._bind('add', 1)

const res = newAdd(8,8,4,7)

console.log(res)