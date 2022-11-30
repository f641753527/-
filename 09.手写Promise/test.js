const MyPromise = require('./MyPromise')

new MyPromise((resolve, reject) => {
  // resolve('success')
  reject('reject fail')
}).then(value => {
  console.log(value)
  return '9999'
}, reason => {
  console.log(reason)
  return reason
}).then(value => console.log('====', value), reason => console.log(reason))


const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('异步 promise'), 1500)
})


promise.then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
}).then(value => console.log('***', value), reason => console.log('&&&', reason))
