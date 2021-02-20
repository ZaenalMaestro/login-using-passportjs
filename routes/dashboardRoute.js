const express = require('express')
const router = express.Router()
const dashboardController = require("../controller/dashboardController")
const {checkAuthenticated} = require('../middleware/checkAuthenticated')

router.get('/', checkAuthenticated, dashboardController.index)

module.exports = router