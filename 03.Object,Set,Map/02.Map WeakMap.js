const map = new Map()
const weakMap = new WeakMap()


setTimeout(() => {
  for (let i = 0; i < 1024 * 1024; i ++) {
    const obj = Object.create({})
    map.set(obj)
  }
}, 2000)



setTimeout(() => {
  for (let i = 0; i < 1024 * 1024; i ++) {
    const obj = Object.create({})
    weakMap.set(obj)
  }
}, 5000)

