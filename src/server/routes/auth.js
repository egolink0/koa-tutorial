const Router = require("koa-router");
const fs = require("fs");
const queries = require("../db/queries/users");

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

module.exports = router;
