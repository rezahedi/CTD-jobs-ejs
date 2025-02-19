// Click listener for edit buttons
const editButtons = document.querySelectorAll('button.editBtn');
editButtons.forEach(btn=>{
  btn.addEventListener('click', (e) => {
    location.href = e.target.getAttribute('data-href')
  })
})
