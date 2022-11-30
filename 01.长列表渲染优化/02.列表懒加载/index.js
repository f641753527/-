let pageIndex = 0

let currentList = []

const container = document.getElementById('list')

const distance = 600

function getList(pageIndex) {
  fetch('https://www.fastmock.site/mock/030d8df6d2ce715a9aae905c6a6c570e/api/list').then(res => res.json()).then(data => {
    currentList = data
    renderList()
  })
  // const list = []
  // for (let i = 0; i < 1000; i++) {
  //   const item = {
  //     label: 'labellabellabellabellabellabel',
  //     desc: "descdescdescdescdescdesc",
  //     url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21042G4331941H-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643960852&t=7f050e96f3fe1d27daf9ef16e73d2a7f'
  //   }
  //   list.push(item)
  // }
  // renderList()
}

function renderList() {
  for (let item of currentList) {
    const oLi = document.createElement('li')
    oLi.className = 'list--item'
    const p1 = document.createElement('p')
    p1.innerHTML = item.desc
    const p2 = document.createElement('p')
    p2.innerHTML = item.label 
    const img = document.createElement('img')
    // img.src = item.url
    oLi.appendChild(p1)
    oLi.appendChild(p2)
    oLi.appendChild(img)
    container.appendChild(oLi)
  }
}

getList(pageIndex)

document.addEventListener('scroll', onScroll())

function onScroll () {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop
      const innerHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight

      console.log(scrollHeight, innerHeight, scrollTop)
      const reachBottom = scrollTop + innerHeight + distance >= scrollHeight

      reachBottom && getList()
    }, 500)
  }
}