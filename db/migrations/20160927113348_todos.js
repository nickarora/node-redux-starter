/* eslint-disable */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table){
    table.increments(); // id: integer
    table.string('note').notNullable();
    table.boolean('complete').defaultTo(false).notNullable();
    table.timestamps(true, true); // not null, default to Date.now()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
