/* eslint-disable */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments(); // id: integer
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true); // not null, default to Date.now()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
