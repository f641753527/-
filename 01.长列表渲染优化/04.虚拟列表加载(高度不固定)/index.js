const DIRECTION_UP = 0
const DIRECTION_DOWN = 1

let scrollDirection = DIRECTION_UP

// 长列表list
const list = []
// 记录每条数据的高度，条目底部距离顶部的距离
let positions = []

// 真实渲染开始位置
let start_i = 0
let end_i = 0
// 偏移位置
let offset = 0
// 可视区展示条目数 
let showItemCount = 10
// 条目高度
const itemHeight = 90


let scrollTop = 0
let lastScrollTop = 0 // 记录上次滚动的高度 判断是往上滚动还是往下滚动

const app = document.getElementById('app')
const slot = app.getElementsByClassName('slot')[0]
const listContainer = app.getElementsByClassName('list')[0]

//
const windowHeight = document.documentElement.clientHeight

fetchData()


initSize()
initTotalHeight()



calculateCurrentList()

app.addEventListener('scroll', handleScroll())


function initSize() {
  app.style.height = windowHeight + 'px'
  // showItemCount = Math.ceil(windowHeight / itemHeight)
  end_i = start_i + showItemCount * 3
}

function initTotalHeight() {
  const totalHeight = positions.reduce((total, item) => total + item.height, 0)
  slot.style.height = totalHeight + 'px'
}

function fetchData() {
  for (let i = 0; i < 100000; i++) {
    const item = {
      key: i,
      label: `这是第${i}个item`,
      desc: 'descdescdescdescdescdescdescdescdesc'
    }
    list.push(item)
  }
  positions = list.map(item => ({
    key: item.key,
    height: itemHeight,
    top: item.key * itemHeight
  }))
}

function calculateCurrentList() {
  scrollTop = app.scrollTop

  scrollDirection = (scrollTop - lastScrollTop >= 0) ? DIRECTION_UP : DIRECTION_DOWN

  lastScrollTop = scrollTop

  // offset = positions.findIndex(item => scrollTop < item.top + item.height) || 0
  offset = binnarySearch(positions, scrollTop)

  /**
   * 1. 前showItemCount条滚动到屏幕可视区外面之前 offset为0
   * 2. 最后showItemCount条滚进可视区后 offset不再增加
   * 3. 1.2 界限之间 offset随着滚动距离计算offset
   */
  if (offset <= showItemCount) {
    offset = 0
  } else if (offset < (list.length - showItemCount * 2)) {
    offset = offset - showItemCount
  } else {
    offset = list.length - showItemCount * 3
  }

  start_i = offset
  end_i = start_i + showItemCount * 3

  render()
}

function render() {
  const aList = Array.from(listContainer.getElementsByClassName('item'))

  for(const oLi of aList) {
    const key = oLi.getAttribute('index')
    if (key < start_i || key > end_i) {
      listContainer.removeChild(oLi)
    }
  }

  const currentList = list.slice(start_i, end_i)

  const originNewList = currentList.filter(item => !aList.find(node => node.getAttribute('index') == item.key))
  
  const newList = (scrollDirection !== DIRECTION_UP) ? originNewList.reverse() : originNewList
 
  for (const item of newList) {
    const oLi = document.createElement('li')
    oLi.className = 'item'
    oLi.setAttribute('index', item.key)
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')

    p1.innerHTML = item.label
    p2.innerHTML = item.desc

    oLi.appendChild(p1)
    oLi.appendChild(p2)

    if (scrollDirection == DIRECTION_UP) {
      listContainer.append(oLi)
    } else {
      listContainer.prepend(oLi)
    }
  }
  // 渲染数据需要移动到可视区域（因为屏幕滚动，被移动到可视区域外面)
  listContainer.style.transform = `translate3D(0, ${positions[offset].top}px, 0)`
  
  // dom更新完后更新当前展示items的position
  setTimeout(() => {
    updatePositions()
  }, 0)
}

/**
 * @description: 更新新渲染的item 对应的高度 位置
 * @param {Item[]} list
 */
function updatePositions() {
  const domItems = listContainer.children
  for (let i = 0;  i < domItems.length; i++) {
    const item = domItems[i]
    const index = +item.getAttribute('index')
    const originHeight = positions[index].height
    const newHeight = item.getBoundingClientRect().height
    const diffValue = newHeight - originHeight;
    if (diffValue !== 0) {
      positions[index].height = newHeight
      for (let j = index + 1; j < positions.length; j++) {
        positions[j].top = positions[j].top + diffValue
      }
    }
  }
  // 重置总高度
  initTotalHeight()
}

function handleScroll() {
  return calculateCurrentList
}


function binnarySearch(list, value) {
  let index = 0
  let head = 0
  let tail = list.length - 1
  // 条件 middle.top + middle.height > value
  while (head < tail) {
    let middle = Math.floor((head + tail) / 2)
    const item = list[middle]
    if (item.top + item.height === value) {
      index = middle
      break
    } else if (item.top + item.height < value) {
      head = middle + 1
    } else {
      tail = middle - 1
    }
  }

  index = head
  if (value > list[head].top + list[head].height) index = head + 1

  return index
}