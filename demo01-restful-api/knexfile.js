const path = require("path");

const BASE_PATH = path.join(__dirname, "src", "server", "db");

module.exports = {
  development: {
    // development
    client: "mysql2",
    connection: "mysql://koa:123456@localhost:3306/koa_restful_api", // 根据自己的 mysql 配置修改成相应的
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};
