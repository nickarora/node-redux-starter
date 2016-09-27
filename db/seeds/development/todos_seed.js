/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      return knex('todos').insert({
        note: 'First Todo',
      })
    })
    .then(function () {
      return knex('todos').insert({
        note: 'Second Todo',
        complete: true,
      })
    })
    .then(function () {
      return knex('todos').insert({
        note: 'Third Todo',
      })
    })
};
