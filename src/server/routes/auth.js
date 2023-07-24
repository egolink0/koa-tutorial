const Router = require("koa-router");
const fs = require("fs");
const queries = require("../db/queries/users");
const passport = require("koa-passport");

const router = new Router();

router.get("/auth/register", async (ctx) => {
  ctx.type = "html";
  ctx.body = fs.createReadStream("./src/server/views/register.html");
});

router.post("/auth/register", async (ctx) => {
  const user = await queries.addUser(ctx.request.body); // 加入数据库用户信息

  if (user) {
    ctx.status = 200;
    ctx.body = { status: "success" };
  } else {
    ctx.status = 400;
    ctx.body = { status: "error" };
  }
});

router.get("/auth/login", async (ctx) => {
  // 判断是否已经登录，没有登录才跳转 login.html
  if (!ctx.isAuthenticated()) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("./src/server/views/login.html");
  } else {
    // 登录了跳转 success 界面
    ctx.redirect("/auth/success");
  }
});

router.get("/auth/success", async (ctx) => {
  // 判断是否已经登录，成功才跳转
  if (ctx.isAuthenticated()) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("./src/server/views/success.html");
  } else {
    // 没有成功就跳转到登录界面
    ctx.redirect("/auth/login");
  }
});

router.post("/auth/login", async (ctx) => {
  // local 策略
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      // 登录成功
      ctx.login(user);
      ctx.redirect("/auth/success"); // 成功页面
    } else {
      ctx.status = 400;
      ctx.body = { status: "error" };
    }
  })(ctx); // 传入 context
});

router.get("/auth/logout", async (ctx) => {
  if (ctx.isAuthenticated()) {
    // 这里需要 return ，否则报错（Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client）
    return ctx.logout().then((r) => {
      ctx.redirect("/auth/login");
    });
  } else {
    ctx.redirect("/auth/login");
  }
});

module.exports = router;
