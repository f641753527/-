function deepClone(data) {

  if (typeof data === 'object') {

    const type = Object.prototype.toString.call(data)

    switch (type) {
      case '[object Array]':
        return data.map(v => deepClone(v))
      case '[object Object]':
        const obj = {}
        Object.keys(data).forEach(key => {
          obj[key] = deepClone(data[key])
        })
        return obj;
      case '[object Date]':
        return new Date(data.getTime())
    }

  } else if (typeof data === 'function') {
    const newFunc = data.bind(null)
    newFunc.prototype = deepClone(data.prototype)

    return newFunc
  }
  else {
    return data
  }

}