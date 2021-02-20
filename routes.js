const express = require('express')
const router = express.Router()

const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const dashboardRoute = require('./routes/dashboardRoute')

router.use([
  loginRoute, 
  registerRoute, 
  dashboardRoute
])

module.exports = router