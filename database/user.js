const users = []

const userModel = {
  pushData: (req, hashedPassword) => {
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
  },
  getUserByEmail: email => users.find(user => user.email === email),
  getUserById: id => users.find(user => user.id === id)
}

module.exports = {userModel, users}