const router = require('express').Router()
const { Post, Comment } = require('../models')
const passport = require('passport')


// router to post comments
router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  let date = new Date()
  date = date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear()
  let id = (parseInt(req.body.id))
  Comment.create({
    pid: id,
    username: req.user.username,
    comment: req.body.comment,
    date: date
  })
    .then(comment => {
      Comment.findAll({include:"u"})
     .then(comment=>res.json(comment))
    })
    .catch(err => console.log(err))
})

// router get comments (based on post id)
router.get('/comments/:pid', (req, res) => {

  post = req.params.pid
  // console.log(req.params)
  // find all comment where the post id matches the request id (post id)
  Comment.findAll({
    where: {
      pid: post
    }
  })
    .then(comments => {
      res.json(comments)
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router