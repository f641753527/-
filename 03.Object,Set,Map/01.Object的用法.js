const k1 = {
  a: 1,
}
const k2 = { b: 1 }

const k3 = false

const obj = {
  [k1]: 1,
  [k2]: 2,
  [k3]: false
}

console.log(obj)

console.log(k3.toString())