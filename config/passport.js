const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {userModel} = require('../database/user')

const authenticateUser = async (email, password, done) => {
  const user = userModel.getUserByEmail(email)
  if (!user) {
    return done(null, false, { message: 'No user with the email'})
  }
  
  try {
    if (await bcrypt.compare(password, user.password)) return done(null, user)
    return done(null, false, { message: 'incorret password' })
  } catch (error) {
    return done(error)
  }
}


passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, userModel.getUserById(id)))