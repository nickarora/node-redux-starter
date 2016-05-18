/* eslint-disable no-console */
import db from '../../config/db' //eslint-disable-line

import { Promise } from 'bluebird'
import { Todo } from '../../models'

const logger = (str) => {
  if (process.env.NODE_ENV !== 'development') return
  console.log(str)
}

const seedTodos = (todosData) => {
  logger('Seeding todos...')
  const todos = todosData.todos.map(todo =>
    Todo.findOneAndUpdate({ note: todo.note }, todo, { upsert: true })
  )

  return Promise.all(todos)
}

const seed = (todosData, cb) =>
  Todo.remove({})
    .then(() => seedTodos(todosData))
    .then(() => Todo.find({}))
    .then(todos => {
      logger('Todos loaded into database:', todos)
      if (cb) cb()
    })
    .catch((err) => {
      console.error(err.stack)
      if (cb) cb()
    })

export default seed
