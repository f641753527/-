function bubbleSort(list) {

  for(let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[i]) {
        const temp = list[j]
        list[j] = list[i]
        list[i] = temp
      }
    }
  }
}



const array = [56,5,3,7,1,8,321,57,1,90,3,45,23,4,66]

bubbleSort(array)

console.log(array)