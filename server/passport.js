const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const Users = require('./user');

module.exports = () => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user._id); // 여기의 user._id가 req.session.passport.user에 저장
      });
      passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
        User.findById(id, (err, user) => {
          done(null, user); // 여기의 user가 req.user가 됨
        });
      });

      passport.use(
        new LocalStrategy(
          /*
          {
            userId: ...,
            password: ...
          }
          */
          {
            usernameField: 'id',
            passwordField: 'passowrd'
          },
          async (id, password, done) => {
            try {

              console.log('id====================',id)
              console.log('password====================',password)
              return
              const user = await db.User.findOne({
                where: { userId }
              });
              if (!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' });
              }
              const result = await bcrypt.compare(password, user.password);
              if (result) {
                return done(null, user);
              }
              return done(null, false, { reason: '비밀번호가 틀립니다.' });
            } catch (e) {
              console.log(e);
              return done(e);
            }
          }
        )
      );
};