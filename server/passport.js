const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const client = require('./db')
const crypto = require('crypto');
const _ = require('lodash');


const getUserById = async (email) => {
  const user_data = await client.db('project').collection('users')
    .findOne({
      email: email
    })
  console.log('user_data===========================', user_data)
  return user_data
}

module.exports = () => {
  passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');

    done(null, user.email);
  });

  passport.deserializeUser(function (email, done) {


    console.log('deserializeUser() 호출됨.');

    getUserById(email).then(user => done(null, user))



  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, userId, password, done) => {
    console.log('passport의 local-login : ', userId, password)
    const user_data = await client.db('project').collection('users')
      .findOne({
        email: userId,

      })



    if (_.isEmpty(user_data)) {
      console.log('유저 미존재!')
      return done(null, false)
    } else {
      const makePasswordHashed = (userId, plainPassword) =>
        new Promise(async (resolve, reject) => {
          // salt를 가져오는 부분은 각자의 DB에 따라 수정
          const salt = await client.db('project').collection('users')
            .findOne({
              email: userId,

            })
            .then((result) => result.salt);
          crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
          });
        });
      const hashed_password = await makePasswordHashed(userId, password);



      if (user_data.password === hashed_password) {
        console.log('비밀번호 일치!')
        return done(null, user_data)
      } else {
        console.log('비밀번호 불일치!')
        return done(null, false)
      }
    }








  }))

}


