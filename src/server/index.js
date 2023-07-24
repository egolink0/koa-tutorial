const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); // koa-bodyparser
const passport = require("./passport");
const session = require("koa-session");

const app = new Koa();

// sessions
app.keys = ["koa:redis-session-secret"];
app.use(session({ maxAge: 60 * 1000 }, app)); // 过期时间 1 分钟

// 在路由之前引入 passport
app.use(passport.initialize());
app.use(passport.session());

const indexRoutes = require("../server/routes/index");
const authRoutes = require("../server/routes/auth");
const movieRoutes = require("../server/routes/movies");

app.use(bodyParser()); // 在路由之前加入中间件
app.use(indexRoutes.routes());
app.use(authRoutes.routes());
app.use(movieRoutes.routes());

const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
