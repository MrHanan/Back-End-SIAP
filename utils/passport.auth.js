// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const User = require('../app/models/profile-model')

// passport.use(
//     new LocalStrategy(
//     {
//         usernameField: "email",
//         passwordField: "password"
//     }, async(email, password, done) => {
//         try {
//             const user = user.findOne({email})
//             //username/email tidak ada
//             if(!user){
//                 return done(null, false, {
//                     message: "Username tidak terdaftar"
//                 })
//             }
//             //username/email ada dan verified password
//             const isMatch = await user.isValidPassword(password)
//             return isMatch 
//                 ? done(null, user) 
//                 : done(null, false, {message: "Password salah!"})
//         } catch (error) {
//             done(error)
//         }
//     })
// )

// passport.serializeUser(function (user, done){
//     done(null, user.id)
// })

// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         done(err, user)
//     })
// })
