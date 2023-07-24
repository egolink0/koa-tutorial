const Router = require("koa-router");
const queries = require("../db/queries/movies");

const router = new Router();

router.get("/api/v1/movies", async (ctx) => {
  try {
    const movies = await queries.getAllMovies();
    ctx.body = {
      status: "success",
      data: movies,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`/api/v1/movies/:id`, async (ctx) => {
  try {
    const movie = await queries.getSingleMovie(ctx.params.id);
    if (movie.length) {
      ctx.body = {
        status: "success",
        data: movie,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "That movie does not exist.",
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(`/api/v1/movies`, async (ctx) => {
  try {
    const movie = await queries.addMovie(ctx.request.body);
    if (movie.length) {
      // 根据数据库返回值处理
      ctx.status = 201;
      ctx.body = {
        status: "success",
        data: { id: movie[0] },
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        message: "Something went wrong.",
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Sorry, an error has occurred.",
    };
  }
});

router.put(`/api/v1/movies/:id`, async (ctx) => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie) {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: { id: movie },
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "That movie does not exist.",
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Sorry, an error has occurred.",
    };
  }
});

router.delete(`/api/v1/movies/:id`, async (ctx) => {
  try {
    const movie = await queries.deleteMovie(ctx.params.id);
    if (movie) {
      ctx.status = 200;
      ctx.body = {
        status: "success",
        data: { id: movie }, // 返回 id
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "That movie does not exist.",
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: err.message || "Sorry, an error has occurred.",
    };
  }
});
module.exports = router;
