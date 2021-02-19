const express = require('express')
const router = express.Router()
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/checkAuthenticated')
const bcrypt = require('bcrypt')
const passport = require('passport')
const {users, pushData} = require('../database/user')

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', {
    name: 'Zaenal'
  })
})

router.route('/login', checkNotAuthenticated)
  .get((req, res) => res.render('login.ejs'))
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

router.route('/register', checkNotAuthenticated)
  .get((req, res) => res.render('register.ejs'))
  .post(async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      pushData(req, hashedPassword)
      res.redirect('/login')
    } catch (error) {
      res.redirect('/register')
    }
    console.log(users)
  })

router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router