
document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('login').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/login', {
    username: document.getElementById('lUsername').value,
    password: document.getElementById('lPassword').value
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('token', token)
        window.location = '/'
      } else {
        alert('Invalid username or password.')
      }
    })
    .catch(err => console.error(err))
})


document.getElementById("register").addEventListener('click',event=>{
  event.preventDefault()
  window.location= '/register.html'
})