const { bootstrap } = window



document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
})

document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => {
      alert('User registered! Log in.')
      window.location="/login.html"
    
    })
    .catch(err => console.error(err))
})



// function to check if user is logged in
function isLoggedIn() {
  if (localStorage.getItem('token')) {
    console.log("logged in")
  } else {
    console.log('not logged in')
    let button = document.getElementById('logOut')
    button.innerHTML = `Sign In`
  }
}

// call the function to check if user is logged in
isLoggedIn()
