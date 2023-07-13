const knex = require("../connection");

function getAllMovies() {
  return knex("movies").select("*");
}

function getSingleMovie(id) {
  return knex("movies")
    .select("*")
    .where({ id: parseInt(id) });
}

function addMovie(movie) {
  return knex("movies").insert(movie); // 返回 [id]
}

function updateMovie(id, movie) {
  return knex("movies")
    .update(movie)
    .where({ id: parseInt(id) });
}

function deleteMovie(id) {
  return knex("movies")
    .del()
    .where({ id: parseInt(id) });
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
