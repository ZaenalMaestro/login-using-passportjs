const express = require('express')
const router = express.Router()
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/checkAuthenticated')
const loginController = require('../controller/loginController')

router.route('/login')
  .get(checkNotAuthenticated, loginController.formLogin)
  .post(checkNotAuthenticated, loginController.authenticate)

router.delete('/logout', checkAuthenticated, loginController.logout)

module.exports = router