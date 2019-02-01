
exports.up = function(knex, Promise) {
  knex.schema.createTable('games', table => {
      table.increments();
      table
        .string('title', 255)
        .notNullable();
      table
        .string('genre', 128)
        .notNullable();
      table.integer('releaseYear');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('games');
};
