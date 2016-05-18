require('babel-register')
const todosData = require('./fixtures/todos-development.json')
const seed = require('./seeders/todos').default

seed(todosData, () => {
  process.exit(0)
})
