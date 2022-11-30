const DIRECTION_UP = 0
const DIRECTION_DOWN = 1

let scrollDirection = DIRECTION_UP

// 长列表list
const list = []

// 真实渲染开始位置
let start_i = 0
let end_i = 0
// 偏移位置
let offset = 0
// 可视区展示条目数 
let showItemCount = 0
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



calculateCurrentList()

app.addEventListener('scroll', handleScroll())


function initSize() {
  app.style.height = windowHeight + 'px'
  slot.style.height = list.length * 90 + 'px'

  showItemCount = Math.ceil(windowHeight / itemHeight)
  end_i = start_i + showItemCount * 3
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
}

function calculateCurrentList() {
  scrollTop = app.scrollTop

  scrollDirection = (scrollTop - lastScrollTop >= 0) ? DIRECTION_UP : DIRECTION_DOWN

  lastScrollTop = scrollTop

  /**
   * 1. 前10条滚动到屏幕可视区外面之前 offset为0
   * 2. 最后10条滚进可视区后 offset不再增加
   * 3. 1.2 界限之间 offset随着滚动距离计算offset
   */
  if (scrollTop < itemHeight * showItemCount) {
    offset = 0
  } else if (scrollTop < (list.length - showItemCount * 2) * itemHeight) {
    offset = Math.ceil((scrollTop - showItemCount * itemHeight)  / itemHeight)
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

  let newList = currentList.filter(item => !aList.find(node => node.getAttribute('index') == item.key))


  if (scrollDirection !== DIRECTION_UP) {
    newList = newList.reverse()
  }

 
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
  listContainer.style.transform = `translate3D(0, ${ offset * itemHeight }px, 0)`
}

function handleScroll() {
  return calculateCurrentList
       
  let timer = null

  return () => {
    if (timer) return
    timer = setTimeout(() => {
      calculateCurrentList()
      clearTimeout(timer)
      timer = null
    }, 60)
  }
}