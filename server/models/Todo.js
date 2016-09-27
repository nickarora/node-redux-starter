import db from '../config/pgDb'

const Todo = db.Model.extend({
  tableName: 'todos',
})

export default db.model('Todo', Todo)
