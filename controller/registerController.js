const {users, userModel} = require('../database/user')
const bcrypt = require('bcrypt')

const registerController = {
  formRegister: (req, res) => res.render('register.ejs'),

  registerNewUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      userModel.pushData(req, hashedPassword)
      res.redirect('/login')
    } catch (error) {
      res.redirect('/register')
    }
    console.log(users)
  }
}

module.exports = registerController