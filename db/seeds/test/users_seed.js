/* eslint-disable */

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return knex('users').insert({
        email: 'admin@example.org',
        password: '$2a$10$sqriI8PQWxblzA1zj0COg.I9jZv7fIrqeWhUKCIU9b0ViINWTLIc.'
      })
    })
}
