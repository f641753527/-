/**
 * @description: 选择排序
 * 第一轮： 找出最小的元素放到首位
 * 第二轮： 剩下元素找到最小的放到第二位
 * ...
 * @param {Array} 待排序数组
 */
function selectionSort(list = []) {

  for (let i = 0; i < list.length - 1; i++) {
    let min = list[i]

    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < min) {
        const temp = list[j]
        list[j] = min
        min = temp
      }
    }

    list[i] = min
  }
}

const array = [56,5,3,7,1,8,321,57,1,90,3,45,23,4,66]

selectionSort(array)

console.log(array)