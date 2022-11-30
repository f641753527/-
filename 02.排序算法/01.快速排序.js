function quckSort(list, low, high) {

  let i = low
  let j = high

  if (i < j) {


    const temp = list[i]
                        
    while(i < j) {
      while(i < j && list[j] >= temp) {
        j--
      }
      list[i] = list[j]
      while(i < j && list[i] <= temp) {
        i++
      }
      list[j] = list[i]
    }

    list[i] = temp


    quckSort(list, low, i - 1)
    quckSort(list, i + 1, high)

  }

}

const array = [56,5,3,7,1,8,321,57,1,90,3,45,23,4,66]

quckSort(array, 0, array.length - 1)

console.log(array)