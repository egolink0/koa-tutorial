const knex = require("../connection");
const bcrypt = require("bcryptjs"); // 加密库

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt); // 密码加密
  return knex("users").insert({
    username: user.username,
    password: hash,
  });
}

module.exports = { addUser };
