if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const  express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes/loginRoutes')
const passport = require('passport')

// set view engine
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000)