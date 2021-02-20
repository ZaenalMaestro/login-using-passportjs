const passport = require('passport')

const loginController = {
  formLogin: (req, res) => {
    res.render('login.ejs')
    console.log(req.body)
  },

  authenticate: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),

  authenticateCustom: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        const {email, password} = req.body
        res.render('login.ejs', {
          oldEmail: email,
          oldPassword: password,
          message: 'Username or password incorrect'
        })
      }
      req.logIn(user, (err) => {
        if ( err ) return next(err)
        return res.redirect('/')
      })
    })(req, res, next)
},

  logout: (req, res) => {
    req.logOut()
    res.redirect('/login')
  }
}

module.exports = loginController