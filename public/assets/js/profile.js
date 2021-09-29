const { axios } = window

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  window.location = '/profile.html'
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/auth.html'
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('deletePost')) {
    axios.delete(`/api/posts/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username, posts } }) => {
    posts.forEach(({ id, title, body,date }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex p-0 justify-content-between gBack border border-3 border-dark mb-2 listItem'
      postElem.innerHTML = `
        <div class="col-12 gback ">
          <div class="bBack text-white d-flex justify-content-between  fw-bold">${title}<span class=" float-right badge  fw-bold rounded-pill infoPill">Posted by ${username} on ${date}<span data-id="${id}" class="deletePost badge bg-danger mx-2 rounded-pill">  x</span></span></div>
          ${body}
        </div>
        
        
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => console.error(err))


document.getElementById('createPost').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/posts', {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: { id, title, body,date, u: { username } } }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex p-0 justify-content-between gBack border border-3 border-dark mb-2 listItem'
      postElem.innerHTML = `
        <div class="col-12 gback ">
          <div class="bBack text-white d-flex justify-content-between  fw-bold">${title}<span class=" float-right badge  fw-bold rounded-pill infoPill">Posted by ${username} on ${date}<span data-id="${id}" class="deletePost badge bg-danger mx-2 rounded-pill">  x</span></span></div>
          ${body}
        </div>
        
        
      `
      document.getElementById('posts').append(postElem)
    })
    .catch(err => console.error(err))
})
