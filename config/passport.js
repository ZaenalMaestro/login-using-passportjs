const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {userModel} = require('../database/user')

/* 
fungsi untuk verifikasi passoword
  @ jika password cocok: return true
  @ jika password salah: return false 
*/
const passwordVerify = async (password, user) => {
  const verifyStatus = await bcrypt.compare(password, user.password)
  return verifyStatus
}

/* 
fungsi untuk melakukan autentikasi user, fungsi ini akan dijadikan callback LocalStrategy
*/
const authenticateUser = async (email, password, done) => {
  const user = userModel.getUserByEmail(email)
  if (!user) {
    return done(null, false, { message: 'No user with the email'})
  }
  
  try {
    // jika password sesui, penggunakan berhasil diautentikasi
    if (await passwordVerify(password, user)) return done(null, user)

    // jika passoword salah, menampilkan pesan kesalahan
    return done(null, false, { message: 'incorret password' })
  } catch (error) {
    return done(error)
  }
}

/* 
setup passport middleware 
*/
passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))

/* 
@ serializeUser: 
      menambahkan id user ke session untuk menemukan data user yng spesifik
@ desirializeUser: 
      untuk mengambil data user dari database berdasarkan id. kedalaman req.user
*/
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, userModel.getUserById(id)))