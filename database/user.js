const initializePassport = require('../config/passport.config')
const passport = require('passport')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
)

const pushData = (req, hashedPassword) => {
  users.push({
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
}

// local variable
let users = []
module.exports = {users, pushData}