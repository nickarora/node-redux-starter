/* eslint-disable no-console */
import db from '../../config/db' //eslint-disable-line

import { Promise } from 'bluebird'
import { Todo } from '../../models'

const todosData = require('../fixtures/todos.json')

const seedTodos = () => {
  console.log('Seeding todos...')
  const todos = todosData.todos.map(todo =>
    Todo.findOneAndUpdate({ note: todo.note }, todo, { upsert: true })
  )

  return Promise.all(todos)
}

const seed = () =>
  seedTodos()
    .then(() => {
      console.log('Seeding todos complete.')
      return Todo.find({})
    })
    .then(todos => {
      console.log('Todos loaded into database:', todos)
      process.exit(0)
    })
    .catch((err) => {
      console.error(err.stack)
      process.exit(1)
    })

export default seed
