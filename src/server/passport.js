const passport = require("koa-passport");
const knex = require("./db/connection");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// 密码比较
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex("users")
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

// serializing and de-serializing the user information to the session.
const options = {};
passport.use(
  new LocalStrategy(options, (username, password, done) => {
    // 查询数据库，找到相应的用户名和密码
    knex("users")
      .where({ username })
      .first()
      .then((user) => {
        if (!user) return done(null, false);
        // 匹配校验
        if (!comparePass(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);

module.exports = passport;
