/* eslint-disable */

exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function () {
      return knex('todos').insert({
        note: 'todo1',
      })
    })
    .then(function () {
      return knex('todos').insert({
        note: 'todo2',
      })
    })
    .then(function () {
      return knex('todos').insert({
        note: 'todo3',
      })
    })
};
