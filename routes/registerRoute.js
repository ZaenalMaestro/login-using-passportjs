const express = require('express')
const router = express.Router()
const {checkNotAuthenticated} = require('../middleware/checkAuthenticated')
const registerController = require('../controller/registerController')

router.route('/register')
  .get(checkNotAuthenticated, registerController.formRegister)
  .post(checkNotAuthenticated, registerController.registerNewUser)

module.exports = router