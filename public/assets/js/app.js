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

axios.get('/api/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: posts }) => {
    console.log(posts)
    posts.forEach(({ id, title, body,date, u: { username } }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      postElem.innerHTML = `
        <div class="ms-2 ">
          <div class="fw-bold">${title}<span>Posted By: </span></div>
          ${body}
        </div>
        <span class="badge bg-primary rounded">Posted by ${username} on ${date}</span>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => {
    console.log(err)
    window.location = '/auth.html'
  })
