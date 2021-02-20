const passport = require('passport')

const loginController = {
  formLogin: (req, res) => res.render('login.ejs'),

  authenticate: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),

  logout: (req, res) => {
    req.logOut()
    res.redirect('/login')
  }
}

module.exports = loginController