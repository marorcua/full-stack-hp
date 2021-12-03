const router = require('express').Router()
const itunesRoutes = require('./itunes')

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.use('/itunes', itunesRoutes)

module.exports = router
