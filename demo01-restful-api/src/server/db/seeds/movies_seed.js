exports.seed = (knex, Promise) => {
  return knex("movies")
    .del()
    .then(() => {
      return knex("movies").insert({
        name: "A",
        genre: "Fantasy",
        rating: 7,
        explicit: false,
      });
    })
    .then(() => {
      return knex("movies").insert({
        name: "B",
        genre: "Science Fiction",
        rating: 9,
        explicit: true,
      });
    })
    .then(() => {
      return knex("movies").insert({
        name: "C",
        genre: "Action",
        rating: 5,
        explicit: false,
      });
    });
};
