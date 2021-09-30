const router = require('express').Router()

router.use('/api', require('./commentRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))


module.exports = router
