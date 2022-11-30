const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {

  /** Promise状态 */
  status = PENDING
  /** promise成功的值 */
  value = undefined
  /** promise失败原因 */
  reason = undefined
  /** promise 成功回调 */
  successCallback = []
  /** promise 失败回调 */
  failCallback = []

  constructor(excutor) {
    excutor(this.resolve, this.reject)
  }

  resolve = value => {
    /** Promise状态只能更改一次 */
    if (this.status !== PENDING) return
  
    this.status = FULFILLED
    this.value = value
    /** 异步函数调用resolve更新状态，调用保存的回调函数 */
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }

  reject = reason => {
    /** Promise状态只能更改一次 */
    if (this.status !== PENDING) return

    this.status = REJECTED
    this.reason = reason
    /** 异步函数调用reject更新状态，调用保存的回调函数 */
    while (this.failCallback.length) this.failCallback.shift()(this.reason)
  }

  then(successCb, failCb) {
    const pro = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const res = successCb(this.value)
        resolve(res)
      } else if (this.status === REJECTED) {
        const reason = failCb(this.reason)
        reject(reason)
      } else {
        /** 异步promise，状态还未改变，此时保存回调函数 */
        this.successCallback.push(successCb)
        this.failCallback.push(failCb)
      }
    })
    return pro
  }

}

module.exports = MyPromise
