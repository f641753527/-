/**
 * @description: 连续触发固定时间内调用一次,场景：页面滚动
 */
function throtten(fn, delay) {
  let timer = null;

  return function(...args) {
    if (timer) return
    timer = setTimeout(function() {
      fn.apply(_this, args)
      clearTimeout(timer)
    }, delay)
  }
}
