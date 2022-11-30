const observe = new IntersectionObserver(changes => {
  console.log(changes)
},{
  root: document.body,
  rootMargin: '100px',
  threshold: 0
})

observe.observe(document.getElementById('img'))

