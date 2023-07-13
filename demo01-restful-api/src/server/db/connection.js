const environment = process.env.NODE_ENV || "development";
const configs = require("../../../knexfile.js");

const knex = require("knex")(configs[environment]);

module.exports = knex;
