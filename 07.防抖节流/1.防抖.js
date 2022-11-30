/**
 * @description: 连续触发只调用一次,场景：输入搜索
 */
function debounce(fn, delay) {
  let timer = null;

  return function(...args) {
    const _this = this
    timer && clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(_this, args)
    }, delay)
  }
}
