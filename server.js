if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const  express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes.js')
const initialize = require('./config/passport')
const passport = require('passport')

// set view engine
app.set('view-engine', 'ejs')

// body parser
app.use(express.urlencoded({extended: true}))

// use session
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// initalize passport js
app.use(passport.initialize())
app.use(passport.session())

// regiseter method-override in middleware
app.use(methodOverride('_method'))

// register route in middleware
app.use(routes)

app.listen(3000)