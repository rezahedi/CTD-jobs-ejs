// Click listener for buttons with data-href attribute
const buttons = document.querySelectorAll('button[data-href]');
buttons.forEach(element=>{
  element.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = e.target.getAttribute('data-href')
  })
})
