exports.up = function (knex) {
    return knex.schema.createTable("movies", (table) => {
      table.increments();
      table.string("name").notNullable().unique();
      table.string("genre").notNullable();
      table.integer("rating").notNullable();
      table.boolean("explicit").notNullable();
    });
  };
  
  // 删除表
  exports.down = function (knex) {
    return knex.schema.dropTable("movies");
  };