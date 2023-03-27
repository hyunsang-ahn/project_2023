const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const client = require('./db')
const crypto = require('crypto');





module.exports = () => {
  passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    console.log(user);

    done(null, user);
  })

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, userId, password, done) => {
    console.log('passport의 local-login : ', userId, password)

    const makePasswordHashed = (userId, plainPassword) =>
      new Promise(async (resolve, reject) => {
        // salt를 가져오는 부분은 각자의 DB에 따라 수정
        const salt = await client.db('project').collection('users')
          .findOne({
            email: userId,

          })
          .then((result) => result.salt);
        console.log('salt=======================', salt)
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve(key.toString('base64'));
        });
      });

    const hashed_password = await makePasswordHashed(userId, password);

    console.log('hashed_password=======================', hashed_password)

    const user_data = await client.db('project').collection('users')
      .findOne({
        email: userId,

      })

    console.log('user_data=======================', user_data)
    if (user_data.password === hashed_password) {
      console.log('비밀번호 일치!')
      return done(null, {
        userId: userId,
        password: password
      })
    } else {
      console.log('비밀번호 불일치!')
      return done(null, false, req.flash('loginMessage', '비밀번호 불일치!'))
    }


  }))

}


