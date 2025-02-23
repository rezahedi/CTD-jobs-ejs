// Click listener for buttons with data-href attribute
const buttons = document.querySelectorAll('button[data-href]');
buttons.forEach(element=>{
  element.addEventListener('click', (e) => {
    e.preventDefault()
    if( e.target.getAttribute('data-href')=='goback' ) return goBack()
    
    location.href = e.target.getAttribute('data-href')
  })
})

const deletes = document.querySelectorAll('form.deleteForm');
deletes.forEach(formElement=>{
  formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    if (confirm('Do you really want to delete this?'))
      e.target.submit()
  })
})

const goBack = ()=>history.back()