import db from '../config/db'

const Todo = db.Model.extend({
  tableName: 'todos',
})

export default db.model('Todo', Todo)
